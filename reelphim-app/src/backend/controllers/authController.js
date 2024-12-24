import bcrypt from 'bcryptjs/dist/bcrypt.js';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import sanitizeHtml from 'sanitize-html';

export const auth = { };

auth.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const cleanName = sanitizeHtml(name);
    const cleanEmail = sanitizeHtml(email);

    console.log("Cleaned name: ", cleanName);
    console.log("Cleaned email: ", cleanEmail);

    try {
        //if user exists
        const existingUser = await User.findByEmail({ email: cleanEmail });
        if (existingUser) {
            return res.status(409).json({message: 'Người dùng đã tồn tại!'});
        }

        const encryptedPass = await bcrypt.hash(password, 10);

        await User.addUser({name: cleanName, email: cleanEmail, password: encryptedPass});

        res.status(201).json({message: 'Bạn đã đăng kí thành công. Vui lòng quay về trang đăng nhập để tếp tục sử dụng dịch vụ!'})
    } catch (err) {
        res.status(500).json({message: 'Server hiện tại đang bận, xin vui lòng thử lại sau.', error: err.message});
    }
};

auth.loginUser = async (req, res) => {
    const {email, password} = req.body;

    const cleanEmail = sanitizeHtml(email);

    try {
        const user = await User.findByEmail({ email: cleanEmail });
        //if user doesnt exist
        if (!user) {
            return res.status(400).json({message: 'Tên người dùng không tồn tại. Xin hãy thử lại'});
        }

        const checkPassword = await bcrypt.compare(password, user.password)
        //if password invalid
        if(!checkPassword) {
            return res.status(400).json({message: 'Mật khẩu bạn nhập không đúng. Xin hãy thử lại.'});
        }

        const token = jwt.sign({ id: user.id_user, cleanEmail: user.email}, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.status(200).json({token, message: "Chào mừng bạn đến với Reelphim!"})
    } catch (err) {
        res.status(500).json({message: 'Server hiện tại đang bận, xin vui lòng thử lại sau.', error: err.message});
    }
};

auth.logout = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(400).json({ success: false, message: 'Token không hợp lệ' });
  }

  console.log(`User logged out with token: ${token}`);
  return res.status(200).json({ success: true, message: 'Đăng xuất thành công' });
};

auth.getuserid = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Lấy token từ header
  console.log('Authorization Header:', req.headers.authorization);

  if (!token) {
    return res.status(401).json({ success: false, message: 'Không có token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Xác minh token
    req.user = decoded; // Lưu thông tin user vào req.user
    console.log('Decoded Token:', decoded);

    next();
  } catch (error) {
    console.error('Token không hợp lệ:', error.message);
    res.status(401).json({ success: false, message: 'Token không hợp lệ.' });
  }
};

auth.updateProfilePhoto = async (req, res) => {
  const profilePhoto = req.file; // File từ Multer
  const { userId } = req.body; // userId từ frontend

  if (!userId || !profilePhoto) {
    return res.status(400).json({ message: 'User ID và file ảnh là bắt buộc.' });
  }

  try {
    // Gọi model để upload file lên Supabase
    const { publicUrl, error } = await User.uploadAvatarToSupabase(userId, profilePhoto);

    if (error) {
      throw new Error('Lỗi khi upload file lên Supabase Storage.');
    }

    // Cập nhật URL vào database qua model
    const { data, error: dbError } = await User.updateUserProfilePhoto(userId, publicUrl);

    if (dbError) {
      throw new Error('Lỗi khi lưu URL ảnh vào cơ sở dữ liệu.');
    }

    res.status(200).json({
      message: 'Cập nhật ảnh đại diện thành công.',
      publicURL: publicUrl,
    });
  } catch (error) {
    console.error('Error updating profile photo:', error.message);
    res.status(500).json({ message: 'Cập nhật ảnh đại diện thất bại.', error: error.message });
  }
};

auth.getUserAva = async (req, res) => {
  const userId = req.user.id; // Lấy từ middleware

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required.' });
  }

  try {
    const { user, error } = await User.getAva(userId);
    if (error) {
      throw error;
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user info:', error.message);
    res.status(500).json({ message: 'Failed to fetch user info.' });
  }
};

auth.updateUserProfile = async (req, res) => {
  const userId = req.user.id; // Lấy userId từ middleware
  const { name, email, phone, password } = req.body; // Dữ liệu cần cập nhật

  if (!userId) {
    return res.status(400).json({ success: false, message: 'User ID is required.' });
  }

  try {
    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (phone) updates.phone_number = phone;
    if (password) {
      // Hash mật khẩu trước khi lưu
      const saltRounds = 10; // Bạn có thể tăng lên để bảo mật hơn
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      updates.password = hashedPassword;
    }
    const { data, error } = await User.updateProfile(userId, updates);

    if (error) {
      throw new Error(error.message || 'Error updating user profile.');
    }

    res.status(200).json({ success: true, message: 'Profile updated successfully.', data });
  } catch (error) {
    console.error('Error updating user profile:', error.message);
    res.status(500).json({ success: false, message: 'Failed to update profile.', error: error.message });
  }
};
