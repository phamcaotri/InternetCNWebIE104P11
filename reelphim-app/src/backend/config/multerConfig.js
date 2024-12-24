import multer from 'multer';

// Cấu hình Multer sử dụng Memory Storage
const storage = multer.memoryStorage();

// Bộ lọc file (chỉ cho phép JPG, PNG)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Chỉ chấp nhận file JPG, JPEG, PNG hoặc webp'));
  }
};

// Giới hạn kích thước file (tối đa 5MB)
const limits = {
  fileSize: 5 * 1024 * 1024, // 5MB
};

export const upload = multer({
  storage,
  fileFilter,
  limits,
});
