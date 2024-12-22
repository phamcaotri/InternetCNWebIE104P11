import React from 'react';
import MovieSection from '../components/MovieSection';
import { tmdbapi } from '../services/tmdbApi';


const GenresPage = () => {
  const { data: popularMovies } = tmdbapi.PopularMovies();
  const { data: newMovies } = tmdbapi.NowPlayingMovies();
  const { data: classicMovies } = tmdbapi.TopRatedMovies();

  return (
    <main>
      <h1 className="text-3xl font-bold mb-8 text-text">Genres</h1>
      {popularMovies?.results && (
      <MovieSection
        title="Hành động"
        description="Những bộ phim hành động đang gây sốt."
        movies={popularMovies.results}
      />
      )}
      {newMovies?.results && (
      <MovieSection
        title="Phim tài liệu"
        description="Các bộ phim tài liệu hay nhất."
        movies={newMovies.results}
      />
      )}
      {classicMovies?.results && (
      <MovieSection
        title="Phim kinh điển"
        description="Những tác phẩm điện ảnh bất hủ qua các thời đại."
        movies={classicMovies.results}
      />
      )}
    </main>
  );
};

export default GenresPage;