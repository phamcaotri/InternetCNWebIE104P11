import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { tmdbapi } from '../services/tmdbApi';
import { env } from 'process';
const MOVIE_MAGNET = "magnet:?xt=urn:btih:a1b27ec0197693caba6bd12e535fe11e042ba2ba&dn=[Judas] I Want to Eat Your Pancreas...";
const STATS_INTERVAL = 3000;
const currentHost = window.location.host;
const INITIAL_FETCH_DELAY = 1000;
const SERVER_PORT = import.meta.env.VITE_SERVER_PORT || '3001';
const SERVER_URL = `http://${currentHost.split(':')[0]}:${SERVER_PORT}`;
const WatchMoviePage = () => {
  const [streamStats, setStreamStats] = useState({
    progress: 0,
    downloadSpeed: 0,
    peers: 0
  });
  const [isComplete, setIsComplete] = useState(false);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movie, setMovie] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const statsIntervalRef = useRef(null);
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState<string>('');

  const startStreaming = () => {
    const infoHash = MOVIE_MAGNET.match(/btih:([a-zA-Z0-9]+)/)?.[1];
    if (!infoHash) {
      setError('Invalid magnet URL');
      setIsLoading(false);
      return;
    }

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
    setStreamStats({
      progress: 0,
      downloadSpeed: 0,
      peers: 0
    });
    setIsComplete(false);
    setIsLoading(false);

    return () => {
      if (statsIntervalRef.current) {
        clearInterval(statsIntervalRef.current);
      }
    };
  }, []);

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

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8">{error}</div>;
  }

  const getVideoUrl = () => {
    const infoHash = MOVIE_MAGNET.match(/btih:([a-zA-Z0-9]+)/)?.[1];
    return infoHash ? `${SERVER_URL}/stream/${infoHash}` : '';
  };

  return (
    <main className="container mx-auto px-4 py-8 bg-background text-text">
      <div id="player" className="w-full aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
        {!isPlaying ? (
          <button
            onClick={() => {
              setIsPlaying(true);
              startStreaming();
            }}
            className="px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
          >
            Play Movie
          </button>
        ) : (
          <>
            <video
              ref={videoRef}
              controls
              className="w-full h-full"
              src={getVideoUrl()}
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
      
      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {isPlaying && (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Stream Stats</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Progress</p>
              <p className="text-white">{(streamStats.progress * 100).toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-gray-400">Download Speed</p>
              <p className="text-white">{(streamStats.downloadSpeed / 1024).toFixed(1)} KB/s</p>
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