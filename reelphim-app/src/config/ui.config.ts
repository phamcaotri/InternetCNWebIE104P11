export const UI_CONFIG = {
    SCROLL: {
      PERCENTAGE: 0.4,
      BEHAVIOR: 'smooth' as ScrollBehavior,
      HIDE_THRESHOLD: 100,
      HEADER_HIDE_OFFSET: 100,
    },
    QUERY: {
      STALE_TIME: 5 * 60 * 1000, // 5 minutes
      RETRY_COUNT: 1,
      REFETCH_ON_WINDOW_FOCUS: false,
      CACHE_TIME: 30 * 60 * 1000, // 30 minutes
    },
    DRAG: {
      SCROLL_SPEED: 1,
      THRESHOLD: 50,
    },
    CARD: {
      WIDTH: 190,
      ASPECT_RATIO: 1.5,
      ANIMATION_DURATION: 300,
    },
    LOADING: {
      DELAY: 500,
      TIMEOUT: 10000,
      SPINNER_SIZE: 40,
    },
    ANIMATION: {
      DURATION: 300,
      TIMING: 'ease-in-out',
      HOVER_SCALE: 1.05,
    },
    DEBOUNCE: {
      SEARCH: 500,
      SCROLL: 100,
      RESIZE: 250,
    },
    IMAGE: {
      FALLBACK: '/placeholder-poster.jpg',
      LOADING_PLACEHOLDER: true,
      BLUR_DATA: 'data:image/jpeg;base64,/9j/4AAQSkZJRg...',
    },
    GRID: {
      GAP: 16,
      COLUMNS: {
        SM: 2,
        MD: 3,
        LG: 4,
        XL: 5,
      },
    }
  };