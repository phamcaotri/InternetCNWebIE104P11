import axios from 'axios';
import { tmdbConfig } from '../config/tmdb.config';
import { SITE_CONFIG } from '../config/siteConfig';
import { MovieResponse, Movie } from '../types/movie.types';
import { transformMovie } from '../transforms/movie.transform';
const tmdbApi = axios.create({
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
    const response = await tmdbApi.get(`/movie/${type}`, { params });
    return {
      page: response.data.page,
      results: response.data.results.map(transformMovie),
      totalPages: response.data.total_pages,
      totalResults: response.data.total_results,
    };
  },
  
  getMovieDetails: async (id: number): Promise<Movie> => {
    const response = await tmdbApi.get(`/movie/${id}`);
    return response.data;
  },
  
  // TV Shows
  getTvList: async (type: string, params: any): Promise<MovieResponse> => {
    const response = await tmdbApi.get(`/tv/${type}`, { params });
    return response.data;
  },
  
  getTvDetails: async (id: number): Promise<Movie> => {
    const response = await tmdbApi.get(`/tv/${id}`);
    return response.data;
  },
  
  // Search
  search: async (type: string, params: any): Promise<MovieResponse> => {
    const response = await tmdbApi.get(`/search/${type}`, { params });
    return response.data;
  },

  // Get the list of official genres for movies or TV shows.
  getGenres: async (mediaType: string): Promise<any> => {
    const response = await tmdbApi.get(`/genre/${mediaType}/list`);
    return response.data;
  },
  // Get the daily, weekly, or monthly trending items.
  getTrending: async (mediaType: string, timeWindow: string = 'day', params: any = {}): Promise<any> => {
    const response = await tmdbApi.get(`/trending/${mediaType}/${timeWindow}`, { params });
    return response.data;
  },
  // Get the list of countries (ISO 3166-1 tags) used throughout TMDB.
  getCountries: async (): Promise<any> => {
    const response = await tmdbApi.get('/configuration/countries');
    return response.data;
  },

}