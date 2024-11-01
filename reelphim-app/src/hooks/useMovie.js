import { useQuery } from '@tanstack/react-query';
import { tmdbService } from '../services/tmdb.service';

export const useMovies = () => {
  // Trending
  const useTrending = (mediaType, timeWindow = 'day', params = {}) => {
    return useQuery({
      queryKey: ['trending', mediaType, timeWindow, params],
      queryFn: () => tmdbService.getTrending(mediaType, timeWindow, params),
    });
  };

  // Movies
  const useNowPlayingMovies = (params = {}) => {
    return useQuery({
      queryKey: ['movies', 'now-playing', params],
      queryFn: () => tmdbService.getNowPlayingMovies(params),
    });
  };

  const usePopularMovies = (params = {}) => {
    return useQuery({
      queryKey: ['movies', 'popular', params],
      queryFn: () => tmdbService.getPopularMovies(params),
    });
  };

  const useUpcomingMovies = (params = {}) => {
    return useQuery({
      queryKey: ['movies', 'upcoming', params],
      queryFn: () => tmdbService.getUpcomingMovies(params),
    });
  };

  const useTopRatedMovies = (params = {}) => {
    return useQuery({
      queryKey: ['movies', 'top-rated', params],
      queryFn: () => tmdbService.getTopRatedMovies(params),
    });
  };

  return {
    useTrending,
    useNowPlayingMovies,
    usePopularMovies,
    useUpcomingMovies,
    useTopRatedMovies,
  };
};