import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/movie_poster_background.jpg';

const WelcomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="absolute inset-0 bg-background opacity-70 z-10"></div>
      <div className="form-container">
        <div className="text-center">
          <h2 className="mt-6 text-4xl font-extrabold text-text">
            Welcome to ReelPhim
          </h2>
          <p className="mt-2 text-sm text-text-muted">
            Your ultimate destination for movies and TV shows
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div>
            <Link
              to="/login"
              className="btn-primary"
            >
              Sign In
            </Link>
          </div>
          <div>
            <Link
              to="/register"
              className="btn-secondary"
            >
              Create an Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;