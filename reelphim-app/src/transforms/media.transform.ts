import { TMDB_CONFIG, SITE_CONFIG } from '../config';
import { 
  TMDBMovie, 
  TMDBTv, 
  TMDBMovieResponse, 
  TMDBTvResponse,  
  MovieItem, 
  TvItem, 
  MovieResponse, 
  TvResponse,
  MovieDetails,
  TvDetails,
  TMDBMovieDetails
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

export const transformMovieDetails = (item: TMDBMovieDetails): MovieDetails => {
  return {
    ...transformMovieItem(item),
    genres: item.genres,
    productionCompanies: item.production_companies?.map(company => ({
      id: company.id,
      logoPath: company.logo_path,
      name: company.name,
      originCountry: company.origin_country,  
    })),
    productionCountries: item.production_countries?.map(country => ({
      iso_3166_1: country.iso_3166_1,
      name: country.name,
    })),
    spokenLanguages: item.spoken_languages?.map(language => ({
      englishName: language.english_name,
      iso_639_1: language.iso_639_1,
      name: language.name,
    })),
    tagline: item.tagline,
    revenue: item.revenue,
    runtime: item.runtime,
    status: item.status,
    belongsToCollection: item.belongs_to_collection ? {
      id: item.belongs_to_collection.id,
      name: item.belongs_to_collection.name,
      posterPath: item.belongs_to_collection.poster_path,
      backdropPath: item.belongs_to_collection.backdrop_path,
    } : null,
    budget: item.budget,
    homepage: item.homepage,
    imdbId: item.imdb_id,
    originalTitle: item.original_title,
    images: item.images ? {
      backdrops: item.images.backdrops?.map(backdrop => ({
        aspect_ratio: backdrop.aspect_ratio,
        height: backdrop.height,
        iso_639_1: backdrop.iso_639_1,
        file_path: TMDB_CONFIG.originalImage(backdrop.file_path),
        vote_average: backdrop.vote_average,
        vote_count: backdrop.vote_count,
        width: backdrop.width,
      })),
      logos: item.images.logos?.map(logo => ({
        aspect_ratio: logo.aspect_ratio,
        height: logo.height,
        iso_639_1: logo.iso_639_1,
        file_path: TMDB_CONFIG.originalImage(logo.file_path),
        vote_average: logo.vote_average,
        vote_count: logo.vote_count,
        width: logo.width,
      })),
      posters: item.images.posters?.map(poster => ({
        aspect_ratio: poster.aspect_ratio,
        height: poster.height,
        iso_639_1: poster.iso_639_1,
        file_path: TMDB_CONFIG.originalImage(poster.file_path),
        vote_average: poster.vote_average,
        vote_count: poster.vote_count,
        width: poster.width,
      })),
    } : null,
    alternativeTitles: item.alternative_titles ? {
      titles: item.alternative_titles.titles?.map(title => ({
        iso_3166_1: title.iso_3166_1,
        title: title.title,
      })),
    } : null,
  }
}

export const transformTvDetails = (item: TMDBTv): TvDetails => {
  return transformTvItem(item);
}
