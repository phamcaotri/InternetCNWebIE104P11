  // TRANG WEB CHÍNH CỦA WEB.
import React, { useEffect } from 'react';
import LogRoutes from './components/checkLog';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';import MainLayout from './layouts/MainLayout';
import MovieDetailLayout from './layouts/MovieDetailLayout';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import TVShowsPage from './pages/TVShowsPage';
import MoviesPage from './pages/MoviesPage';
import UserPage from './pages/UserPage';
import SearchResultsPage from './pages/SearchResultsPage';
import MovieDetailPage from './pages/MovieDetailPage';
import WatchMoviePage from './pages/WatchMoviePage';
import WatchMovieLayout from './layouts/WatchMovieLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UI_CONFIG, ROUTES_CONFIG } from './config';
import CategoryPage from './pages/CategoryPage';
import TVShowDetailPage from './pages/TVShowsDetailPage';
import WatchTVShowPage from './pages/WatchTVShowPage';
import ForgotPassword from './pages/ForgotPasswordPage';
import FavoriteMoviesTestPage from './pages/FavoriteMoviesTestPage';
const { PrivateRoute, PublicRoute } = LogRoutes;
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
          <Route path="/test-favorites" element={<FavoriteMoviesTestPage />} />
            {/* Public Routes */}
            <Route element={<PublicRoute />}>
                <Route path={ROUTES_CONFIG.PUBLIC.WELCOME} element={<WelcomePage />} />
                <Route path={ROUTES_CONFIG.PUBLIC.LOGIN} element={<LoginPage />} />
                <Route path={ROUTES_CONFIG.PUBLIC.REGISTER} element={<RegisterPage />} />
                <Route path={ROUTES_CONFIG.PUBLIC.FORGOT_PASSWORD} element={<ForgotPassword />} />
            </Route>

            {/* Protected Routes */}
            <Route element={<MainLayout />}>
              <Route path={ROUTES_CONFIG.PRIVATE.HOME} element={<PrivateRoute><HomePage /></PrivateRoute>} />
              <Route path={ROUTES_CONFIG.PRIVATE.USER} element={<PrivateRoute><UserPage /></PrivateRoute>} />
              <Route path={ROUTES_CONFIG.PRIVATE.TV_SHOWS} element={<PrivateRoute><TVShowsPage /></PrivateRoute>} />
              <Route path={ROUTES_CONFIG.PRIVATE.MOVIES} element={<PrivateRoute><MoviesPage /></PrivateRoute>} />
              <Route path={ROUTES_CONFIG.PRIVATE.SEARCH} element={<PrivateRoute><SearchResultsPage /></PrivateRoute>} />
              <Route path={ROUTES_CONFIG.PRIVATE.WATCH_MOVIE} element={<PrivateRoute><WatchMoviePage /></PrivateRoute>} />
              <Route path={ROUTES_CONFIG.PRIVATE.CATEGORY} element={<PrivateRoute><CategoryPage /></PrivateRoute>} />
            </Route>

            {/* Movie Detail Layout */}
            <Route element={<MovieDetailLayout />}>
              <Route path={ROUTES_CONFIG.PRIVATE.MOVIE_DETAIL} element={<PrivateRoute><MovieDetailPage /></PrivateRoute>} />
              <Route path={ROUTES_CONFIG.PRIVATE.TV_SHOW_DETAIL} element={<PrivateRoute><TVShowDetailPage /></PrivateRoute>} />
            </Route>

            {/* Watch Movie Layout */}
            <Route element={<WatchMovieLayout />}>
              <Route path={ROUTES_CONFIG.PRIVATE.WATCH_MOVIE} element={<PrivateRoute><WatchMoviePage /></PrivateRoute>} />
              <Route path={ROUTES_CONFIG.PRIVATE.WATCH_TV_SHOW} element={<PrivateRoute><WatchTVShowPage /></PrivateRoute>} />
            </Route>

            {/* Redirect Unknown Routes */}
            <Route path="*" element={<Navigate to={ROUTES_CONFIG.NAVIGATION.DEFAULT_REDIRECT} replace />} />
          </Routes>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
};

export default App;