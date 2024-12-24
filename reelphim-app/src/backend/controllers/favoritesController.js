import { insertFavorite, deleteFavorite, fetchFavorites, checkFavorite } from '../models/favour.js';

export const addfavour = async (req, res) => {
  const { userId, movieId, title, poster } = req.body;

  try {
    const { data, error } = await insertFavorite(userId, movieId, title, poster);
    if (error) throw error;

    res.status(200).json({ message: 'Movie added to favorites', data });
  } catch (error) {
    res.status(400).json({ message: 'Failed to add favorite movie', error });
  }
};

export const removefavour = async (req, res) => {
  const { userId, movieId } = req.body;

  try {
    const { data, error } = await deleteFavorite(userId, movieId);
    if (error) throw error;

    res.status(200).json({ message: 'Movie removed from favorites', data });
  } catch (error) {
    res.status(400).json({ message: 'Failed to remove favorite movie', error });
  }
};

export const favourite = async (req, res) => {
    const { userId } = req.query;
    
    if (!userId || isNaN(Number(userId))) {
      console.error('Invalid or missing userId');
      return res.status(400).json({ message: 'Invalid or missing userId' });
    }
  
    try {
      const { data, error } = await fetchFavorites(Number(userId));
      
      if (error) {
        console.error('Error fetching favorites:', error);
        throw error;
      }
  
      console.log('Fetched data:', data);
      res.status(200).json(data);
    } catch (error) {
      console.error('Error in favourite handler:', error);
      res.status(500).json({ message: 'Failed to fetch favorite movies', error });
    }
  };
 
export const checkfavour = async (req, res) => {
  const { userId, tmdbId } = req.query;

  // Kiểm tra đầu vào
  if (!userId || !tmdbId) {
    return res.status(400).json({ isFavorite: false, message: 'Missing userId or tmdbId' });
  }

  try {
    const { data, error } = await checkFavorite(userId, tmdbId)

    if (error) {
      console.error('Error in checkFavoriteController:', error);
      return res.status(500).json({ isFavorite: false, message: 'Failed to check favorite' });
    }

    res.status(200).json({ isFavorite: data });
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ isFavorite: false, message: 'Internal server error' });
  }
};