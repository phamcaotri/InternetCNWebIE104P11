import { useQuery } from '@tanstack/react-query';
import { tmdbService } from '../services/tmdb.service.ts';

export const useMovies = () => {
  // Latest
  const useLatestMovies = (params = {}) => {
    return useQuery({
      queryFn: () => tmdbService.getMoviesList('latest', params),
    });
  };

  // Movies
  const useNowPlayingMovies = (params = {}) => {
    return useQuery({
      queryFn: () => tmdbService.getMoviesList('now_playing', params),
    });
  };

  const usePopularMovies = (params = {}) => {
    return useQuery({
      queryFn: () => tmdbService.getMoviesList('popular', params),
    });
  };

  const useUpcomingMovies = (params = {}) => {
    return useQuery({
      queryFn: () => tmdbService.getMoviesList('upcoming', params),
    });
  };

  const useTopRatedMovies = (params = {}) => {
    return useQuery({
      queryFn: () => tmdbService.getMoviesList('top_rated', params),
    });
  };

  return {
    useLatestMovies,
    useNowPlayingMovies,
    usePopularMovies,
    useUpcomingMovies,
    useTopRatedMovies,
  };
};