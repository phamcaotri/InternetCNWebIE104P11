import { TMDB_CONFIG, SITE_CONFIG } from '../config';
import { 
  TMDBMovie, 
  TMDBTv, 
  TMDBMovieResponse, 
  TMDBTvResponse,  
  MovieItem, 
  TvItem, 
  MovieResponse, 
  TvResponse 
} from '../types/media.types';

export const isMovie = (item: TMDBMovie | TMDBTv): item is TMDBMovie => {
  return 'release_date' in item;
}

export const formatReleaseDate = (date: string | null): string => {
  if (!date) return '';
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  } as const;
  return new Date(date).toLocaleDateString(SITE_CONFIG.LANGUAGE, options);
};

export const transformMovieResponse = (response: TMDBMovieResponse): MovieResponse => {   
  const filteredResults = response.results?.filter(item => {
    return Boolean(
      item && // Not null
      item.title && // Has title
      item.overview && // Has overview
      item.poster_path && // Has image
      item.release_date // Has release date
    );
  });
  return {
    page: response.page,
    results: filteredResults?.map(transformMovieItem).filter(Boolean) || [],
    totalPages: response.total_pages,
    totalResults: response.total_results,
  }
}

export const transformTvResponse = (response: TMDBTvResponse): TvResponse => {   
  const filteredResults = response.results?.filter(item => {
    return Boolean(
      item && // Not null
      item.name && // Has title
      item.overview && // Has overview
      item.poster_path && // Has image
      item.first_air_date // Has release date
    );
  });
  return {
    page: response.page,
    results: filteredResults?.map(transformTvItem).filter(Boolean) || [],
    totalPages: response.total_pages,
    totalResults: response.total_results,
  }
}

export const transformMovieItem = (item: TMDBMovie): MovieItem => {
  return {
    id: item.id,
    title: item.title,
    overview: item.overview,
    posterPath: item.poster_path ? TMDB_CONFIG.w500Image(item.poster_path) : null,
    backdropPath: item.backdrop_path ? TMDB_CONFIG.originalImage(item.backdrop_path) : null,
    releaseDate: item.release_date || '',
    releaseDateFormatted: formatReleaseDate(item.release_date),
    voteAverage: item.vote_average || 0,
    voteCount: item.vote_count || 0,
    popularity: item.popularity || 0,
    adult: item.adult || false,
    originalLanguage: item.original_language || '',
    mediaType: item.media_type || 'movie',
  }
};

export const transformTvItem = (item: TMDBTv): TvItem => {
  return {
    id: item.id,
    title: item.name,
    overview: item.overview,
    posterPath: item.poster_path ? TMDB_CONFIG.w500Image(item.poster_path) : null,
    backdropPath: item.backdrop_path ? TMDB_CONFIG.originalImage(item.backdrop_path) : null,
    releaseDate: item.first_air_date || '',
    releaseDateFormatted: formatReleaseDate(item.first_air_date),
    voteAverage: item.vote_average || 0,
    voteCount: item.vote_count || 0,
    popularity: item.popularity || 0,
    adult: item.adult || false,
    originalLanguage: item.original_language || '',
    mediaType: item.media_type || 'tv',
  }
}