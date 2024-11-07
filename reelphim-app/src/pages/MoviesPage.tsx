import React from 'react';
import MovieSection from '../components/MovieSection';
import { usePopularMovies, useNewMovies, useClassicMovies } from '../hooks/useMovie';

const MoviesPage = () => {
  // Fetch data từ API
  const { data: popularMovies, isLoading: isPopularLoading } = usePopularMovies();
  const { data: newMovies, isLoading: isNewLoading } = useNewMovies();
  const { data: classicMovies, isLoading: isClassicLoading } = useClassicMovies();

  // Loading state
  if (isPopularLoading || isNewLoading || isClassicLoading) {
    return <div>Loading...</div>;
  }

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