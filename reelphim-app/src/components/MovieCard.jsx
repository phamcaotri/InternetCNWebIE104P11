import React, { useState } from 'react';

const CARD_WIDTH = 190;
const CARD_HEIGHT = CARD_WIDTH * 1.5;

const MovieCard = ({ title, year, imageUrl }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div 
      className="relative overflow-hidden rounded-md transition-transform hover:scale-105 group select-none"
      style={{ width: `${CARD_WIDTH}px`, height: `${CARD_HEIGHT}px` }}
    >
      <img 
        src={imageUrl} 
        alt={`${title} poster`} 
        className={`w-full h-full object-cover pointer-events-none transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        draggable="false"
        onLoad={() => setImageLoaded(true)}
      />
      {!imageLoaded && (
        <div className="absolute inset-0 bg-secondary-light animate-pulse"></div>
      )}
      <div className="absolute bottom-0 left-0 right-0 bg-secondary bg-opacity-70 p-2 transform translate-y-full transition-transform group-hover:translate-y-0">
        <div className="font-bold text-sm mb-1">{title}</div>
        <div className="text-xs opacity-80 mb-1">{year}</div>
      </div>
    </div>
  );
};

export default MovieCard;