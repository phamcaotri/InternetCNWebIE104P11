import axios from 'axios';
import { tmdbConfig } from '../config/tmdb.config';
import { SITE_CONFIG } from '../config/siteConfig';
import { transformMovieItem, transformTvItem, transformMovieResponse, transformTvResponse } from '../transforms/media.transform';
import { 
  MovieItem, 
  TvItem,
  MovieResponse,
  TvResponse,
  TMDBMovieResponse,
  TMDBTvResponse,
  TMDBMovie,
  TMDBTv
} from '../types/media.types';
const tmdbHttpRequest = axios.create({
  baseURL: tmdbConfig.baseUrl,
  params: {
    api_key: tmdbConfig.apiKey,
    language: SITE_CONFIG.LANGUAGE,
  },
});

export const tmdbService = {
  /**
  * Common type:
  * - now_playing: Get the list of movies currently in theatres. params: page, region
  * - upcoming: Get the list of movies that are being released soon.
  * - top_rated: Get the list of movies ordered by rating.
  * - popular: Get the list of movies ordered by popularity.
  * - latest: Get the list of latest movies.
  */
  getMoviesList: async (type: string, params: any): Promise<MovieResponse> => {
    const response = await tmdbHttpRequest.get<TMDBMovieResponse>(`/movie/${type}`, { params });
    return transformMovieResponse(response.data);
  },
  
  getMovieDetails: async (id: number): Promise<MovieItem> => {
    const response = await tmdbHttpRequest.get<TMDBMovie>(`/movie/${id}`);
    return transformMovieItem(response.data);
  },
  
  getTvList: async (type: string, params: any): Promise<TvResponse> => {
    const response = await tmdbHttpRequest.get<TMDBTvResponse>(`/tv/${type}`, { params });
    return transformTvResponse(response.data);
  },
  
  getTvDetails: async (id: number): Promise<TvItem> => {
    const response = await tmdbHttpRequest.get<TMDBTv>(`/tv/${id}`);
    return transformTvItem(response.data);
  },
  
  searchMovies: async (type: string, params: any): Promise<MovieResponse> => {
    const response = await tmdbHttpRequest.get<TMDBMovieResponse>(`/search/${type}`, { params });
    return transformMovieResponse(response.data);
  },

  searchTv: async (type: string, params: any): Promise<TvResponse> => {
    const response = await tmdbHttpRequest.get<TMDBTvResponse>(`/search/${type}`, { params });
    return transformTvResponse(response.data);
  },
  
  // Get the list of official genres for movies or TV shows.
  getGenres: async (mediaType: string): Promise<any> => {
    const response = await tmdbHttpRequest.get(`/genre/${mediaType}/list`);
    return response.data;
  },
  // Get the daily, weekly, or monthly trending items.
  getTrending: async (mediaType: string, timeWindow: string = 'day', params: any = {}): Promise<any> => {
    const response = await tmdbHttpRequest.get(`/trending/${mediaType}/${timeWindow}`, { params });
    return response.data;
  },
  // Get the list of countries (ISO 3166-1 tags) used throughout TMDB.
  getCountries: async (): Promise<any> => {
    const response = await tmdbHttpRequest.get('/configuration/countries');
    return response.data;
  },

}