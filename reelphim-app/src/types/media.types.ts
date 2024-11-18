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

export interface TMDBMovieDetails extends TMDBMovie {
  genres: {
    id: number;
    name: string;
  }[];
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  tagline: string;
  revenue: number;
  runtime: number;
  status: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
  } | null;
  budget: number;
  homepage: string;
  imdb_id: string;
  original_title: string;
  images: {
    backdrops: {
      aspect_ratio: number;
      height: number;
      iso_639_1: string | null;
      file_path: string;
      vote_average: number;
      vote_count: number;
      width: number;
    }[] | null;
    logos: {
      aspect_ratio: number;
      height: number;
      iso_639_1: string | null;
      file_path: string;
      vote_average: number;
      vote_count: number;
      width: number;
    }[] | null;
    posters: {
      aspect_ratio: number;
      height: number;
      iso_639_1: string | null;
      file_path: string;
      vote_average: number;
      vote_count: number;
      width: number;
    }[] | null;
  };
}
export interface MovieDetails extends MovieItem {
  genres: {
    id: number;
    name: string;
  }[];
  productionCompanies: {
    id: number;
    logoPath: string | null;
    name: string;
    originCountry: string;
  }[];
  productionCountries: {
    iso_3166_1: string;
    name: string;
  }[];
  spokenLanguages: {
    englishName: string;
    iso_639_1: string;
    name: string;
  }[];
  tagline: string;
  revenue: number;
  runtime: number;
  status: string;
  belongsToCollection: {
    id: number;
    name: string;
    posterPath: string | null;
    backdropPath: string | null;
  } | null;
  budget: number;
  homepage: string;
  imdbId: string;
  originalTitle: string;
  images: {
    backdrops: {
      aspect_ratio: number;
      height: number;
      iso_639_1: string | null;
      file_path: string;
      vote_average: number;
      vote_count: number;
      width: number;
    }[] | null;
    logos: {
      aspect_ratio: number;
      height: number;
      iso_639_1: string | null;
      file_path: string;
      vote_average: number;
      vote_count: number;
      width: number;
    }[] | null;
    posters: {
      aspect_ratio: number;
      height: number;
      iso_639_1: string | null;
      file_path: string;
      vote_average: number;
      vote_count: number;
      width: number;
    }[] | null;
  } | null;
}

export interface TvDetails extends TvItem {
  // TODO: Add TvDetail fields here
}
// {
//   "adult": false,
//   "backdrop_path": "/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg",
//   "belongs_to_collection": {
//     "id": 558216,
//     "name": "Venom Collection",
//     "poster_path": "/4bXIKqdZIjR8wKgZaGDaLhLj4yF.jpg",
//     "backdrop_path": "/vq340s8DxA5Q209FT8PHA6CXYOx.jpg"
//   },
//   "budget": 120000000,
//   "genres": [
//     {
//       "id": 878,
//       "name": "Science Fiction"
//     },
//     {
//       "id": 28,
//       "name": "Action"
//     },
//     {
//       "id": 12,
//       "name": "Adventure"
//     }
//   ],
//   "homepage": "https://venom.movie",
//   "id": 912649,
//   "imdb_id": "tt16366836",
//   "origin_country": [
//     "US"
//   ],
//   "original_language": "en",
//   "original_title": "Venom: The Last Dance",
//   "overview": "Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddie's last dance.",
//   "popularity": 3979.853,
//   "poster_path": "/aosm8NMQ3UyoBVpSxyimorCQykC.jpg",
//   "production_companies": [
//     {
//       "id": 5,
//       "logo_path": "/71BqEFAF4V3qjjMPCpLuyJFB9A.png",
//       "name": "Columbia Pictures",
//       "origin_country": "US"
//     },
//     {
//       "id": 84041,
//       "logo_path": "/nw4kyc29QRpNtFbdsBHkRSFavvt.png",
//       "name": "Pascal Pictures",
//       "origin_country": "US"
//     },
//     {
//       "id": 53462,
//       "logo_path": "/nx8B3Phlcse02w86RW4CJqzCnfL.png",
//       "name": "Matt Tolmach Productions",
//       "origin_country": "US"
//     },
//     {
//       "id": 91797,
//       "logo_path": null,
//       "name": "Hutch Parker Entertainment",
//       "origin_country": "US"
//     },
//     {
//       "id": 14439,
//       "logo_path": null,
//       "name": "Arad Productions",
//       "origin_country": "US"
//     }
//   ],
//   "production_countries": [
//     {
//       "iso_3166_1": "US",
//       "name": "United States of America"
//     }
//   ],
//   "release_date": "2024-10-22",
//   "revenue": 394000000,
//   "runtime": 109,
//   "spoken_languages": [
//     {
//       "english_name": "English",
//       "iso_639_1": "en",
//       "name": "English"
//     }
//   ],
//   "status": "Released",
//   "tagline": "'Til death do they part.",
//   "title": "Venom: The Last Dance",
//   "video": false,
//   "vote_average": 6.4,
//   "vote_count": 724
// }