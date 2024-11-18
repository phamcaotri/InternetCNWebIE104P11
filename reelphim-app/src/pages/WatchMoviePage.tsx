import React from 'react';
import { useParams } from 'react-router-dom';
import { tmdbapi } from '../services/tmdbApi';

const WatchMoviePage = () => {
  const { id } = useParams();
  const { data: movie, isLoading, error } = tmdbapi.GetMovieDetails(Number(id));

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8">Error loading movie</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8 bg-background text-text">
      <h1 className="text-2xl font-bold mb-4">{movie?.title}</h1>
      {/* Video player sẽ được thêm vào đây */}
    </main>
  );
};

export default WatchMoviePage;