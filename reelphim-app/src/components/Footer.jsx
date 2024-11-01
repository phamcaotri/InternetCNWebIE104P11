import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG, NAVIGATION } from '../config/siteConfig';
import { Sun, Moon } from 'lucide-react';

const Footer = () => {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });
  const toggleTheme = () => {
      setIsDark(!isDark);
    };
  useEffect(() => {
    // Lưu theme vào localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Thêm/xóa class dark ở thẻ jsx và thay đổi màu nền()
    if (isDark) {

    } else {

    }
  }, [isDark]);
  

  return (
    <footer className="bg-background-light w-full mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{SITE_CONFIG.NAME}</h3>
            <p className="text-text-muted">{SITE_CONFIG.DESCRIPTION}</p>
            <button
              onClick={toggleTheme}
              className="relative top-5 p-2 rounded-lg
                transition-all duration-300 ease-in-out
                bg-white hover:bg-gray-100
                text-gray-800 hover:text-gray-900
                border border-gray-200
                focus:outline-none focus:ring-2 focus:ring-red-500
                shadow-lg"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
              {isDark ? (
                <Sun size={24} className="transition-transform hover:rotate-12" />
              ) : (
                <Moon size={24} className="transition-transform hover:-rotate-12" />
              )}
            </button>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Liên kết</h4>
            <ul className="space-y-2">
              {NAVIGATION.FOOTER_LINKS.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="hover:text-primary-hover">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Liên hệ</h4>
            <p>Email: {SITE_CONFIG.CONTACT_EMAIL}</p>
            <p>Điện thoại: {SITE_CONFIG.SUPPORT_PHONE}</p>
          </div>

        </div>
        <div className="mt-8 pt-8 border-t border-secondary-light text-center text-text-muted">
          <p>{SITE_CONFIG.COPYRIGHT}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;