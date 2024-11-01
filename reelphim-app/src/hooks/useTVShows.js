import { useQuery } from '@tanstack/react-query';
import { tmdbService } from '../services/tmdb.service';

export const useTvShows = () => {
  const useOnAirTvShows = (params = {}) => {
    return useQuery({
      queryKey: ['tv', 'on-air', params],
      queryFn: () => tmdbService.getOnAirTvShows(params),
    });
  };

  const usePopularTvShows = (params = {}) => {
    return useQuery({
      queryKey: ['tv', 'popular', params],
      queryFn: () => tmdbService.getPopularTvShows(params),
    });
  };

  const useAiringTodayTvShows = (params = {}) => {
    return useQuery({
      queryKey: ['tv', 'airing-today', params],
      queryFn: () => tmdbService.getAiringTodayTvShows(params),
    });
  };

  const useTopRatedTvShows = (params = {}) => {
    return useQuery({
      queryKey: ['tv', 'top-rated', params],
      queryFn: () => tmdbService.getTopRatedTvShows(params),
    });
  };

  return {
    useOnAirTvShows,
    usePopularTvShows,
    useAiringTodayTvShows,
    useTopRatedTvShows,
  };
};