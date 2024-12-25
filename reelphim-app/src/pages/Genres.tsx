import React from 'react';
import MovieSection from '../components/MovieSection';
import { tmdbapi } from '../services/tmdbApi';


const GenresPage = () => {
  const { data: actionMovies } = tmdbapi.MoviesByGenre(28); // Action genre
  const { data: documentaryMovies } = tmdbapi.MoviesByGenre(99); // Documentary genre
  const { data: AdventureMovies } = tmdbapi.MoviesByGenre(12); // Documentary genre
  const { data: topRatedMovies } = tmdbapi.TopRatedMovies();

  return (
    <main>
      <h1 className="text-3xl font-bold mb-8 text-text">Genres</h1>
      {actionMovies?.results && (
      <MovieSection
        title="Hành động"
        description="Những bộ phim hành động đang gây sốt."
        movies={actionMovies.results}
      />
      )}
      {documentaryMovies?.results && (
      <MovieSection
        title="Phim tài liệu"
        description="Các bộ phim tài liệu hay nhất."
        movies={documentaryMovies.results}
      />
      )}
      {topRatedMovies?.results && (
      <MovieSection
        title="Phim kinh điển"
        description="Những tác phẩm điện ảnh bất hủ qua các thời đại."
        movies={topRatedMovies.results}
      />
      )}
      {AdventureMovies?.results && (
        <MovieSection
          title="Phim phiêu lưu"
          description="Những bộ phim phiêu lưu tuyệt với."
          movies={AdventureMovies.results}
        />
      )}
    </main>
  );
};

export default GenresPage;