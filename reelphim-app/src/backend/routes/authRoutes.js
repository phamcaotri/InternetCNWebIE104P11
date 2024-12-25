import express from 'express';
import { auth } from '../controllers/authController.js';
import { upload } from '../config/multerConfig.js';
import { getuserid, verifyToken } from '../middlewares/authMiddleware.js';


const { registerUser, loginUser, logout, updateProfilePhoto, getUserAva, updateUserProfile} = auth;

const router = express.Router();

router.post('/updateUserProfile', verifyToken, updateUserProfile);

router.post('/updateProfilePhoto', upload.single('avatar'), updateProfilePhoto);

router.get('/getUserAva', verifyToken, getUserAva)

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/logout', logout);

router.get('/getuserId', getuserid, (req, res) => {
    res.status(200).json({ success: true, userId: req.user.id });
  });
export default router;