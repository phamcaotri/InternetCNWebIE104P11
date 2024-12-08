import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MediaItem } from '../types/media.types';
import { UI_CONFIG } from '../config';
const CARD_WIDTH = UI_CONFIG.CARD.WIDTH;
const CARD_HEIGHT = CARD_WIDTH * UI_CONFIG.CARD.ASPECT_RATIO;

interface MovieCardProps extends MediaItem {}
const MovieCard = ({ id, title, releaseDateFormatted, posterPath, mediaType }: MovieCardProps) => {
    /** @author @phantruowngthanhtrung
   * Định nghĩa nội dung của MovieCard:
   * - Hiển thị thông tin của một bộ phim
   * Lây thông tin từ file movie.types.ts
   * - Chuyển hướng đến trang chi tiết bộ phim khi click
   * Lấy thông tin từ file index.d.ts
   */
  const [imageLoaded, setImageLoaded] = useState(false);

  const navigate = useNavigate();
  const isMoving = useRef(false);
  const handleMouseDown = () => {
    isMoving.current = false;
  };

  const handleMouseMove = () => {
    isMoving.current = true;
  };

  const handleClick = (e) => {
    if (!isMoving.current) {
      const path = mediaType === 'tv' ? `/tv/${id}` : `/movie/${id}`;
      navigate(path);
    }
  };

  return (
    <div className="block relative overflow-hidden rounded-md transition-transform hover:scale-105 group select-none cursor-pointer"
      style={{ width: `${CARD_WIDTH}px`, height: `${CARD_HEIGHT}px` }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      draggable="false"
    >
      <img 
        src={posterPath || ''} 
        alt={`${title} poster`} 
        className={`w-full h-full object-cover pointer-events-none transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        draggable="false"
        onLoad={() => setImageLoaded(true)}
      />
      {!imageLoaded && (
        <div className="absolute inset-0 bg-background-light animate-pulse"></div>
      )}
      <div className="text-text absolute bottom-0 left-0 right-0 bg-background opacity-80 p-2 transform translate-y-full transition-transform group-hover:translate-y-0">
        <div className="font-bold text-sm mb-1">{title}</div>
        <div className="text-xs opacity-80 mb-1">{releaseDateFormatted}</div>
      </div>
    </div>
  );
};

export default MovieCard;