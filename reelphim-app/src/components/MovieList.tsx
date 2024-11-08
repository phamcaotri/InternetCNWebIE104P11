import React from 'react';
import MovieCard from './MovieCard';
import { MediaItem } from '../types/media.types';

const MovieList = ({
  movies,
  limit
}: {
  movies: MediaItem[];
  limit?: number;  // Optional limit prop
}) => {
  // Slice movies array if limit is provided
  const displayedMovies = limit ? movies.slice(0, limit) : movies;

  return (
    <div className="flex flex-col space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {displayedMovies.map((movie, index) => (
          <div key={index} className="flex-shrink-0 w-full">
            <MovieCard {...movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;