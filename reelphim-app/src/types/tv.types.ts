// depricated, will be removed soon

// // Example response from TMDB TV search API:
// // {
// //     "page": 1,
// //     "results": [
// //       {
// //         "adult": false,
// //         "backdrop_path": "/jO803koX4pYjGuxjOkLytCusuJm.jpg",
// //         "genre_ids": [
// //           10767,
// //           35,
// //           10763
// //         ],
// //         "id": 32415,
// //         "origin_country": [
// //           "US"
// //         ],
// //         "original_language": "en",
// //         "original_name": "Conan",
// //         "overview": "A late night television talk show hosted by  Conan O'Brien.",
// //         "popularity": 150.852,
// //         "poster_path": "/oQxrvUhP3ycwnlxIrIMQ9Z3kleq.jpg",
// //         "first_air_date": "2010-11-08",
// //         "name": "Conan",
// //         "vote_average": 7,
// //         "vote_count": 219
// //       }
// //     ]
// //     "total_pages": 1,
// //     "total_results": 1
// // }

// export interface TMDBTvResponse {
//     page: number;
//     results: TMDBTv[] | null;
//     total_pages: number;
//     total_results: number;
// }

// export interface TMDBTv {
//     id: number;
//     name: string;
//     origin_country: string[];
//     original_name: string;
//     overview: string;
//     poster_path: string | null;
//     backdrop_path: string | null;
//     first_air_date: string;
//     vote_average: number;
//     vote_count: number;
//     popularity: number;
//     genre_ids: number[];
//     adult: boolean;
//     original_language: string;
// }

// export interface TvResponse {
//     page: number;
//     results: Tv[] | null;
//     totalPages: number;
//     totalResults: number;
// }

// export interface Tv {
//     id: number;
//     name: string;
//     originalCountry: string[];
//     originalName: string;
//     overview: string;
//     posterPath: string | null;
//     backdropPath: string | null;
//     firstAirDate: string;
//     voteAverage: number;
//     voteCount: number;
//     popularity: number;
//     genreIds: number[];
//     adult: boolean;
//     originalLanguage: string;
// }
