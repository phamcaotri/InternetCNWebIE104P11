import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import GenrePage from './pages/GenrePage';
import TVShowsPage from './pages/TVShowsPage';
import MoviesPage from './pages/MoviesPage';
import SearchResultsPage from './pages/SearchResultsPage';
import MovieDetailPage from './pages/MovieDetailPage';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-background text-white flex flex-col">
        <Header />
        <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/genres" element={<GenrePage />} />
            <Route path="/tv-shows" element={<TVShowsPage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;