export const QUERY_KEYS = {
    MOVIES: {
      LIST: (type: string) => ['movies', type],
      DETAIL: (id: number) => ['movie', id],
      GENRES: ['movies', 'genres'],
    },
    TV: {
      LIST: (type: string) => ['tv', type],
      DETAIL: (id: number) => ['tv', id],
    },
    SEARCH: (type: string) => ['search', type],
    TRENDING: (mediaType: string, timeWindow: string) => ['trending', mediaType, timeWindow],
    COUNTRIES: ['countries'],
  } as const;