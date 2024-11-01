import axios from 'axios';
import { tmdbConfig } from '../config/tmdb.config';
import { MovieResponse, Movie } from '../types/movie.types';
const tmdbApi = axios.create({
  baseURL: tmdbConfig.baseUrl,
  params: {
    api_key: tmdbConfig.apiKey,
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
  // Movies
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

  // Categories/Genres
  getGenres: async (mediaType: string): Promise<any> => {
    const response = await tmdbApi.get(`/genre/${mediaType}/list`);
    return response.data;
  },
  // Trending
  getTrending: async (mediaType: string, timeWindow: string = 'day', params: any = {}): Promise<any> => {
    const response = await tmdbApi.get(`/trending/${mediaType}/${timeWindow}`, { params });
    return response.data;
  },

  // Movies Extended
  getNowPlayingMovies: async (params: any): Promise<any> => {
    const response = await tmdbApi.get('/movie/now_playing', { params });
    return response.data;
  },

  getPopularMovies: async (params: any): Promise<any> => {
    const response = await tmdbApi.get('/movie/popular', { params });
    return response.data;
  },

  getUpcomingMovies: async (params: any): Promise<any> => {
    const response = await tmdbApi.get('/movie/upcoming', { params });
    return response.data;
  },

  getTopRatedMovies: async (params) => {
    const response = await tmdbApi.get('/movie/top_rated', { params });
    return response.data;
  },

  // TV Shows Extended
  getOnAirTvShows: async (params) => {
    const response = await tmdbApi.get('/tv/on_the_air', { params });
    return response.data;
  },

  getPopularTvShows: async (params) => {
    const response = await tmdbApi.get('/tv/popular', { params });
    return response.data;
  },

  getAiringTodayTvShows: async (params) => {
    const response = await tmdbApi.get('/tv/airing_today', { params });
    return response.data;
  },

  getTopRatedTvShows: async (params) => {
    const response = await tmdbApi.get('/tv/top_rated', { params });
    return response.data;
  },
};

