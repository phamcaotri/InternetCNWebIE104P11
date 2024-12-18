import express from 'express';
import { streamTorrent, getTorrentStats, cleanupTorrents, searchTorrent, scrapeTorrent } from '../controllers/torrentController.js';

const router = express.Router();

// Các routes liên quan đến stream torrent
router.get('/stream/:infoHash', streamTorrent);
router.get('/stats/:infoHash', getTorrentStats);

// Các routes liên quan đến tìm kiếm torrent
router.get('/search', searchTorrent); 

router.get('/scrape', scrapeTorrent);
router.get('/status', (req, res) => {
  const statuses = getTorrentStatus();
  res.json(statuses);
});

// Cleanup torrents và streams
router.get('/cleanup', cleanupTorrents);

export default router;
