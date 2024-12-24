import supabase from '../config/supabaseClient.js';

// Lấy lịch sử xem từ Supabase
export const getWatchHistoryByUser = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('watching_history')
      .select('movie_id, title, banner, magnet, last_watched_time')
      .eq('user_id', userId);

    if (error) throw new Error(`Lỗi khi lấy lịch sử xem: ${error.message}`);
    return data; // Trả về danh sách lịch sử
  } catch (err) {
    console.error('Lỗi trong getWatchHistoryByUser:', err.message);
    throw err;
  }
};

// Thêm mới hoặc cập nhật lịch sử xem
export const upsertWatchHistory = async ({
  user_id,
  movie_id,
  title,
  banner,
  magnet,
  last_watched_time,
}) => {
  try {
    const { data, error } = await supabase
      .from('watching_history')
      .upsert(
        {
          user_id,
          movie_id,
          title,
          banner,
          magnet,
          last_watched_time,
          add_time: new Date().toISOString(), 
        },
        { onConflict: ['user_id', 'movie_id'] }
      );

    if (error) throw new Error(`Lỗi khi lưu lịch sử xem: ${error.message}`);
    return data;
  } catch (err) {
    console.error('Lỗi trong upsertWatchHistory:', err.message);
    throw err;
  }
};
