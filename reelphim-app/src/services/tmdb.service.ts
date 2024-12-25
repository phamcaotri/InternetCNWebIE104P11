import axios from 'axios';
import { TMDB_CONFIG } from '../config';
import { SITE_CONFIG } from '../config/site.config';
import { transformMovieItem, transformTvItem, transformMovieResponse, transformTvResponse, transformMovieDetails, transformTvDetails } from '../transforms/media.transform';
import { 
  MovieItem, 
  TvItem,
  MovieResponse,
  TvResponse,
  TMDBMovieResponse,
  TMDBTvResponse,
  TMDBMovie,
  TMDBTv,
  MovieDetails,
  TvDetails,
  TMDBMovieDetails,
  TMDBTvDetails
} from '../types/media.types';
const tmdbHttpRequest = axios.create({
  baseURL: TMDB_CONFIG.baseUrl,
  params: {
    api_key: TMDB_CONFIG.apiKey,
    language: SITE_CONFIG.LANGUAGE,
    include_adult: TMDB_CONFIG.includeAdult,
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
  
  getMovieDetails: async (id: number, params: any): Promise<MovieDetails> => {
    const response = await tmdbHttpRequest.get<TMDBMovieDetails>(`/movie/${id}`, { params });
    return transformMovieDetails(response.data);
  },
  
  getTvList: async (type: string, params: any): Promise<TvResponse> => {
    const response = await tmdbHttpRequest.get<TMDBTvResponse>(`/tv/${type}`, { params });
    return transformTvResponse(response.data);
  },
  
  getTvDetails: async (id: number, params: any): Promise<TvDetails> => {
    const response = await tmdbHttpRequest.get<TMDBTvDetails>(`/tv/${id}`, { params });
    return transformTvDetails(response.data);
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

  getMoviesByGenre: async (genreId: number, params: any = {}): Promise<MovieResponse> => {
    const response = await tmdbHttpRequest.get<TMDBMovieResponse>('/discover/movie', {
      params: { ...params, with_genres: genreId },
    });
    return transformMovieResponse(response.data);
  },  

}