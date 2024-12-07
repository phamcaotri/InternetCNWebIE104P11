import express from 'express';
import auth from '../controllers/authController.js';

const { registerUser, loginUser, logout } = auth;

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/logout', logout)

export default router;