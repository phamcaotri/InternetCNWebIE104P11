import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MediaItem } from '../types/media.types';

interface ShowAllButtonProps {
  categoryId: string;
  title: string;
  movies: MediaItem[];
}

const ShowAllButton = ({ categoryId, title, movies }: ShowAllButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log('CategoryId:', categoryId);
    console.log('Title:', title);
    console.log('Movies:', movies);
    
    const path = `/category/${categoryId}`;
    console.log('Navigating to:', path);
    
    navigate(path, {
      state: { 
        title, 
        categoryId,
        movies
      }
    });
  };

  return (
    <button
      onClick={handleClick}
      className="h-8 px-3 py-1 text-sm bg-background-light text-text
      border border-secondary hover:border-primary
      rounded-lg transition-colors duration-200
      hover:bg-background-hover hover:text-text-hover"
      aria-label="View all movies in category"
    >
      Show All
    </button>
  );
};

export default ShowAllButton;