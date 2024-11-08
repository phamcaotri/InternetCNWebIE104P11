import { tmdbConfig } from '../config/tmdb.config';
import { SITE_CONFIG } from '../config/siteConfig';
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
  return new Date(date).toLocaleDateString(SITE_CONFIG.LANGUAGE, { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

export const transformMovieResponse = (response: TMDBMovieResponse): MovieResponse => {   
  return {
    page: response.page,
    results: response.results?.map(transformMovieItem).filter(Boolean) || [],
    totalPages: response.total_pages,
    totalResults: response.total_results,
  }
}

export const transformTvResponse = (response: TMDBTvResponse): TvResponse => {   
  return {
    page: response.page,
    results: response.results?.map(transformTvItem).filter(Boolean) || [],
    totalPages: response.total_pages,
    totalResults: response.total_results,
  }
}

export const transformMovieItem = (item: TMDBMovie): MovieItem => {
  return {
    id: item.id,
    title: item.title,
    overview: item.overview,
    posterPath: item.poster_path ? tmdbConfig.w500Image(item.poster_path) : null,
    backdropPath: item.backdrop_path ? tmdbConfig.originalImage(item.backdrop_path) : null,
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
    posterPath: item.poster_path ? tmdbConfig.w500Image(item.poster_path) : null,
    backdropPath: item.backdrop_path ? tmdbConfig.originalImage(item.backdrop_path) : null,
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

// export const transformMediaItem = (item: MovieItem | TvItem): MediaItem => {  
//   return {
//     id: item.id,
//     title: item.title,
//     overview: item.overview,
//     posterPath: item.posterPath ? tmdbConfig.w500Image(item.posterPath) : null,
//     backdropPath: item.backdropPath ? tmdbConfig.originalImage(item.backdropPath) : null,
//     releaseDate: item.releaseDate,
//     releaseDateFormatted: formatReleaseDate(item.releaseDate),
//     voteAverage: item.voteAverage || 0,
//     voteCount: item.voteCount || 0,
//     popularity: item.popularity || 0,
//     adult: item.adult || false,
//     originalLanguage: item.originalLanguage || '',
//     mediaType: item.mediaType || 'movie',
//   };
// };

// export const transformMediaResponse = (response: MovieResponse | TvResponse): MediaResponse => {
//   const filteredResults = response.results?.filter(item => {
//     // Check for required metadata
//     return Boolean(
//       item && // Not null
//       item.title && // Has title
//       item.overview && // Has overview
//       item.posterPath && // Has image
//       item.releaseDate // Has release date
//     );
//   });

//   return {
//     page: response.page,
//     results: filteredResults?.map(transformMediaItem).filter(Boolean) || [],
//     totalPages: response.totalPages,
//     totalResults: response.totalResults,
//   };
// };