import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const ModeButton = () => {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove('theme-light');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('theme-light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg
      transition-all duration-300 ease-in-out
      bg-background text-text
      border border-secondary hover:border-secondary-hover
      hover:bg-background-hover
      focus:outline-none focus:ring-2 focus:ring-primary
      shadow-lg"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun size={24} className="transition-transform hover:rotate-12" />
      ) : (
        <Moon size={24} className="transition-transform hover:-rotate-12" />
      )}
    </button>
  );
};

export default ModeButton;