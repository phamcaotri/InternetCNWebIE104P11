import { useQuery } from '@tanstack/react-query';
import { tmdbService } from './tmdb.service.ts';
import { QUERY_KEYS } from '../constants/tmdb.querykeys';

export const useMovieQuery = (type: string, params = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.MOVIES.LIST(type),
    queryFn: () => tmdbService.getMoviesList(type, params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 60 * 1, // 1 hour
    retry: 2,
    retryDelay: 1000,
  });
};

export const useTvShowQuery = (type: string, params = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.TV.LIST(type),
    queryFn: () => tmdbService.getTvList(type, params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 60 * 1, // 1 hour
    retry: 2,
    retryDelay: 1000,
  });
};


export const useSearchQuery = (type: string, params = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.SEARCH(type),
    queryFn: () => tmdbService.search(type, params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 60 * 1, // 1 hour
    retry: 2,
    retryDelay: 1000,
  });
};

// export const useTrendingQuery = (mediaType: string, timeWindow: string, params = {}) => {
//   return useQuery({
//     queryKey: QUERY_KEYS.TRENDING(mediaType, timeWindow),
//     queryFn: () => tmdbService.trending(mediaType, timeWindow, params),
//     staleTime: 1000 * 60 * 5, // 5 minutes
//     gcTime: 1000 * 60 * 60 * 1, // 1 hour
//     retry: 2,
//     retryDelay: 1000,
//   });
// };

class TMDBApi {
  LatestMovies(params = {}) {
    return useMovieQuery('latest', params);
  }
  NowPlayingMovies(params = {}) {
    return useMovieQuery('now_playing', params);
  }
  PopularMovies(params = {}) {
    return useMovieQuery('popular', params);
  }
  UpcomingMovies(params = {}) {
    return useMovieQuery('upcoming', params);
  }
  TopRatedMovies(params = {}) {
    return useMovieQuery('top_rated', params);
  }
}

export const tmdbapi = new TMDBApi();