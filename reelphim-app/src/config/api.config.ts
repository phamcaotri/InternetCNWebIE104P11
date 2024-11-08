export const API_CONFIG = {
  TMDB: {
    BASE_URL: import.meta.env.VITE_TMDB_BASE_URL,
    API_KEY: import.meta.env.VITE_TMDB_API_KEY,
    IMAGE_BASE_URL: import.meta.env.VITE_TMDB_IMAGE_BASE_URL,
    IMAGE_SIZES: {
      POSTER: {
        SMALL: 'w185',
        MEDIUM: 'w342',
        LARGE: 'w500',
      },
      BACKDROP: {
        SMALL: 'w300',
        MEDIUM: 'w780',
        LARGE: 'w1280',
      },
      ORIGINAL: 'original',
    },
    LANGUAGE: 'vi-VN',
    REGION: 'VN',
    INCLUDE_ADULT: false,
  },
  CACHE: {
    TTL: 5 * 60 * 1000, // 5 minutes
    STALE_TIME: 60 * 1000, // 1 minute 
  },
  ENDPOINTS: {
    SEARCH: '/search/multi',
    MOVIE: {
      POPULAR: '/movie/popular',
      TOP_RATED: '/movie/top_rated',
      UPCOMING: '/movie/upcoming',
      NOW_PLAYING: '/movie/now_playing',
    },
    TV: {
      POPULAR: '/tv/popular',
      TOP_RATED: '/tv/top_rated',
      ON_THE_AIR: '/tv/on_the_air',
    },
    PERSON: '/person',
  }
};
