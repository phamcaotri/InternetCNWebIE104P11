import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
const WatchMovieLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Main content without footer for better viewing experience */}
      <div className="min-h-[calc(100vh-64px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default WatchMovieLayout;