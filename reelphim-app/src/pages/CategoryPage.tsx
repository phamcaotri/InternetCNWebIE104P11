import React from 'react';
import { useLocation } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

const CategoryPage = () => {
  const location = useLocation();
  const { title, movies } = location.state || {};

  return (
    <div >
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {movies?.map((movie, index) => (
          <MovieCard key={index} {...movie} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage; 