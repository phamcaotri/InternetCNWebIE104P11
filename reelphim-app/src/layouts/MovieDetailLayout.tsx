import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MovieDetailLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Main content with backdrop support */}
      <div className="relative min-h-[calc(100vh-64px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MovieDetailLayout;