import React from 'react';
import MovieGrid from './MovieGrid';

const MovieSection = ({ title, description, movies }) => (
  <section className="mb-8">
    {/* Centered titles */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="mb-4">{description}</p>
    </div>
    
    {/* Full-width movie grid */}
    <div className="w-full">
      <MovieGrid movies={movies} />
    </div>
  </section>
);

export default MovieSection;
  /** @author @phantruowngthanhtrung 
   * Định nghĩa nội dung của MovieSection:
   * - Hiển thị nhóm các bộ phim
   * Lấy thông tin từ file MovieGrid.tsx
   */