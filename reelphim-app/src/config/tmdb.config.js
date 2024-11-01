export const tmdbConfig = {
    baseUrl: import.meta.env.VITE_TMDB_BASE_URL,
    apiKey: import.meta.env.VITE_TMDB_API_KEY,
    imageBaseUrl: import.meta.env.VITE_TMDB_IMAGE_BASE_URL,
    originalImage: (path) => `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/original${path}`,
    w500Image: (path) => `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/w500${path}`
  };