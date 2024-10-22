// component dùng để hiển thị thông tin của 1 bộ phim
import React from 'react';

const CARD_WIDTH = 190;
const CARD_HEIGHT = CARD_WIDTH * 1.5;
const MovieCard = ({ title, year, imageUrl }) => (
  <div 
    className={`relative overflow-hidden rounded-md transition-transform hover:scale-105 group select-none`}
    style={{
      width: `${CARD_WIDTH}px`,
      height: `${CARD_HEIGHT}px`,
    }}
  >
    <img 
      src={imageUrl} 
      alt={`${title} poster`} 
      className="w-full h-full object-cover pointer-events-none" 
      draggable="false"
    />
    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2 transform translate-y-full transition-transform group-hover:translate-y-0">
      <div className="font-bold text-sm mb-1">{title}</div>
      <div className="text-xs opacity-80 mb-1">{year}</div>
    </div>
  </div>
);

export default MovieCard;