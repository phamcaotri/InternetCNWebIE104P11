import React from 'react';
import { useParams } from 'react-router-dom';
import { tmdbapi } from '../services/tmdbApi';
import { TMDB_CONFIG } from '../config/tmdb.config';
const MovieDetailPage = () => {
  const { id } = useParams();
  const { data: movie, isLoading, error } = tmdbapi.GetMovieDetails(Number(id));

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8">Error loading movie details</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8 bg-background text-text">
      <div className="mb-8">
        {/* Hero Section */}
        <div className="relative h-96 mb-8">
          <img 
            src={movie?.backdropPath || ''} 
            alt={movie?.title || ''} 
            className="w-full h-full object-cover rounded-lg shadow-lg" 
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background to-transparent">
            <h1 className="text-4xl font-bold mb-2">{movie?.title}</h1>
            {movie?.tagline && (
              <p className="text-lg italic text-text-muted mb-2">{movie?.tagline}</p>
            )}
          </div>
        </div>

        {/* Main Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Poster and Quick Info */}
          <div>
            <img 
              src={movie?.posterPath || ''}
              alt={`${movie?.title || ''} poster`}
              className="w-full rounded-lg shadow-lg mb-4"
            />
            <div className="space-y-2">
              <p><span className="font-semibold">Status:</span> {movie?.status}</p>
              <p><span className="font-semibold">Release Date:</span> {movie?.releaseDate}</p>
              <p><span className="font-semibold">Runtime:</span> {movie?.runtime} minutes</p>
              <p><span className="font-semibold">Rating:</span> {movie?.voteAverage.toFixed(1)}/10 ({movie?.voteCount} votes)</p>
            </div>
          </div>

          {/* Middle Column - Overview and Genres */}
          <div className="md:col-span-2 relative">
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-text-muted mb-6 pb-16 md:pb-0">{movie?.overview || ''}</p>

            <h3 className="text-xl font-bold mb-3">Genres</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {movie?.genres?.map((genre) => (
                <span 
                  key={genre.id} 
                  className="bg-background-light text-text px-3 py-1 rounded-full text-sm
                  border border-secondary hover:border-primary
                  hover:bg-background-hover hover:text-text-hover"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            {/* Play Button - Updated */}
            <div className="fixed md:absolute bottom-4 right-4 z-10">
            <button className="btn-primary px-20 py-3 rounded-full shadow-lg 
                              hover:shadow-xl transition-all duration-300 
                              flex items-center justify-center gap-1 bg-primary text-base z-10">
              <svg xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor">
                <path strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Phát
            </button>
            </div>

            {/* Additional Details */}
            <div className="space-y-4">
              {movie?.budget && movie?.budget > 0 && (
                <p><span className="font-semibold">Budget:</span> ${movie.budget.toLocaleString()}</p>
              )}
              {movie?.revenue && movie?.revenue > 0 && (
                <p><span className="font-semibold">Revenue:</span> ${movie.revenue.toLocaleString()}</p>
              )}
              {movie?.homepage && (
                <p>
                  <span className="font-semibold">Homepage: </span>
                  <a href={movie?.homepage} target="_blank" rel="noopener noreferrer" 
                     className="text-primary hover:text-primary-hover">
                    Visit Official Site
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Production Companies */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Production Companies</h2>
          <div className="flex flex-wrap gap-6">
            {movie?.productionCompanies?.map(company => (
              <div key={company.id} 
                  className="flex flex-col items-center text-center p-4 bg-background-light 
                            rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200
                            min-w-[200px] max-w-[250px]">
                <div className="h-20 w-full flex items-center justify-center bg-white rounded-md p-2 mb-3">
                  {company.logoPath ? (
                    <img 
                      src={TMDB_CONFIG.w500Image(company.logoPath)}
                      alt={company.name}
                      className="h-16 w-auto max-w-[180px] object-contain"
                    />
                  ) : (
                    <span className="text-text-muted text-center font-medium">{company.name}</span>
                  )}
                </div>
                <p className="text-sm font-medium">{company.name}</p>
                <p className="text-xs text-text-muted">{company.originCountry}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default MovieDetailPage;