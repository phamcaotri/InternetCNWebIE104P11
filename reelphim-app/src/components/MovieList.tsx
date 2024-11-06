import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies, title }) => {
  /** @author @phantruowngthanhtrung
   * Định nghĩa nội dung của MovieList:
   * - Hiển thị danh sách các bộ phim
   * Lấy thông tin từ file MovieCard.tsx
   */
  return (
    <div className="my-8">
      {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies.map((movie, index) => (
          <div key={index} className="flex-shrink-0">
            <MovieCard {...movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;