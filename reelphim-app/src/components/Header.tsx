import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SITE_CONFIG, UI_CONFIG, NAVIGATION } from '../config';
import Search from './SearchBar';
import { useGetMovieDetailsQuery } from '../services/tmdbApi';

const Header = () => {
  /** @author @phantruowngthanhtrung
   * Định nghĩa nội dung của Header:
   * - Liên kết
   * Lấy thông tin từ file index.d.ts
   * - Thanh điều hướng
   * Lấy thông tin từ file siteConfig.ts
   * - Tìm kiếm
   * Lấy thông tin từ file Search.tsx
   * - Phim phổ biến
   * Lấy thông tin từ file useMovie.ts
   */
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const popularMovies = useGetMovieDetailsQuery(19995);
  const handleTestAPI = async () => {
    try {
      const data = await popularMovies;
      
      // Tạo một Blob chứa dữ liệu JSON
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'text/plain' });
      
      // Tạo URL cho Blob
      const url = window.URL.createObjectURL(blob);
      
      // Tạo một thẻ a ẩn để download
      const link = document.createElement('a');
      link.href = url;
      link.download = 'api-response.txt';
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('API Test Error:', error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > UI_CONFIG.SCROLL.HEADER_HIDE_OFFSET && currentScrollY > lastScrollY) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <div className="h-[100px]" />
      <header className={`bg-background text-text w-full fixed top-0 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`} style={{ zIndex: 9999 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <Link to="/" className="flex items-center">
            <img src={SITE_CONFIG.LOGO} alt={SITE_CONFIG.NAME} className="h-12 w-auto " />
            <div className="text-2xl font-bold ml-2">{SITE_CONFIG.NAME}</div>
          </Link>
          <nav>
            <ul className="flex space-x-6">
              {NAVIGATION.MAIN_MENU.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`text-text hover:text-primary-hover ${
                      location.pathname === item.path ? 'text-primary font-bold' : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
              <button
                onClick={handleTestAPI}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover"
              >
                Test API
              </button>
          </div>
          <div className="w-64">
            <Search />
          </div>
        </div>
        </div>
      </header>
    </>
  );
};

export default Header;
