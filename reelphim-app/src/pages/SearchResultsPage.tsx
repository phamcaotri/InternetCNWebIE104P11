import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MovieList from '../components/MovieList';
import { tmdbapi } from '../services/tmdbApi';
import { Movie } from '../types/movie.types';

const SearchResultsPage = () => {
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('q') || '';
  
  const { data: searchData, isLoading, error } = tmdbapi.SearchMovies({ query: searchTerm });

  useEffect(() => {
    if (searchData?.results) {
      setSearchResults(searchData.results);
      window.scrollTo(0, 0);
    }
  }, [searchData, location.search]); // Add location.search to dependencies


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

      {error && (
        <div className="flex justify-center items-center min-h-[200px]">
          <p className="text-lg text-text-muted">Có lỗi xảy ra khi tìm kiếm.</p>
        </div>
      )}

      {!isLoading && !error && (
        <div>
          {searchResults.length > 0 ? (
            <MovieList movies={searchResults} />
          ) : (
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