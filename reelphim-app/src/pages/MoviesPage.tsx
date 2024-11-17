import React from 'react';
import MovieSection from '../components/MovieSection';
import { tmdbapi } from '../services/tmdbApi';


const MoviesPage = () => {
  const { data: popularMovies } = tmdbapi.PopularMovies();
  const { data: newMovies } = tmdbapi.NowPlayingMovies();
  const { data: classicMovies } = tmdbapi.TopRatedMovies();

  return (
    <main>
      <h1 className="text-3xl font-bold mb-8 text-text">Movies</h1>
      <MovieSection
        title="Phổ biến"
        description="Những bộ phim đang gây sốt trên màn ảnh rộng."
        movies={popularMovies}
      />
      <MovieSection
        title="Mới phát hành"
        description="Các bộ phim mới nhất, vừa ra rạp."
        movies={newMovies}
      />
      <MovieSection
        title="Phim kinh điển"
        description="Những tác phẩm điện ảnh bất hủ qua các thời đại."
        movies={classicMovies}
      />
    </main>
  );
};

export default MoviesPage;