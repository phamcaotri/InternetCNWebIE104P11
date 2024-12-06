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
  } | null;
  alternative_titles: {
    titles: {
      iso_3166_1: string;
      title: string;
    }[] | null;
  } | null;
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
  alternativeTitles: {
    titles: {
      iso_3166_1: string;
      title: string;
    }[] | null;
  } | null;
}
export interface TMDBTvDetails extends TMDBTv {
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    original_name: string;
    gender: number;
    profile_path: string | null;
  }[];
  episode_run_time: number[];
  first_air_date: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string | null;
  } | null;
  next_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string | null;
  } | null;
  networks: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  number_of_episodes: number;
  number_of_seasons: number;
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
    vote_average: number;
  }[];
  type: string;
  tagline: string;
  status: string;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
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
  origin_country: string[];
  original_language: string;
  homepage: string;
  genres: {
    id: number;
    name: string;
  }[];
  backdrop_path: string | null;
  adult: boolean;
  vote_average: number;
  vote_count: number;
  popularity: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
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
  alternative_titles: {
    titles: {
      iso_3166_1: string;
      title: string;
    }[] | null;
  } | null;
}

export interface TvDetails extends TvItem {
  adult: boolean;
  backdropPath: string | null;
  createdBy: {
    id: number;
    creditId: string;
    name: string;
    originalName: string;
    gender: number;
    profilePath: string | null;
  }[];
  episodeRunTime: number[];
  firstAirDate: string;
  inProduction: boolean;
  languages: string[];
  lastAirDate: string;
  lastEpisodeToAir: {
    id: number;
    name: string;
    overview: string;
    voteAverage: number;
    voteCount: number;
    airDate: string;
    episodeNumber: number;
    episodeType: string;
    productionCode: string;
    runtime: number;
    seasonNumber: number;
    showId: number;
    stillPath: string | null;
  } | null;
  nextEpisodeToAir: {
    id: number;
    name: string;
    overview: string;
    voteAverage: number;
    voteCount: number;
    airDate: string;
    episodeNumber: number;
    episodeType: string;
    productionCode: string;
    runtime: number;
    seasonNumber: number;
    showId: number;
    stillPath: string | null;
  } | null;
  networks: {
    id: number;
    logoPath: string | null;
    name: string;
    originCountry: string;
  }[];
  numberOfEpisodes: number;
  numberOfSeasons: number;
  originCountry: string[];
  originalLanguage: string;
  originalName: string;
  overview: string;
  popularity: number;
  posterPath: string | null;
  productionCompanies: {
    id: number;
    logoPath: string | null;
    name: string;
    originCountry: string;
  }[];
  productionCountries: {
    iso31661: string;
    name: string;
  }[];
  seasons: {
    airDate: string;
    episodeCount: number;
    id: number;
    name: string;
    overview: string;
    posterPath: string | null;
    seasonNumber: number;
    voteAverage: number;
  }[];
  spokenLanguages: {
    englishName: string;
    iso6391: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  type: string;
  voteAverage: number;
  voteCount: number;
  name: string;
  homepage: string;
  genres: {
    id: number;
    name: string;
  }[];
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
  alternativeTitles: {
    titles: {
      iso_3166_1: string;
      title: string;
    }[] | null;
  } | null;
}