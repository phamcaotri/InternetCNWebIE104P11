export interface Movie {
    id: number;
    title: string | null;
    originalTitle: string | null;
    overview: string | null;
    posterPath: string | null;
    backdropPath: string | null;
    releaseDate: string | null;
    voteAverage: number;
    voteCount: number;
    popularity: number;
    genres: Genre[];
  }
  
  export interface Genre {
    id: number;
    name: string;
  }
  
  export interface MovieResponse {
    page: number;
    results: Movie[];
    totalPages: number;
    totalResults: number;
  }