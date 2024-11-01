import axios from 'axios';
import { tmdbConfig } from '../config/tmdb.config';
import { SITE_CONFIG } from '../config/siteConfig';
import { MovieResponse, Movie } from '../types/movie.types';
const tmdbApi = axios.create({
  baseURL: tmdbConfig.baseUrl,
  params: {
    api_key: tmdbConfig.apiKey,
    language: SITE_CONFIG.LANGUAGE,
  },
});
// const tmdbApi = axios.create({
//   baseURL: tmdbConfig.baseUrl,
//   params: {
//     api_key: tmdbConfig.apiKey,
//     language: 'vi-VN',  // Ngôn ngữ mặc định là tiếng Việt
//     include_adult: false,  // Loại bỏ nội dung người lớn
//     include_video: true,  // Bao gồm thông tin video nếu có
//   },
// });

export const tmdbService = {
  /** Get the list of movies in theaters.
  * Common type:
  * - now_playing: Get the list of movies in theaters.
  * - upcoming: Get the list of upcoming movies.
  * - top_rated: Get the list of top-rated movies.
  * - popular: Get the list of popular movies.
  * - latest: Get the list of latest movies.
  */
  getMoviesList: async (type: string, params: any): Promise<MovieResponse> => {
    const response = await tmdbApi.get(`/movie/${type}`, { params });
    return response.data;
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