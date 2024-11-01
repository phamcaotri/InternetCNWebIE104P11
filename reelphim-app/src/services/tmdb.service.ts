import axios from 'axios';
import { tmdbConfig } from '../config/tmdb.config';
import { MovieResponse } from '../types/movie.types';

const tmdbApi = axios.create({
  baseURL: tmdbConfig.baseUrl,
  params: {
    api_key: tmdbConfig.apiKey,
  },
});

export const tmdbService = {
  // Movies
  getMoviesList: async (type, params): Promise<MovieResponse> => {
    const response = await tmdbApi.get(`/movie/${type}`, { params });
    return response.data;
  },
  
  getMovieDetails: async (id) => {
    const response = await tmdbApi.get(`/movie/${id}`);
    return response.data;
  },
  
  // TV Shows
  getTvList: async (type, params) => {
    const response = await tmdbApi.get(`/tv/${type}`, { params });
    return response.data;
  },
  
  getTvDetails: async (id) => {
    const response = await tmdbApi.get(`/tv/${id}`);
    return response.data;
  },
  
  // Search
  search: async (type, params) => {
    const response = await tmdbApi.get(`/search/${type}`, { params });
    return response.data;
  },

  // Categories/Genres
  getGenres: async (mediaType) => {
    const response = await tmdbApi.get(`/genre/${mediaType}/list`);
    return response.data;
  },
  // Trending
  getTrending: async (mediaType, timeWindow = 'day', params = {}) => {
    const response = await tmdbApi.get(`/trending/${mediaType}/${timeWindow}`, { params });
    return response.data;
  },

  // Movies Extended
  getNowPlayingMovies: async (params) => {
    const response = await tmdbApi.get('/movie/now_playing', { params });
    return response.data;
  },

  getPopularMovies: async (params) => {
    const response = await tmdbApi.get('/movie/popular', { params });
    return response.data;
  },

  getUpcomingMovies: async (params) => {
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

