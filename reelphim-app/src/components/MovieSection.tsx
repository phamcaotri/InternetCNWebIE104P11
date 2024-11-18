import React from 'react';
import MovieGrid from './MovieGrid';

const MovieSection = ({ title, description, movies }) => (
  /** @author @phantruowngthanhtrung 
   * Định nghĩa nội dung của MovieSection:
   * - Hiển thị nhóm các bộ phim
   * Lấy thông tin từ file MovieGrid.tsx
   */
  <section className="mb-8">
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    <p className="mb-4">{description}</p>
    <MovieGrid movies={movies} />
  </section>
);

export default MovieSection;