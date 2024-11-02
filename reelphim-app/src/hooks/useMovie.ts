import { useQuery } from '@tanstack/react-query';
import { tmdbService } from '../services/tmdb.service.ts';

// Tách riêng từng hook ra
export const useLatestMovies = (params = {}) => {
  return useQuery({
    queryKey: ['movies', 'latest', params],
    queryFn: () => tmdbService.getMoviesList('latest', params),
  });
};

export const useNowPlayingMovies = (params = {}) => {
  return useQuery({
    queryKey: ['movies', 'now_playing', params],
    queryFn: () => tmdbService.getMoviesList('now_playing', params),
  });
};

export const usePopularMovies = (params = {}) => {
  return useQuery({
    queryKey: ['movies', 'popular', params],
    queryFn: () => tmdbService.getMoviesList('popular', params),
  });
};

export const useUpcomingMovies = (params = {}) => {
  return useQuery({
    queryKey: ['movies', 'upcoming', params],
    queryFn: () => tmdbService.getMoviesList('upcoming', params),
  });
};

export const useTopRatedMovies = (params = {}) => {
  return useQuery({
    queryKey: ['movies', 'top_rated', params],
    queryFn: () => tmdbService.getMoviesList('top_rated', params),
  });
};