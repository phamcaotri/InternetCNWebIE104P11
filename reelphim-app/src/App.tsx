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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UI_CONFIG, ROUTES_CONFIG } from './config';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: UI_CONFIG.QUERY.STALE_TIME,
      refetchOnWindowFocus: UI_CONFIG.QUERY.REFETCH_ON_WINDOW_FOCUS,
      retry: UI_CONFIG.QUERY.RETRY_COUNT,
    },
  },
})

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path={ROUTES_CONFIG.PUBLIC.WELCOME} element={<WelcomePage />} />
            <Route path={ROUTES_CONFIG.PUBLIC.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES_CONFIG.PUBLIC.REGISTER} element={<RegisterPage />} />
            <Route element={<MainLayout />}>
              <Route path={ROUTES_CONFIG.PRIVATE.HOME} element={<PrivateRoute><HomePage /></PrivateRoute>} />
              <Route path={ROUTES_CONFIG.PRIVATE.GENRES} element={<PrivateRoute><GenrePage /></PrivateRoute>} />
              <Route path={ROUTES_CONFIG.PRIVATE.TV_SHOWS} element={<PrivateRoute><TVShowsPage /></PrivateRoute>} />
              <Route path={ROUTES_CONFIG.PRIVATE.MOVIES} element={<PrivateRoute><MoviesPage /></PrivateRoute>} />
              <Route path={ROUTES_CONFIG.PRIVATE.SEARCH} element={<PrivateRoute><SearchResultsPage /></PrivateRoute>} />
              <Route path={ROUTES_CONFIG.PRIVATE.MOVIE_DETAIL} element={<PrivateRoute><MovieDetailPage /></PrivateRoute>} />
            </Route>
            <Route path="*" element={<Navigate to={ROUTES_CONFIG.NAVIGATION.DEFAULT_REDIRECT} replace />} />
          </Routes>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
};

export default App;