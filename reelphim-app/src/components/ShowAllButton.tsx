import React from 'react';
import { useState } from 'react';
import MovieList from './MovieList';
import { MediaItem } from '../types/media.types';

interface ShowAllButtonProps {
  movies: MediaItem[];
  onShowAllChange?: (isShowing: boolean) => void;
}

const ShowAllButton = ({ movies, onShowAllChange }: ShowAllButtonProps) => {
  const [isShowingAll, setIsShowingAll] = useState(false);

  const handleToggle = () => {
    const newState = !isShowingAll;
    setIsShowingAll(newState);
    onShowAllChange?.(newState);
  };

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        className="h-8 absolute -top-12 right-0 px-3 py-1 text-sm bg-background-light text-text
        border border-secondary hover:border-primary
        rounded-lg transition-colors duration-200
        hover:bg-background-hover hover:text-text-hover
        z-10"
        aria-label={isShowingAll ? "Show less movies" : "Show all movies"}
      >
        {isShowingAll ? 'Show Less' : 'Show All'}
      </button>
      {isShowingAll && (
        <div className="mt-12">
          <MovieList movies={movies} />
        </div>
      )}
    </div>
  );
};

export default ShowAllButton;