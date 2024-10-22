import React from 'react';
import { Search } from 'lucide-react';
import MovieSection from '../components/MovieSection';
import { action, comedy, drama, sciFi } from '../data/genreData';

const GenrePage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex justify-between items-center py-6">
          <div className="text-2xl font-bold">Reelphim</div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="/" className="hover:text-gray-300">Trang chủ</a></li>
              <li><a href="/genres" className="text-blue-500">Thể loại</a></li>
              <li><a href="#" className="hover:text-gray-300">Danh sách lưu</a></li>
            </ul>
          </nav>
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm phim..."
              className="bg-gray-800 text-white px-4 py-2 rounded-full pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </header>

        <main>
          <h1 className="text-3xl font-bold mb-8">Thể loại phim</h1>
          <MovieSection
            title="Hành động"
            description="Những bộ phim gay cấn và đầy kịch tính."
            movies={action}
          />
          <MovieSection
            title="Hài"
            description="Giải trí với những tình huống hài hước."
            movies={comedy}
          />
          <MovieSection
            title="Chính kịch"
            description="Khám phá những câu chuyện sâu sắc và đầy cảm xúc."
            movies={drama}
          />
          <MovieSection
            title="Khoa học viễn tưởng"
            description="Phiêu lưu vào thế giới của tương lai và công nghệ."
            movies={sciFi}
          />
        </main>
      </div>
    </div>
  );
};

export default GenrePage;