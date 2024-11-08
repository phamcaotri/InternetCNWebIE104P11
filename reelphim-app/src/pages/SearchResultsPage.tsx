import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MovieList from '../components/MovieList';
import { tmdbapi } from '../services/tmdbApi';
import { MediaItem } from '../types/media.types';

const SearchResultsPage = () => {
  const [movieResults, setMovieResults] = useState<MediaItem[]>([]);
  const [tvResults, setTvResults] = useState<MediaItem[]>([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('q') || '';
  
  const { 
    data: movieData, 
    isLoading: isLoadingMovies, 
    error: movieError 
  } = tmdbapi.SearchMovies({ query: searchTerm });

  const { 
    data: tvData, 
    isLoading: isLoadingTv, 
    error: tvError 
  } = tmdbapi.SearchTvShows({ query: searchTerm });

  useEffect(() => {
    if (movieData?.results) {
      setMovieResults(movieData.results);
    }
    if (tvData?.results) {
      setTvResults(tvData.results);
    }
    window.scrollTo(0, 0);
  }, [movieData, tvData, location.search]);

  const isLoading = isLoadingMovies || isLoadingTv;
  const hasError = movieError || tvError;
  const hasResults = movieResults.length > 0 || tvResults.length > 0;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-text">
        Kết quả tìm kiếm cho "{searchTerm}"
      </h1>
      
      {isLoading && (
        <div className="flex justify-center items-center min-h-[200px]">
          <p className="text-lg text-text-muted">Đang tìm kiếm...</p>
        </div>
      )}

      {hasError && (
        <div className="flex justify-center items-center min-h-[200px]">
          <p className="text-lg text-text-muted">Có lỗi xảy ra khi tìm kiếm.</p>
        </div>
      )}

      {!isLoading && !hasError && (
        <div className="space-y-12">
          {movieResults.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4 text-text">Phim</h2>
              <MovieList movies={movieResults} limit={18} />
            </section>
          )}

          {tvResults.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4 text-text">TV Series</h2>
              <MovieList movies={tvResults} limit={18} />
            </section>
          )}

          {!hasResults && (
            <div className="flex justify-center items-center min-h-[200px]">
              <p className="text-lg text-text-muted">Không tìm thấy kết quả phù hợp.</p>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default SearchResultsPage;