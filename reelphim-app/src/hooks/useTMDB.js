import { useState, useEffect } from 'react';
import { tmdbService } from '../services/tmdb.service';

export const useTMDB = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = async (type, params = {}) => {
    try {
      setLoading(true);
      const data = await tmdbService.getMoviesList(type, params);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const fetchTvShows = async (type, params = {}) => {
    try {
      setLoading(true);
      const data = await tmdbService.getTvList(type, params);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return {
    loading,
    error,
    fetchMovies,
    fetchTvShows
  };
};