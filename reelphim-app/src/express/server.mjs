import express from 'express';
import WebTorrent from 'webtorrent';
import cors from 'cors';
import TorrentSearchApi from 'torrent-search-api';
import axios from 'axios';
import cheerio from 'cheerio';

const app = express();

const port = 3001;

app.use(cors({
  origin: '*',
  methods: ['GET'],
  allowedHeaders: ['Content-Type', 'Range'],
}));

// Thêm trust proxy setting
app.set('trust proxy', true);

// Cải thiện middleware log để lấy IP chính xác hơn
app.use((req, res, next) => {
  const clientIP = req.headers['x-forwarded-for'] || 
                  req.ip || 
                  req.socket.remoteAddress || 
                  req.connection.remoteAddress;
  
  console.log(`[${new Date().toISOString()}] Request from IP: ${clientIP}, Path: ${req.path}`);
  console.log('Headers:', JSON.stringify(req.headers, null, 2)); // Log headers để debug
  next();
});

const client = new WebTorrent({
  destroyStoreOnDestroy: true,
});
const activeTorrents = new Map();
const activeStreams = new Map();

app.get('/stream/:infoHash', (req, res) => {
  const clientIP = req.headers['x-forwarded-for'] || 
                  req.ip || 
                  req.socket.remoteAddress || 
                  req.connection.remoteAddress;
  const infoHash = req.params.infoHash;
  console.log(`[${new Date().toISOString()}] Streaming request from IP: ${clientIP} for hash: ${infoHash}`);
  
  const magnet = `magnet:?xt=urn:btih:${infoHash}`;
  
  // Check if torrent is already being downloaded
  let torrent = activeTorrents.get(infoHash);
  
  if (torrent) {
    streamTorrent(torrent, req, res);
    return;
  }

  client.add(magnet, (torrent) => {
    activeTorrents.set(infoHash, torrent);
    streamTorrent(torrent, req, res);
    
    // Handle torrent events
    torrent.on('error', (err) => {
      console.error('Torrent error:', err);
      activeTorrents.delete(infoHash);
      if (!res.headersSent) {
        res.status(500).send('Torrent error');
      }
    });

    torrent.on('done', () => {
      console.log('Torrent download finished');
    });
  });
});

function streamTorrent(torrent, req, res) {
  const file = torrent.files.reduce((a, b) => a.length > b.length ? a : b);
  const streamId = `${torrent.infoHash}-${file.name}`;
  
  console.log('Stream request:', {
    streamId,
    clients: activeStreams.has(streamId) ? activeStreams.get(streamId).clients : 0
  });

  handleDirectStream(streamId, file, req, res);
}

function handleDirectStream(streamId, file, req, res) {
  let streamInfo = activeStreams.get(streamId);
  const range = req.headers.range;

  if (!streamInfo) {
    streamInfo = {
      clients: 0,
      lastAccessed: Date.now()
    };
    activeStreams.set(streamId, streamInfo);
  }

  streamInfo.clients++;
  streamInfo.lastAccessed = Date.now();

  if (!range) {
    const head = {
      'Content-Length': file.length,
      'Content-Type': 'video/mp4',
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*'
    };
    res.writeHead(200, head);
    const stream = file.createReadStream();
    handleStream(stream, streamInfo, streamId, req, res);
  } else {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : file.length - 1;
    const chunksize = (end - start) + 1;
    
    const head = {
      'Content-Range': `bytes ${start}-${end}/${file.length}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*'
    };
    
    res.writeHead(206, head);
    const stream = file.createReadStream({ start, end });
    handleStream(stream, streamInfo, streamId, req, res);
  }
}

function handleStream(stream, streamInfo, streamId, req, res) {
  stream.on('error', (error) => {
    console.error('Stream error:', error);
    if (!res.headersSent) {
      res.status(500).send('Stream error');
    }
  });

  req.on('close', () => {
    streamInfo.clients--;
    console.log(`Client disconnected from ${streamId}, remaining clients: ${streamInfo.clients}`);
    
    if (streamInfo.clients <= 0) {
      console.log(`No more clients for ${streamId}, cleaning up...`);
      stream.destroy();
      activeStreams.delete(streamId);
    }
  });

  stream.pipe(res);
}

// Cleanup function để xóa các stream không còn được sử dụng
function cleanupStreams() {
  const now = Date.now();
  for (const [streamId, streamInfo] of activeStreams.entries()) {
    if (streamInfo.clients <= 0 || now - streamInfo.lastAccessed > 5 * 60 * 1000) {
      console.log(`Cleaning up inactive stream: ${streamId}`);
      activeStreams.delete(streamId);
    }
  }
}

// Chạy cleanup mỗi phút
setInterval(cleanupStreams, 60 * 1000);

// Thêm endpoint để lấy thông tin về các stream đang hoạt động
app.get('/streams/stats', (req, res) => {
  const stats = Array.from(activeStreams.entries()).map(([streamId, info]) => ({
    streamId,
    clients: info.clients,
    lastAccessed: info.lastAccessed
  }));
  
  res.json(stats);
});

app.get('/stats/:infoHash', (req, res) => {
  const clientIP = req.headers['x-forwarded-for'] || 
                  req.ip || 
                  req.socket.remoteAddress || 
                  req.connection.remoteAddress;
  console.log(`[${new Date().toISOString()}] Stats request from IP: ${clientIP} for hash: ${req.params.infoHash}`);
  
  const torrent = activeTorrents.get(req.params.infoHash);
  
  if (!torrent) {
    return res.json({ error: 'No active torrent' });
  }
  
  // Update last accessed time
  torrent.lastAccessed = Date.now();
  
  res.json({
    progress: torrent.progress,
    downloadSpeed: torrent.downloadSpeed,
    peers: torrent.numPeers
  });
});

// Cleanup function to remove inactive torrents
function cleanupTorrents() {

  for (const [infoHash, torrent] of activeTorrents.entries()) {
    // Remove torrent if it's done or hasn't been accessed in 5 minutes
    const shouldRemove = torrent.done || 
      (Date.now() - torrent.lastAccessed > 5 * 60 * 1000);
    
    if (shouldRemove) {
      console.log(`Removing torrent: ${infoHash}`);
      client.remove(torrent);
      activeTorrents.delete(infoHash);
    }
  }
}

// Run cleanup more frequently
setInterval(cleanupTorrents, 60 * 1000); // Every minute

// Handle process termination
process.on('SIGINT', () => {
  console.log('Cleaning up torrents before exit...');
  for (const torrent of activeTorrents.values()) {
    client.remove(torrent);
  }
  process.exit();
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Torrent streaming server running on port ${port}`);
});

