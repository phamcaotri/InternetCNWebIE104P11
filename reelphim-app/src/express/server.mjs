import express from 'express';
import WebTorrent from 'webtorrent';
import cors from 'cors';

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
const uniqueTorrents = new Set();

app.get('/stream/:infoHash', async (req, res) => {
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

  // Clean up existing torrents with the same hash
  if (uniqueTorrents.has(infoHash)) {
    console.log(`Cleaning up existing torrent with hash: ${infoHash}`);
    const existingTorrent = client.torrents.find(t => t.infoHash === infoHash);
    if (existingTorrent) {
      await new Promise(resolve => client.remove(existingTorrent, resolve));
    }
    uniqueTorrents.delete(infoHash);
    activeTorrents.delete(infoHash);
  }

  // Add new torrent
  client.add(magnet, (torrent) => {
    uniqueTorrents.add(infoHash);
    activeTorrents.set(infoHash, torrent);
    torrent.lastAccessed = Date.now();
    streamTorrent(torrent, req, res);
    
    // Handle torrent events
    torrent.on('error', (err) => {
      console.error('Torrent error:', err);
      uniqueTorrents.delete(infoHash);
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

  const getContentType = (filename) => {
    const ext = filename.split('.').pop().toLowerCase();
    const mimeTypes = {
      'mp4': 'video/mp4',
      'webm': 'video/webm',
      'mkv': 'video/x-matroska',
      'avi': 'video/x-msvideo',
      'mov': 'video/quicktime',
      'm4v': 'video/x-m4v'
    };
    return mimeTypes[ext] || 'application/octet-stream';
  };

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
    const shouldRemove = torrent.done || 
      (Date.now() - torrent.lastAccessed > 5 * 60 * 1000);
    
    if (shouldRemove) {
      console.log(`Removing torrent: ${infoHash}`);
      client.remove(torrent);
      uniqueTorrents.delete(infoHash);
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
