// routes/favorites.js
import express from 'express';
import { addfavour, removefavour, favourite, checkfavour } from '../controllers/favoritesController.js';

const router = express.Router();

router.post('/add', addfavour); 
router.delete('/remove', removefavour); 
router.get('/check', checkfavour); 
router.get('/getfavour', favourite)
export default router;