// Khởi tạo TorrentSearchApi
TorrentSearchApi.enableProvider('1337x');
TorrentSearchApi.enableProvider('eztv');
TorrentSearchApi.enableProvider('kickasstorrents');
TorrentSearchApi.enableProvider('limetorrents');
TorrentSearchApi.enableProvider('rarbg');
TorrentSearchApi.enableProvider('thepiratebay');
TorrentSearchApi.enableProvider('torrent9');
TorrentSearchApi.enableProvider('torrentproject');
TorrentSearchApi.enableProvider('torrentz2');
TorrentSearchApi.enableProvider('yts');
// Thêm các provider khác nếu cần

app.get('/search', async (req, res) => {
  try {
    const { query, category = 'Movies', limit = 20 } = req.query;
    
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const torrents = await TorrentSearchApi.search(query, category, limit);
    const formattedResults = torrents.map(torrent => ({
      title: torrent.title,
      size: torrent.size,
      seeds: torrent.seeds || 0,
      peers: torrent.peers || 0,
      magnet: torrent.magnet || '',
      provider: torrent.provider
    }));
    console.log(formattedResults);
    res.json(formattedResults);
    
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});

async function torrent1337x(query, page = '1') {
  const allTorrent = [];
  const url = `https://1337x.to/search/${query}/${page}/`;
  
  try {
    const html = await axios.get(url);
    const $ = cheerio.load(html.data);

    const links = $('td.name').map((_, element) => {
      const link = 'https://1337x.to' + $(element).find('a').next().attr('href');
      return link;
    }).get();

    await Promise.all(links.map(async (element) => {
      const data = {};
      const labels = [
        'Category', 'Type', 'Language', 'Size', 'UploadedBy',
        'Downloads', 'LastChecked', 'DateUploaded', 'Seeders', 'Leechers'
      ];

      try {
        const html = await axios.get(element);
        const $ = cheerio.load(html.data);
        
        data.Name = $('.box-info-heading h1').text().trim();
        data.Magnet = $('.clearfix ul li a').attr('href') || "";
        
        const poster = $('div.torrent-image img').attr('src');
        if (poster) {
          data.Poster = poster.startsWith('http') ? poster : `https:${poster}`;
        } else {
          data.Poster = '';
        }

        $('div .clearfix ul li > span').each((i, element) => {
          const $list = $(element);
          data[labels[i]] = $list.text();
        });
        
        data.Url = element;
        allTorrent.push(data);
      } catch (error) {
        console.error(`Error scraping torrent details: ${element}`, error);
      }
    }));

    return allTorrent;
  } catch (error) {
    console.error('Error scraping search results:', error);
    return null;
  }
}

// Add this to your existing Express server
app.get('/api/torrents/search', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }
    console.log("Search query:", query);
    const results = await torrent1337x(query);
    res.json(results || []);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});

