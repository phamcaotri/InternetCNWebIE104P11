import { API_CONFIG } from './api.config';

export const TMDB_CONFIG = {
  baseUrl: API_CONFIG.TMDB.BASE_URL,
  apiKey: API_CONFIG.TMDB.API_KEY,
  imageBaseUrl: API_CONFIG.TMDB.IMAGE_BASE_URL,
  originalImage: (path: string) => `${API_CONFIG.TMDB.IMAGE_BASE_URL}/${API_CONFIG.TMDB.IMAGE_SIZES.ORIGINAL}${path}`,
  w500Image: (path: string) => `${API_CONFIG.TMDB.IMAGE_BASE_URL}/${API_CONFIG.TMDB.IMAGE_SIZES.POSTER.LARGE}${path}`,
  includeAdult: API_CONFIG.TMDB.INCLUDE_ADULT,
};