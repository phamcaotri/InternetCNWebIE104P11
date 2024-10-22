import React from 'react';
import { Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <header className="bg-secondary w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="text-2xl font-bold">Reelphim</div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link
                  to="/"
                  className={`hover:text-primary-hover ${location.pathname === '/' ? 'text-primary font-bold' : ''}`}
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  to="/genres"
                  className={`hover:text-primary-hover ${location.pathname === '/genres' ? 'text-primary font-bold' : ''}`}
                >
                  Thể loại
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className={`hover:text-primary-hover ${location.pathname === '/saved' ? 'text-primary font-bold' : ''}`}
                >
                  Danh sách lưu
                </Link>
              </li>
            </ul>
          </nav>
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm phim..."
              className="bg-background text-text px-4 py-2 rounded-full pr-10 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted" size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;