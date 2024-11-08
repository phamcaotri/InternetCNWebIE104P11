import { QueryClient } from '@tanstack/react-query';
import { API_CONFIG } from './api.config';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: API_CONFIG.CACHE.STALE_TIME,
      gcTime: API_CONFIG.CACHE.TTL,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});