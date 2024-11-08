import React from 'react';
import { useParams } from 'react-router-dom';
import { UI_CONFIG } from '../config';
const MovieDetailPage = () => {
  const { id } = useParams();

  const movie = {
    title: 'Tên phim',
    description: 'Mô tả phim sẽ được hiển thị ở đây. Đây là một đoạn văn bản dài mô tả chi tiết về nội dung, cốt truyện và các điểm đáng chú ý của bộ phim.',
    coverImage: 'https://via.placeholder.com/1280x720',
    tags: ['Hành động', 'Phiêu lưu', 'Khoa học viễn tưởng'],
    isSeries: true,
    episodes: 10,
  };

  return (
    <main className="container mx-auto px-4 py-8 bg-background text-text">
      <div className="mb-8">
        <img 
          src={movie.coverImage} 
          alt={movie.title} 
          className="w-full h-64 object-cover rounded-lg shadow-lg mb-4" 
        />
        <h1 className="text-3xl font-bold mb-2 text-text">{movie.title}</h1>
        <p className="text-text-muted mb-4">{movie.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {movie.tags.map((tag, index) => (
            <span 
              key={index} 
              className="bg-background-light text-text px-2 py-1 rounded-full text-sm
              border border-secondary hover:border-primary
              hover:bg-background-hover hover:text-text-hover 
              cursor-pointer transition-colors duration-200"
            >
              {tag}
            </span>
          ))}
        </div>
        <button className="btn-primary">
          Phát
        </button>
      </div>

      {movie.isSeries && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-text">Danh sách tập</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: movie.episodes }, (_, i) => (
              <div 
                key={i} 
                className="bg-background-light text-text p-4 rounded-lg text-center
                border border-secondary hover:border-primary
                hover:bg-background-hover hover:text-text-hover 
                cursor-pointer transition-colors duration-200"
              >
                Tập {i + 1}
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default MovieDetailPage;