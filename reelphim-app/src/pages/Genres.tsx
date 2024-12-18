import React from 'react';
import { Link } from 'react-router-dom';

const genres = [
  { id: 28, name: 'Hành Động' },
  { id: 12, name: 'Phiêu Lưu' },
  { id: 16, name: 'Hoạt Hình' },
  { id: 35, name: 'Hài' },
  { id: 80, name: 'Tội Phạm' },
  { id: 99, name: 'Tài Liệu' },
  { id: 18, name: 'Chính Kịch' },
  { id: 10751, name: 'Gia Đình' },
  { id: 14, name: 'Giả Tưởng' },
  { id: 36, name: 'Lịch Sử' },
  { id: 27, name: 'Kinh Dị' },
  { id: 10402, name: 'Âm Nhạc' },
  { id: 9648, name: 'Bí Ẩn' },
  { id: 10749, name: 'Lãng Mạn' },
  { id: 878, name: 'Khoa Học Viễn Tưởng' },
  { id: 10770, name: 'Chương Trình TV' },
  { id: 53, name: 'Gây Cấn' },
  { id: 10752, name: 'Chiến Tranh' },
  { id: 37, name: 'Viễn Tây' },
];

const GenresPage = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-text mb-8">Thể Loại Phim</h1>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {genres.map((genre) => (
            <Link
              key={genre.id}
              to={`/genre/${genre.id}`}
              className={`hover:opacity-90 transition-opacity duration-300 bg-background
                rounded-lg p-4 h-32 flex items-center justify-center border border-border-default
                shadow-lg transform hover:scale-105 transition-transform`}
            >
              <span className="text-text text-center text-lg">
                {genre.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenresPage;