import React from 'react';
import { useLocation } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

const CategoryPage = () => {
  const location = useLocation();
  const { title, movies } = location.state || {};

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 auto-rows-auto">
        {movies?.map((movie, index) => (
          <MovieCard key={index} {...movie} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage; 