import React from 'react';
import MovieSection from '../components/MovieSection';
import { useState, useEffect } from 'react';
import { useTMDB } from '../hooks/useTMDB';

function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const { loading, error, fetchMovies } = useTMDB();

  useEffect(() => {
    const getMovies = async () => {
      try {
        const [trending, popular, upcoming, topRated] = await Promise.all([
          fetchMovies('trending/movie/week'),
          fetchMovies('movie/popular'),
          fetchMovies('movie/upcoming'),
          fetchMovies('movie/top_rated')
        ]);

        setTrendingMovies(trending.results);
        setPopularMovies(popular.results);
        setUpcomingMovies(upcoming.results);
        setTopRatedMovies(topRated.results);
      } catch (err) {
        console.error('Error fetching movies:', err);
      }
    };

    getMovies();
  }, [fetchMovies]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-text text-xl">Loading...</div>
    </div>
  );
  
  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-text text-xl">Error: {error}</div>
    </div>
  );

  return (
    <main className="px-4 py-8 space-y-12">
      <MovieSection
        title="Xu hướng tuần này"
        description="Những bộ phim đang được quan tâm nhiều nhất."
        movies={trendingMovies}
      />
      <MovieSection
        title="Phổ biến"
        description="Những bộ phim được yêu thích nhất hiện nay."
        movies={popularMovies}
      />
      <MovieSection
        title="Sắp ra mắt"
        description="Đừng bỏ lỡ những bộ phim sắp được phát hành."
        movies={upcomingMovies}
      />
      <MovieSection
        title="Đánh giá cao"
        description="Những bộ phim được đánh giá tốt nhất mọi thời đại."
        movies={topRatedMovies}
      />
    </main>
  );
}

export default HomePage;