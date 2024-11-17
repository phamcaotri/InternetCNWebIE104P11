import { useQuery } from '@tanstack/react-query';
import { tmdbService } from './tmdb.service';
import { QUERY_KEYS } from '../constants/tmdb.querykeys';

export const useMovieQuery = (type: string, params = {}) =>  {
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

export const useSearchMoviesQuery = (type: string, params = {}) => {
    return useQuery({
      // Add params to queryKey to ensure it updates when search params change
      queryKey: [...QUERY_KEYS.SEARCH(type), params],
      queryFn: () => tmdbService.searchMovies(type, params),
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 60 * 1, // 1 hour
      retry: 2,
      retryDelay: 1000,
    });
  };

export const useSearchTvQuery = (type: string, params = {}) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.SEARCH(type), params],
    queryFn: () => tmdbService.searchTv(type, params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 60 * 1, // 1 hour
    retry: 2,
    retryDelay: 1000,
  });
};

export const useGetMovieDetailsQuery = (id: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.MOVIES.DETAILS(id),
    queryFn: () => tmdbService.getMovieDetails(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 60 * 1, // 1 hour
    retry: 2,
    retryDelay: 1000,
  });
};

export const useGetTvDetailsQuery = (id: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.TV.DETAILS(id),
    queryFn: () => tmdbService.getTvDetails(id),
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
  LatestTvShows(params = {}) {
    return useTvShowQuery('latest', params);
  }
  PopularTvShows(params = {}) {
    return useTvShowQuery('popular', params);
  }
  UpcomingTvShows(params = {}) {
    return useTvShowQuery('upcoming', params);
  }
  TopRatedTvShows(params = {}) {
    return useTvShowQuery('top_rated', params);
  }
  PopularTVShows(params = {}) {
    return useTvShowQuery('popular', params);
  }
  NowPlayingTVShows(params = {}) {
    return useTvShowQuery('now_playing', params);
  }
  TopRatedTVShows(params = {}) {
    return useTvShowQuery('top_rated', params);
  }
  SearchMovies(params = {}) {
    return useSearchMoviesQuery('movie', params);
  }
  SearchTvShows(params = {}) {
    return useSearchTvQuery('tv', params);
  }
  Search(params = {}) {
    return useSearchMoviesQuery('multi', params);
  }
  GetMovieDetails(id: number) {
    return useGetMovieDetailsQuery(id);
  }
  GetTvDetails(id: number) {
    return useGetTvDetailsQuery(id);
  }
}

export const tmdbapi = new TMDBApi();