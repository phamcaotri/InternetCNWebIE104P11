import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import bodyParser from 'body-parser';
import torrentRoutes from './routes/torrentRoutes.js'

dotenv.config();

const app = express();

app.use(cors()); // Để frontend gọi API
app.use(express.json()); // Parse JSON từ request body

// Routes
app.use(bodyParser.json());
app.use('/api/auth', authRoutes); 
app.use('/api/torrents', torrentRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

