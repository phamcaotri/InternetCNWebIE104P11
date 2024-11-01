import { Movie, MovieResponse } from '../types/movie.types';

export const movieTransformer = {
    transformMovie(data: any): Movie {
      return {
        id: data.id,
        title: data.title || data.name,
        originalTitle: data.original_title || data.original_name,
        overview: data.overview,
        posterPath: data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : null,
        backdropPath: data.backdrop_path ? `https://image.tmdb.org/t/p/original${data.backdrop_path}` : null,
        releaseDate: data.release_date || data.first_air_date,
        voteAverage: data.vote_average,
        voteCount: data.vote_count,
        popularity: data.popularity,
        genres: data.genres || []
      };
    },
  
    transformMovieResponse(data: any): MovieResponse {
      return {
        page: data.page,
        results: data.results.map((movie: any) => this.transformMovie(movie)),
        totalPages: data.total_pages,
        totalResults: data.total_results
      };
    }
  };