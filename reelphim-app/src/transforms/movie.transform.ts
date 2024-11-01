import { tmdbConfig } from '../config/tmdb.config';
import type { Movie } from '../types/movie.types';

export const transformMovie = (movie: Movie): Movie => ({
  id: movie.id,
  title: movie.title,
  originalTitle: movie.originalTitle,
  overview: movie.overview,
  posterPath: movie.posterPath ? `${tmdbConfig.imageBaseUrl}/w500${movie.posterPath}` : null,
  backdropPath: movie.backdropPath ? `${tmdbConfig.imageBaseUrl}/original${movie.backdropPath}` : null,
  releaseDate: movie.releaseDate,
  voteAverage: movie.voteAverage,
  voteCount: movie.voteCount,
  popularity: movie.popularity,
  genres: movie.genres || [],
  adult: movie.adult,
  originalLanguage: movie.originalLanguage,
  video: movie.video,
});

export const isValidMovie = (movie: Movie): boolean => {
  return Boolean(
    movie.title &&
    movie.overview &&
    (movie.posterPath || movie.backdropPath) &&
    movie.releaseDate
  );
};