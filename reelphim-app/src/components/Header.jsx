import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SITE_CONFIG, NAVIGATION } from '../config/siteConfig';
import Search from './Search';

const Header = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <div className="h-[128px]" />
      <header className={`bg-secondary w-full fixed top-0 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`} style={{ zIndex: 9999 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <Link to="/" className="flex items-center">
            <img src={SITE_CONFIG.LOGO} alt={SITE_CONFIG.NAME} className="h-12 w-auto" />
            <div className="text-2xl font-bold ml-2">{SITE_CONFIG.NAME}</div>
          </Link>
          <nav>
            <ul className="flex space-x-6">
              {NAVIGATION.MAIN_MENU.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`hover:text-primary-hover ${
                      location.pathname === item.path ? 'text-primary font-bold' : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
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