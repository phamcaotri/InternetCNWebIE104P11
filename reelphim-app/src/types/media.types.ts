// TMDB Response Types
export interface TMDBMovieResponse {
    page: number;
    results: TMDBMovie[] | null;
    total_pages: number;
    total_results: number;
  }

export interface TMDBTvResponse {
    page: number;
    results: TMDBTv[] | null;
    total_pages: number;
    total_results: number;
  }       

// TMDB Raw Types
export interface TMDBMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genres: any[];
  adult: boolean;
  original_language: string;
  video: boolean;
  media_type: 'movie';
}

export interface TMDBTv {
  id: number;
  name: string;
  origin_country: string[];
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  media_type: 'tv';
}

export interface MovieResponse {
  page: number;
  results: MovieItem[] | null;
  totalPages: number;
  totalResults: number;
}

export interface TvResponse {
  page: number;
  results: TvItem[] | null;
  totalPages: number;
  totalResults: number;
}

export interface MovieItem {
  id: number;
  title: string;
  overview: string;
  posterPath: string | null;
  backdropPath: string | null;
  releaseDate: string;
  releaseDateFormatted: string;
  voteAverage: number;
  voteCount: number;
  popularity: number;
  adult: boolean;
  originalLanguage: string;
  mediaType: 'movie';
}

export interface TvItem {
  id: number;
  title: string;
  overview: string;
  posterPath: string | null;
  backdropPath: string | null;
  releaseDate: string;
  releaseDateFormatted: string;
  voteAverage: number;
  voteCount: number;
  popularity: number;
  adult: boolean;
  originalLanguage: string;
  mediaType: 'tv';
}

export interface MediaResponse {
  page: number;
  results: MediaItem[] | null;
  totalPages: number;
  totalResults: number;
}

// App Types
export interface MediaItem {
  id: number;
  title: string;
  overview: string;
  posterPath: string | null;
  backdropPath: string | null;
  releaseDate: string;
  releaseDateFormatted: string;
  voteAverage: number;
  voteCount: number;
  popularity: number;
  adult: boolean;
  originalLanguage: string;
  mediaType: 'movie' | 'tv';
}

