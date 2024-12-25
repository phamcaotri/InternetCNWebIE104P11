import express from 'express';
import { getuserid } from '../middlewares/authMiddleware.js';
import { getWatchHistory, saveWatchHistory} from '../controllers/historycontroller.js';

const router = express.Router();

// Lấy danh sách lịch sử xem
router.get('/loadHistory', getuserid, getWatchHistory);

// Lưu hoặc cập nhật lịch sử xem
router.post('/saveHistory', getuserid, saveWatchHistory);

export default router;