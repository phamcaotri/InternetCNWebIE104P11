import { useQuery } from '@tanstack/react-query';
import { tmdbService } from './tmdb.service';
import { QUERY_KEYS } from '../constants/tmdb.querykeys';

export const useMovieQuery = (type: string, params = {}) =>  {
  return useQuery({
    queryKey: QUERY_KEYS.MOVIES.LIST(type),
    queryFn: () => tmdbService.getMoviesList(type, params),
  });
};

export const useTvShowQuery = (type: string, params = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.TV.LIST(type),
    queryFn: () => tmdbService.getTvList(type, params),
  });
};

export const useSearchMoviesQuery = (type: string, params = {}) => {
    return useQuery({
      // Add params to queryKey to ensure it updates when search params change
      queryKey: [...QUERY_KEYS.SEARCH(type), params],
      queryFn: () => tmdbService.searchMovies(type, params),
    });
  };

export const useSearchTvQuery = (type: string, params = {}) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.SEARCH(type), params],
    queryFn: () => tmdbService.searchTv(type, params),
  });
};

export const useGetMovieDetailsQuery = (id: number, params = {}) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.MOVIES.DETAILS(id), params],
    queryFn: () => tmdbService.getMovieDetails(id, params),
  });
};

export const useGetTvDetailsQuery = (id: number, params = {}) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.TV.DETAILS(id), params],
    queryFn: () => tmdbService.getTvDetails(id, params),
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
  AiringTodayTvShows(params = {}) {
    return useTvShowQuery('airing_today', params);
  }
  OnTheAirTvShows(params = {}) {
    return useTvShowQuery('on_the_air', params);
  }
  PopularTvShows(params = {}) {
    return useTvShowQuery('popular', params);
  }
  TopRatedTvShows(params = {}) {
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
  GetMovieDetails(id: number, params = {}) {
    return useGetMovieDetailsQuery(id, params);
  }
  GetTvDetails(id: number, params = {}) {
    return useGetTvDetailsQuery(id, params);
  }
}

export const tmdbapi = new TMDBApi();