import { useQuery } from '@tanstack/react-query';
import { tmdbService } from '../services/tmdb.service.ts';
import { QUERY_KEYS } from '../constants/tmdb.querykeys';

export const useMoviesList = (type: string, params = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.MOVIES.LIST(type),
    queryFn: () => tmdbService.getMoviesList(type, params),
    // thời gian data được coi là "fresh"
    staleTime: 1000 * 60 * 5, // 5 minutes
    // thời gian data được giữ lại trong cache
    gcTime: 1000 * 60 * 60 * 1, // 1 hour
    
    // enabled: true,
    // refetchOnWindowFocus: true,
    retry: 2,
    retryDelay: 1000,
  });
};

export const useLatestMovies = (params = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.MOVIES.LIST('latest'),
    queryFn: () => tmdbService.getMoviesList('latest', params),
  });
};

export const useNowPlayingMovies = (params = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.MOVIES.LIST('now_playing'),
    queryFn: () => tmdbService.getMoviesList('now_playing', params),
  });
};

export const usePopularMovies = (params = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.MOVIES.LIST('popular'),
    queryFn: () => tmdbService.getMoviesList('popular', params),
  });
};

export const useUpcomingMovies = (params = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.MOVIES.LIST('upcoming'),
    queryFn: () => tmdbService.getMoviesList('upcoming', params),
  });
};

export const useTopRatedMovies = (params = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.MOVIES.LIST('top_rated'),
    queryFn: () => tmdbService.getMoviesList('top_rated', params),
  });
};