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
      {/* Player placeholder */}
      <div className="w-full aspect-video bg-gray-800 mb-8 rounded-lg"></div>

      {/* Movie information */}
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">{movie?.title}</h1>
        
        <div className="flex gap-4 text-sm text-gray-400">
          <span>{movie?.releaseDateFormatted}</span>
          <span>{movie?.runtime} minutes</span>
          <span>{movie?.voteAverage?.toFixed(1)} ⭐</span>
        </div>

        <p className="text-gray-300">{movie?.overview}</p>

        <div>
          <h2 className="text-xl font-semibold mb-2">Genres</h2>
          <div className="flex gap-2 flex-wrap">
            {movie?.genres?.map((genre) => (
              <span key={genre.id} className="px-3 py-1 bg-primary rounded-full text-sm">
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default WatchMoviePage;