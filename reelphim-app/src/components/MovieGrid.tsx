// component dùng để hiển thị danh sách các bộ phim
import React from 'react';
import MovieCard from './MovieCard';
import useDragScroll from '../hooks/useDragScroll';
import { UI_CONFIG } from '../config';

const MovieGrid = ({ movies }) => {
  const scrollRef = useDragScroll();
  // Tính toán khoảng cách scroll dựa trên chiều rộng của container.
  const scrollPercentage = UI_CONFIG.SCROLL.PERCENTAGE;
  const scrollDistance = () => {
    if (scrollRef.current) {
      return scrollRef.current.offsetWidth * scrollPercentage;
    }
    return 0;
  };
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollDistance(), behavior: UI_CONFIG.SCROLL.BEHAVIOR });
    }
  };
  
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollDistance(), behavior: UI_CONFIG.SCROLL.BEHAVIOR });
    }
  };
  return (
    <div className="relative">
      <div 
        ref={scrollRef} 
        className="flex overflow-x-auto overflow-y-hidden space-x-4 hide-scrollbar"
        draggable="false"
      >
        {movies.map((movie, index) => (
          <div key={index} className={`flex-shrink-0 w-[${UI_CONFIG.CARD.WIDTH}px]`} draggable="false">
          <MovieCard {...movie} />
          </div>
        ))}
      </div>
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-secondary text-text p-2 rounded-full opacity-80 hover:opacity-100 select-none"
        onClick={scrollLeft}
        draggable="false"
      >
        &lt;
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-secondary text-text p-2 rounded-full opacity-80 hover:opacity-100 select-none"
        onClick={scrollRight}
        draggable="false"
      >
        &gt;
      </button>
    </div>
  );
};

export default MovieGrid;