import { getWatchHistoryByUser, upsertWatchHistory } from '../models/history.js';

// Lấy danh sách lịch sử xem
export const getWatchHistory = async (req, res) => {
  const userId = req.user?.id; // Lấy userId từ middleware getuserid

  if (!userId) {
    return res.status(400).json({ success: false, message: 'Thiếu user_id' });
  }

  try {
    const history = await getWatchHistoryByUser(userId); // Gọi hàm model
    res.json({ success: true, data: history });
  } catch (error) {
    console.error('Lỗi lấy lịch sử xem:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


// Thêm hoặc cập nhật lịch sử xem
export const saveWatchHistory = async (req, res) => {
  const { movie_id, title, banner, magnet, last_watched_time } = req.body;

  if ( !movie_id || !title || !banner || !magnet || last_watched_time === undefined) {
    return res.status(400).json({ success: false, message: 'Dữ liệu không đầy đủ' });
  }

  try {
    const user_id = req.user.id
    await upsertWatchHistory({ user_id, movie_id, title, banner, magnet, last_watched_time }); // Gọi hàm model
    res.json({ success: true, message: 'Lịch sử xem đã được lưu' });
  } catch (error) {
    console.error('Lỗi lưu lịch sử xem:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
