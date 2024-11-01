export interface MovieResponse {
    page: number | null;
    results: Movie[] | null;
    totalPages: number | null;
    totalResults: number | null;
}

export interface Movie {
    id: number | null;
    title: string | null;
    originalTitle: string | null;
    overview: string | null;
    posterPath: string | null;
    backdropPath: string | null;
    releaseDate: string | null;
    voteAverage: number | null;
    voteCount: number | null;
    popularity: number | null;
    genres: number[] | null;
    adult: boolean | null;
    originalLanguage: string | null;
    video: boolean | null;
}