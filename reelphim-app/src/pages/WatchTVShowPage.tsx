import React, { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Play } from 'lucide-react';

const currentHost = window.location.hostname;
const SERVER_PORT = '3001';
const SERVER_URL = `http://${currentHost}:${SERVER_PORT}`;

const WatchTVShowPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoError, setVideoError] = useState<string>('');
  const [searchParams] = useSearchParams();
  
  const magnetURI = searchParams.get('magnet');
  const filePath = searchParams.get('file');

  const getVideoUrl = (infoHash: string) => {
    if (!filePath) return '';
    const baseUrl = `${SERVER_URL}/stream/${infoHash}`;
    const params = new URLSearchParams({
      filePath: decodeURIComponent(filePath)
    });
    return `${baseUrl}?${params.toString()}`;
  };

  if (!magnetURI || !filePath) {
    return <div className="container mx-auto px-4 py-8 text-red-500">Missing magnet or file path</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>;
  }

  const fileName = filePath ? decodeURIComponent(filePath).split('\\').pop() : 'Video Player';

  return (
    <main className="container mx-auto px-4 py-8 bg-background text-text">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">{fileName}</h1>
      </div>

      <div id="player" className="w-full aspect-video bg-gray-800 rounded-lg flex items-center justify-center relative">
        {!isPlaying ? (
          <button
            title="Play Video"
            onClick={() => setIsPlaying(true)}
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
                setVideoError('Error playing video');
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
    </main>
  );
};

export default WatchTVShowPage;