import React from 'react';
import { Search } from 'lucide-react';
import MovieSection from '../components/MovieSection';
import { continueWatching, mostWatched, newReleases, recommended } from '../data/movieData';

const HomePage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex justify-between items-center py-6">
          <div className="text-2xl font-bold">Reelphim</div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="/" className="text-blue-500">Trang chủ</a></li>
              <li><a href="/genres" className="hover:text-gray-300">Thể loại</a></li>
              <li><a href="#" className="hover:text-gray-300">Danh sách lưu</a></li>
            </ul>
          </nav>
          <div className="relative">
            <input
              type="text"
              placeholder="Search movies..."
              className="bg-gray-800 text-white px-4 py-2 rounded-full pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </header>

        <main>
          <MovieSection
            title="Tiếp tục xem"
            description="Tiếp tục hành trình khám phá những câu chuyện đang dang dở."
            movies={continueWatching}
          />
          <MovieSection
            title="Được xem nhiều nhất"
            description="Khám phá những bộ phim mà ai cũng đang bàn tán."
            movies={mostWatched}
          />
          <MovieSection
            title="Mới phát hành"
            description="Đừng bỏ lỡ cơ hội thưởng thức những bộ phim mới nhất."
            movies={newReleases}
          />
          <MovieSection
            title="Đề xuất"
            description="Khám phá những bộ phim mà bạn sẽ yêu thích."
            movies={recommended}
          />
        </main>
      </div>
    </div>
  );
};

export default HomePage;