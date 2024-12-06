import React, { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Play } from 'lucide-react';

const STATS_INTERVAL = 3000;
const INITIAL_FETCH_DELAY = 1000;
const currentHost = window.location.hostname;
const SERVER_PORT = '3001';
const SERVER_URL = `http://${currentHost}:${SERVER_PORT}`;

const WatchMoviePage = () => {
  const [streamStats, setStreamStats] = useState({
    progress: 0,
    downloadSpeed: 0,
    peers: 0
  });
  const [isComplete, setIsComplete] = useState(false);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const statsIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoError, setVideoError] = useState<string>('');
  const [searchParams] = useSearchParams();
  const magnetURI = searchParams.get('magnet');

  useEffect(() => {
    if (magnetURI) {
      setIsPlaying(true);
      startStreaming(decodeURIComponent(magnetURI));
    }

    return () => {
      if (statsIntervalRef.current) {
        clearInterval(statsIntervalRef.current);
      }
    };
  }, [magnetURI]);

  const startStreaming = (magnet: string) => {
    const infoHash = magnet.match(/btih:([a-zA-Z0-9]+)/)?.[1];
    if (!infoHash) {
      setError('Invalid magnet URL');
      setIsLoading(false);
      return;
    }

    // Reset stats
    setStreamStats({
      progress: 0,
      downloadSpeed: 0,
      peers: 0
    });
    setIsComplete(false);

    // Start stats polling
    const initialTimeout = setTimeout(() => {
      if (!isComplete) {
        statsIntervalRef.current = setInterval(async () => {
          try {
            const response = await fetch(`${SERVER_URL}/stats/${infoHash}`);
            const stats = await response.json();
            
            if (!stats.error) {
              setStreamStats(stats);
              
              if (stats.progress >= 1) {
                setIsComplete(true);
                if (statsIntervalRef.current) {
                  clearInterval(statsIntervalRef.current);
                }
              }
            }
          } catch (err) {
            console.error('Error fetching stats:', err);
          }
        }, STATS_INTERVAL);
      }
    }, INITIAL_FETCH_DELAY);

    return () => {
      clearTimeout(initialTimeout);
      if (statsIntervalRef.current) {
        clearInterval(statsIntervalRef.current);
      }
    };
  };

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      
      video.onerror = (e) => {
        console.error('Video error:', {
          error: e,
          code: video.error?.code,
          message: video.error?.message
        });
        
        let errorMessage = 'Unknown error occurred';
        switch (video.error?.code) {
          case 1:
            errorMessage = 'Video loading aborted';
            break;
          case 2:
            errorMessage = 'Network error occurred';
            break;
          case 3:
            errorMessage = 'Video decoding failed';
            break;
          case 4:
            errorMessage = 'Video not supported';
            break;
        }
        setVideoError(errorMessage);
        setError(errorMessage);
      };

      video.onloadeddata = () => {
        console.log('Video loaded successfully');
        setVideoError('');
      };
    }
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      if (statsIntervalRef.current) {
        clearInterval(statsIntervalRef.current);
      }
    };
  }, []);

  const getVideoUrl = (infoHash: string) => {
    return `${SERVER_URL}/stream/${infoHash}`;
  };

  if (isLoading && !magnetURI) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8 bg-background text-text">
      <div id="player" className="w-full aspect-video bg-gray-800 rounded-lg flex items-center justify-center relative">
        {!isPlaying ? (
          <button
            title="Play Movie"
            onClick={() => {
              if (magnetURI) {
                setIsPlaying(true);
                startStreaming(decodeURIComponent(magnetURI));
              }
            }}
            className="p-4 bg-primary text-white rounded-full hover:bg-primary-hover transition-colors"
          >
            <Play size={48} />
          </button>
        ) : (
          <>
            <video
              ref={videoRef}
              controls
              className="w-full h-full rounded-lg"
              src={magnetURI ? getVideoUrl(magnetURI.match(/btih:([a-zA-Z0-9]+)/)?.[1] || '') : ''}
              onError={(e) => {
                console.error('Video error event:', e);
              }}
            />
            {videoError && (
              <div className="absolute top-0 left-0 right-0 bg-red-500 text-white p-2 text-center">
                {videoError}
              </div>
            )}
          </>
        )}
      </div>
      
      {isPlaying && (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Stream Info</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Progress</p>
              <p className="text-white">{(streamStats.progress * 100).toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-gray-400">Download Speed</p>
              <p className="text-white">{(streamStats.downloadSpeed / 1024 / 1024).toFixed(2)} MB/s</p>
            </div>
            <div>
              <p className="text-gray-400">Peers</p>
              <p className="text-white">{streamStats.peers}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default WatchMoviePage;