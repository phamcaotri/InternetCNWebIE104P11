export const ROUTES_CONFIG = {
    PUBLIC: {
      WELCOME: '/',
      LOGIN: '/login',
      REGISTER: '/register',
    },
    PRIVATE: {
      HOME: '/home',
      USER: '/user',
      TV_SHOWS: '/tv-shows',
      MOVIES: '/movies',
      SEARCH: '/search',
      MOVIE_DETAIL: '/movie/:id',
      TV_SHOW_DETAIL: '/tv/:id',
      WATCH_MOVIE: '/movie/watch/:id',
      WATCH_TV_SHOW: '/tv/watch/:id',
      CATEGORY: "/category/:categoryId",
      GENRES: "/genres",
    },
    NAVIGATION: {
      DEFAULT_REDIRECT: '/',
    }
  };