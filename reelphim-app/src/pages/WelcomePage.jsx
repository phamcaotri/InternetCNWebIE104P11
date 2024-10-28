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
      <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
      <div className="max-w-md w-full space-y-8 p-10 bg-background bg-opacity-80 rounded-xl shadow-lg relative z-20">
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
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150 ease-in-out"
            >
              Sign In
            </Link>
          </div>
          <div>
            <Link
              to="/register"
              className="w-full flex justify-center py-3 px-4 border border-primary rounded-md shadow-sm text-sm font-medium text-primary bg-transparent hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150 ease-in-out"
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