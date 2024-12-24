import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Tách token từ header

  if (!token) {
    return res.status(401).json({ success: false, message: 'Không có token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Gắn thông tin user vào request
    next();
  } catch (err) {
    console.error('Token không hợp lệ:', err.message);
    res.status(403).json({ success: false, message: 'Token không hợp lệ.' });
  }
};

export const getuserid = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    console.error('Không có token.');
    return res.status(401).json({ success: false, message: 'Không có token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Thông tin token đã giải mã:', decoded);
    req.user = decoded; // Lưu thông tin user vào req.user
    next();
  } catch (error) {
    console.error('Token không hợp lệ:', error.message);
    return res.status(401).json({ success: false, message: 'Token không hợp lệ.' });
  }
};


