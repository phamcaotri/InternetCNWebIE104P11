import React, { useRef, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Play } from 'lucide-react';
import { saveWatchHistory } from '../services/api'; // API lưu lịch sử xem

const currentHost = window.location.hostname;
const SERVER_PORT = '5000';
const SERVER_URL = `http://${currentHost}:${SERVER_PORT}`;

const WatchMoviePage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [searchParams] = useSearchParams();

  const magnetURI = searchParams.get('magnet');
  const startTime = parseFloat(searchParams.get('startTime') || '0'); // Lấy thời gian bắt đầu từ URL
  const movieDetails = JSON.parse(localStorage.getItem('currentMovie') || '{}'); // Lấy thông tin phim từ localStorage

  const getVideoUrl = (infoHash: string) => {
    return `${SERVER_URL}/stream/${infoHash}`;  
  };

  const saveVideo = async (time: number) => {
    console.log('saveVideo called with time:', time); // Thêm log để debug
    try {
      if (!movieDetails.movieId || !magnetURI) {
        console.error('Thông tin không đầy đủ để lưu lịch sử.');
        return;
      }
  
      await saveWatchHistory({
        movie_id: Number(movieDetails.movieId),
        title: movieDetails.title,
        banner: movieDetails.banner,
        magnet: magnetURI,
        last_watched_time: time,
      });
  
      console.log('Lịch sử xem đã được lưu.');
    } catch (error) {
      console.error('Lỗi khi lưu lịch sử xem:', error);
    }
  };

  useEffect(() => {
    const handleUrlChange = () => {
      console.log('URL changed:', window.location.href);
      if (videoRef.current) {
        const currentTime = videoRef.current.currentTime || 0;
        console.log('Saving video progress on URL change:', currentTime);
        saveVideo(currentTime);
      }
    };

    // Ghi đè pushState và replaceState
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function (...args) {
      handleUrlChange();
      return originalPushState.apply(this, args);
    };

    window.history.replaceState = function (...args) {
      handleUrlChange();
      return originalReplaceState.apply(this, args);
    };

    // Lắng nghe sự kiện popstate
    window.addEventListener('popstate', handleUrlChange);

    // Cleanup khi unmount
    return () => {
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);

  const handleLoadedMetadata = () => {
    if (videoRef.current && startTime > 0) {
      console.log(`Setting start time to: ${startTime}`);
      videoRef.current.currentTime = startTime; // Đặt thời gian phát từ startTime
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 bg-background text-text">
      <div id="player" className="w-full aspect-video bg-gray-800 rounded-lg flex items-center justify-center relative">
        {!isPlaying ? (
          <button
            title="Play Movie"
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
              onLoadedMetadata={handleLoadedMetadata} // Đặt start time khi video metadata đã tải xong
              onError={(e) => {
                console.error('Video error event:', e);
                setVideoError('Error playing video');
              }}
              onTimeUpdate={() => {
                if (videoRef.current) {
                  console.log('Current time:', videoRef.current.currentTime);
                }
              }}
              onPause={() => {
                if (videoRef.current) {
                  const currentTime = videoRef.current.currentTime;
                  console.log('Video paused at:', currentTime);
                  saveVideo(currentTime); // Lưu thời gian khi video bị dừng
                }
              }}
              onSeeked={() => {
                if (videoRef.current) {
                  const currentTime = videoRef.current.currentTime;
                  console.log('Video seeked to:', currentTime);
                  saveVideo(currentTime); // Lưu thời gian khi người dùng tua
                }
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

export default WatchMoviePage;
