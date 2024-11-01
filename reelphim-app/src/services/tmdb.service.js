import axios from 'axios';
import { tmdbConfig } from '../config/tmdb.config';

const tmdbApi = axios.create({
  baseURL: tmdbConfig.baseUrl,
  params: {
    api_key: tmdbConfig.apiKey,
  },
});

export const tmdbService = {
  // Movies
  getMoviesList: async (type, params) => {
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
  }
};