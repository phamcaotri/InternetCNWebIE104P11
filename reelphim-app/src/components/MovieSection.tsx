import React from 'react';
import MovieGrid from './MovieGrid';
import ShowAllButton from './ShowAllButton';

interface MovieSectionProps {
  title: string;
  description: string;
  movies: any[];
  categoryId: string;
}

const MovieSection = ({ title, description, movies, categoryId }: MovieSectionProps) => (
  <section className="mb-8">
    {/* Centered titles */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-text text-2xl font-bold">{title}</h2>
        <ShowAllButton 
          categoryId={categoryId} 
          title={title}
          movies={movies} // Thêm prop movies
        />
      </div>
      <p className="text-text mb-4">{description}</p>
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