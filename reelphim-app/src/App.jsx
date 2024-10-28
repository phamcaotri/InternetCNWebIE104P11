// TRANG WEB CHÍNH CỦA WEB.
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './layouts/MainLayout';
import PrivateRoute from './components/PrivateRoute';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import GenrePage from './pages/GenrePage';
import TVShowsPage from './pages/TVShowsPage';
import MoviesPage from './pages/MoviesPage';
import SearchResultsPage from './pages/SearchResultsPage';
import MovieDetailPage from './pages/MovieDetailPage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<MainLayout />}>
            <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
            <Route path="/genres" element={<PrivateRoute><GenrePage /></PrivateRoute>} />
            <Route path="/tv-shows" element={<PrivateRoute><TVShowsPage /></PrivateRoute>} />
            <Route path="/movies" element={<PrivateRoute><MoviesPage /></PrivateRoute>} />
            <Route path="/search" element={<PrivateRoute><SearchResultsPage /></PrivateRoute>} />
            <Route path="/movie/:id" element={<PrivateRoute><MovieDetailPage /></PrivateRoute>} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;