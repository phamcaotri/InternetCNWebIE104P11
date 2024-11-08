// depricated, will be removed soon

// import { tmdbConfig } from '../config/tmdb.config';
// import type { Tv, TMDBTv, TvResponse, TMDBTvResponse } from '../types/tv.types';

// export const transformTv = (tv: TMDBTv): Tv => ({
//     id: tv.id,
//     name: tv.name,
//     originalCountry: tv.origin_country,
//     originalName: tv.original_name,
//     overview: tv.overview,
//     posterPath: tv.poster_path ? tmdbConfig.w500Image(tv.poster_path) : null,
//     backdropPath: tv.backdrop_path ? tmdbConfig.originalImage(tv.backdrop_path) : null,
//     firstAirDate: tv.first_air_date,
//     voteAverage: tv.vote_average,
//     voteCount: tv.vote_count,
//     popularity: tv.popularity,  
//     genreIds: tv.genre_ids,
//     adult: tv.adult,
//     originalLanguage: tv.original_language, 
// });

// export const transformTvResponse = (response: TMDBTvResponse): TvResponse => ({
//     page: response.page,
//     results: response.results?.map((tv: TMDBTv) => transformTv(tv)) || [],
//     totalPages: response.total_pages,
//     totalResults: response.total_results,
// });

// export const isValidTv = (tv: Tv): boolean => {
//     return Boolean(
//         tv.name &&
//         tv.overview &&
//         (tv.posterPath || tv.backdropPath) &&
//         tv.firstAirDate
//     );
// };