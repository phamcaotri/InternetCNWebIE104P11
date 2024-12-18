import { 
  addTorrent, 
  streamTorrentFile as streamTorrentFromService, 
  getTorrentStatus, 
  cleanupTorrents as cleanupService, 
  searchTorrents as searchTorrentsService, 
  torrent1337x as scrapeTorrent1337x 
} from '../services/torrentService.js';

export const streamTorrent = (req, res) => {
  const { infoHash } = req.params;
  const torrent = addTorrent(infoHash);
  streamTorrentFromService(torrent, req, res);
};

export const getTorrentStats = (req, res) => {
  const { infoHash } = req.params;
  const status = getTorrentStatus(infoHash);
  res.json(status);
};

export const cleanupTorrents = (req, res) => {
  cleanupService();
  res.send('Torrents and streams cleaned up');
};

export const searchTorrent = async (req, res) => {
  try {
    const { query } = req.query;
    console.log('Received query:', query); // 
    const torrents = await searchTorrentsService(query);
    console.log('Search result:', torrents); //
    if (!torrents || torrents.length === 0) {
      console.warn('No torrents found for query:', query);
      res.status(404).json({ error: 'No torrents found' });
    } else {
      res.json(torrents);
    }
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
};


export const scrapeTorrent = async (req, res) => {
  try {
    const { query } = req.query;
    const results = await scrapeTorrent1337x(query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Scrape failed' });
  }
};