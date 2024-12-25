import supabase from "../config/supabaseClient.js";

export const insertFavorite = async (userId, movieId, title, poster) => {
  const { data, error } = await supabase
    .from('user_favorites')
    .insert([{ user_id: userId, tmdb_id: movieId, add_date: new Date(), title, banner: poster }]);

  if (error) {
    console.error('Error inserting favorite:', error);
    return { data: null, error }; 
  }

  return { data, error: null }; 
};

export const deleteFavorite = async (userId, movieId) => {
  console.log('Deleting favorite with:', { userId, movieId });

  const { data, error } = await supabase
    .from('user_favorites')
    .delete()
    .match({ user_id: userId, tmdb_id: movieId });

  if (error) {
    console.error('Error delete favorite:', error); // Log chi tiết lỗi
    return { data: null, error };
  }

  console.log('Deleted favorite successfully:', data);
  return { data, error: null };
};


export const fetchFavorites = async (userId) => {
  const { data, error } = await supabase
  .from('user_favorites')
  .select('*')
  .eq('user_id', userId);

  if (error) {
    console.error('Error fetch favorite:', error);
    return { data: null, error }; 
  }

  return { data, error: null }; 
};

export const checkFavorite = async (userId, tmdbId) => {
  const { data, error } = await supabase
  .from('user_favorites')
  .select('*')
  .eq('user_id', userId)
  .eq('tmdb_id', tmdbId)
  .single();
  
  if (error) {
    console.error('Error fetch favorite:', error);
    return { data: null, error }; 
  }

  return { data, error: null }; 
};

