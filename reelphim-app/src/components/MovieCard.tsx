import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Movie } from '../types/movie.types';
import { SITE_CONFIG } from '../config/siteConfig';
const CARD_WIDTH = 190;
const CARD_HEIGHT = CARD_WIDTH * 1.5;

interface MovieCardProps extends Movie {}
const MovieCard = ({ id, title, releaseDate, posterPath }: MovieCardProps) => {
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
      navigate(`/movie/${id}`);
    }
  };

  const releaseDateString = new Date(releaseDate).toLocaleDateString(SITE_CONFIG.LANGUAGE, { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div 
    // todo: dời css inline ra ngoài
      className="block relative overflow-hidden rounded-md transition-transform hover:scale-105 group select-none cursor-pointer"
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
      <div className="absolute bottom-0 left-0 right-0 bg-background bg-opacity-80 p-2 transform translate-y-full transition-transform group-hover:translate-y-0">
        <div className="font-bold text-sm mb-1">{title}</div>
        <div className="text-xs opacity-80 mb-1">{releaseDateString}</div>
      </div>
    </div>
  );
};

export default MovieCard;