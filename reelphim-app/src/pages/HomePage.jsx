import React from 'react';
import MovieSection from '../components/MovieSection';
import { useState, useEffect } from 'react';
import { useTMDB } from '../hooks/useTMDB';

function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const { loading, error, fetchMovies } = useTMDB();

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchMovies('popular');
        console.log('API Response:', data); // Thêm log để kiểm tra
        
        // Transform data để phù hợp với MovieCard component
        const transformedMovies = data.results.map(movie => ({
          title: movie.title,
          year: new Date(movie.release_date).getFullYear(),
          imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        }));
        
        setTrendingMovies(transformedMovies);
      } catch (err) {
        console.error('Error fetching movies:', err);
      }
    };

    getMovies();
  }, [fetchMovies]);

  if (loading) return <div className="text-text">Loading...</div>;
  if (error) return <div className="text-text">Error: {error}</div>;

  return (
    <main className="px-4 py-8">
      <MovieSection
        title="Test TMDB API"
        description="Kiểm tra kết nối API"
        movies={trendingMovies}
      />
    </main>
  );
}

export default HomePage;