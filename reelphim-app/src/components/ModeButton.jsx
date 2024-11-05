import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const ModeButton = () => {
    const [isDark, setIsDark] = useState(true);
  
    // useEffect(() => {
    //     const savedTheme = localStorage.getItem('theme');
    //     if (savedTheme) {
    //     setIsDark(savedTheme === 'dark');
    //     applyTheme(savedTheme === 'dark');
    //     }
    // }, []);

    const applyTheme = (darkMode) => {
        const theme = darkMode ? colors.theme.extend.colors : colors.theme.extend.Light;
        const root = document.documentElement;

        // Áp dụng tất cả các màu từ theme
        Object.entries(theme).forEach(([category, values]) => {
            Object.entries(values).forEach(([key, value]) => {
                const cssKey = key === 'DEFAULT' ? category : `${category}-${key}`;
                root.style.setProperty(`--color-${cssKey}`, value);
            });
        });
    };

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    };
    return (
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
    );
};
export default ModeButton;