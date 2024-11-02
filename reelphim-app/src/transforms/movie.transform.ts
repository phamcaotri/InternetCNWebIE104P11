import { tmdbConfig } from '../config/tmdb.config';
import type { Movie, TMDBMovie, MovieResponse, TMDBMovieResponse } from '../types/movie.types';

export const transformMovie = (movie: TMDBMovie): Movie => ({
  id: movie.id,
  title: movie.title,
  originalTitle: movie.original_title,
  overview: movie.overview,
  posterPath: movie.poster_path ? `${tmdbConfig.imageBaseUrl}/w500${movie.poster_path}` : null,
  backdropPath: movie.backdrop_path ? `${tmdbConfig.imageBaseUrl}/original${movie.backdrop_path}` : null,
  releaseDate: movie.release_date,
  voteAverage: movie.vote_average,
  voteCount: movie.vote_count,
  popularity: movie.popularity,
  genres: movie.genres || [],
  adult: movie.adult,
  originalLanguage: movie.original_language,
  video: movie.video,
});

export const transformMovieResponse = (response: TMDBMovieResponse): MovieResponse => ({
  page: response.page,  
  results: response.results?.map((movie: TMDBMovie) => transformMovie(movie)) || [],
  totalPages: response.total_pages,
  totalResults: response.total_results,
});

export const isValidMovie = (movie: Movie): boolean => {
  return Boolean(
    movie.title &&
    movie.overview &&
    (movie.posterPath || movie.backdropPath) &&
    movie.releaseDate
  );
};