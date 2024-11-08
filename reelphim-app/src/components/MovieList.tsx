import React from 'react';
import MovieCard from './MovieCard';
import { Movie } from '../types/movie.types';

const MovieList = ({movies}: { movies: Movie[] }) => {
  return (
    <div className="flex flex-col space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies.map((movie, index) => (
          <div key={index} className="flex-shrink-0 w-full">
            <MovieCard {...movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;