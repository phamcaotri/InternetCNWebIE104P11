import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import WebTorrent from 'webtorrent';
import axios from 'axios';
import cheerio from 'cheerio';
import TorrentSearchApi from 'torrent-search-api';

// Import các routes của server hiện tại
import authRoutes from './routes/authRoutes.js';
import historyRoutes from './routes/historyRoutes.js'
import favouriteRoutes from './routes/favouriteRoutes.js'
// Load biến môi trường
dotenv.config();

// ---------- KHỞI TẠO SERVER ---------- //
const app = express();
const PORT = 5000;

// Cấu hình middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Routes của server:
app.use('/api/auth', authRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/favourites', favouriteRoutes)

//Tính năng play video by torrent:
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
                  req.socket.remoteAddress;
  
  console.log(`[${new Date().toISOString()}] Request from IP: ${clientIP}, Path: ${req.path}`);
  next();
});
const client = new WebTorrent({
  destroyStoreOnDestroy: true,
  // maxConns: 55,
  // uploadLimit: 0,
  // downloadLimit: 0,
  // dht: true,
  // dhtPort: 20000,
  // path: './downloads',
  tracker: true,
  trackers: [
    'udp://tracker.opentrackr.org:1337/announce',
    'udp://tracker.openbittorrent.com:6969/announce'
  ],
  // webSeeds: true,
  // strategy: 'sequential',
  // verify: true,
});

class TorrentManager {
  constructor(maxConcurrent = 1) {
    this.maxConcurrent = maxConcurrent;
    this.torrents = new Set(); // Lưu infoHash của các torrent đang có trong client
    this.pauseTimers = new Map(); // Lưu các timer để pause/resume
  }

  async addTorrent(magnet, infoHash) {
    // Kiểm tra torrent đã tồn tại trong client
    if (this.torrents.has(infoHash)) {
      console.log(`[${new Date().toISOString()}] Torrent already exists in client: ${infoHash}`);
      return client.get(infoHash);
    }

    // Nếu đã đạt giới hạn, xóa torrent cũ nhất
    if (this.torrents.size >= this.maxConcurrent) {
      const oldestTorrent = client.torrents
        .sort((a, b) => a.lastAccessed - b.lastAccessed)[0];

      if (oldestTorrent) {
        console.log(`[${new Date().toISOString()}] Removing oldest torrent from client: ${oldestTorrent.name}`);
        this.torrents.delete(oldestTorrent.infoHash);
      }
    }

    // Thêm torrent mới vào client và đợi metadata
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('Torrent add timeout')), 10000); // 10 giây

      try {
        const manager = this;
        client.add(magnet, {
          destroyStoreOnDestroy: true,
        }, torrent => {
          clearTimeout(timeout);
          
          // Đợi metadata load xong
          const onTorrentReady = (torrent) => {
            // Lưu infoHash vào Set để track
            manager.torrents.add(infoHash);
            
            // Thêm lastAccessed vào torrent object
            torrent.lastAccessed = Date.now();

            // Đảm bảo torrent bắt đầu ở trạng thái pause
            torrent.pause();
            torrent.files.forEach(file => file.deselect());
            
            console.log(`[${new Date().toISOString()}] Added new torrent to client in paused state: ${torrent.name}`);
            resolve(torrent);
          };

          if (torrent.metadata) {
            onTorrentReady(torrent);
          } else {
            torrent.once('ready', () => onTorrentReady(torrent));
          }
        });
      } catch (error) {
        clearTimeout(timeout);
        reject(error);
      }
    });
  }

  async removeTorrent(infoHash) {
    if (this.torrents.has(infoHash)) {
      console.log(`[${new Date().toISOString()}] Removing torrent from tracking: ${infoHash}`);
      this.torrents.delete(infoHash);
    }
  }

  updateLastAccessed(infoHash) {
    const torrent = client.get(infoHash);
    if (torrent) {
      torrent.lastAccessed = Date.now();
    }
  }

  cleanup() {
    const now = Date.now();
    for (const infoHash of this.torrents) {
      const torrent = client.get(infoHash);
      if (torrent && now - torrent.lastAccessed > 30 * 60 * 1000) {
        this.removeTorrent(infoHash);
      }
    }
  }

  getStatus() {
    return Array.from(this.torrents).map(infoHash => {
      const torrent = client.get(infoHash);
      return {
        infoHash,
        name: torrent.name,
        downloadSpeed: torrent.downloadSpeed,
        uploadSpeed: torrent.uploadSpeed,
        progress: torrent.progress,
        peers: torrent.numPeers,
        paused: torrent.paused,
        lastAccessed: torrent.lastAccessed
      };
    });
  }

  // Thêm phương thức để xử lý pause có delay
  schedulePause(torrent) {
    // Hủy timer pause cũ nếu có
    if (this.pauseTimers.has(torrent.infoHash)) {
      clearTimeout(this.pauseTimers.get(torrent.infoHash));
    }

    // Tạo timer mới
    const timer = setTimeout(() => {
      if (torrent.activeStreams <= 0) {
        console.log(`[${new Date().toISOString()}] Pausing inactive torrent: ${torrent.name}`);
        
        // Dừng tất cả kết nối
        torrent.pause();
        
        // Deselect tất cả files
        torrent.files.forEach(file => file.deselect());
        
        // Dừng tất cả wire connections
        torrent.wires.forEach(wire => wire.destroy());
        
        // Đảm bảo torrent đã thực sự pause
        if (!torrent.paused) {
          console.log(`[${new Date().toISOString()}] Force pausing torrent: ${torrent.name}`);
          torrent._pause(); // Gọi internal pause method
        }

        console.log(`[${new Date().toISOString()}] Torrent paused status: ${torrent.paused}`);
      }
      this.pauseTimers.delete(torrent.infoHash);
    }, 30000);

    this.pauseTimers.set(torrent.infoHash, timer);
  }

  // Thêm phương thức để xử lý resume có delay
  scheduleResume(torrent) {
    // Hủy timer pause cũ nếu có
    if (this.pauseTimers.has(torrent.infoHash)) {
      clearTimeout(this.pauseTimers.get(torrent.infoHash));
      this.pauseTimers.delete(torrent.infoHash);
    }

    // Resume ngay lập tức nếu đang pause
    if (torrent.paused) {
      console.log(`[${new Date().toISOString()}] Resuming paused torrent: ${torrent.name}`);
      torrent.resume();
      console.log(`[${new Date().toISOString()}] Torrent resumed status: ${!torrent.paused}`);
    }
  }
}

// Khởi tạo manager
const torrentManager = new TorrentManager(1);

// Chạy cleanup định kỳ
setInterval(() => torrentManager.cleanup(), 5 * 60 * 1000);

// Thêm class để quản lý thông tin torrent
class TorrentInfo {
  constructor(torrent, selectedFile = null) {
    this.torrent = torrent;
    this.selectedFile = selectedFile;
    this.lastAccessed = Date.now();
    this.clients = 0;
  }
}
// Thêm endpoint để lấy thông tin tất cả torrent đang hoạt động
app.get('/torrents/status', (req, res) => {
  const status = Array.from(torrentManager.torrents.entries()).map(([infoHash, info]) => ({
    infoHash,
    name: info.torrent.name,
    downloadSpeed: info.torrent.downloadSpeed,
    uploadSpeed: info.torrent.uploadSpeed,
    progress: info.torrent.progress,
    peers: info.torrent.numPeers,
    selectedFile: info.selectedFile?.path,
    clients: info.clients,
    paused: info.torrent.paused,
    lastAccessed: info.lastAccessed
  }));
  
  res.json(status);
});

// Update the /stream/:infoHash endpoint
app.get('/stream/:infoHash', async (req, res) => {
  const infoHash = req.params.infoHash;
  const requestedFilePath = req.query.filePath;
  const magnet = `magnet:?xt=urn:btih:${infoHash}`;

  try {
    const torrent = await torrentManager.addTorrent(magnet, infoHash);
    
    if (!torrent) {
      throw new Error('Failed to get torrent information');
    }

    // Check if torrent is paused before trying to resume
    if (torrent.paused) {
      console.log(`[${new Date().toISOString()}] Resuming torrent: ${torrent.name}`);
      torrent.resume();
    }

    let targetFile;
    if (requestedFilePath && torrent.files) {
      targetFile = torrent.files.find(file => 
        decodeURIComponent(file.path) === decodeURIComponent(requestedFilePath)
      );
      
      if (!targetFile) {
        return res.status(404).json({ error: 'Requested file not found in torrent' });
      }

      // Select only the requested file
      targetFile.select();
      torrent.files.forEach(f => {
        if (f !== targetFile) f.deselect();
      });
    } else {
      // If no specific file requested, select the largest video file
      targetFile = torrent.files.find(file => {
        const ext = file.path.split('.').pop()?.toLowerCase();
        return ['mp4', 'mkv', 'avi', 'mov', 'webm'].includes(ext);
      });
    }

    if (!targetFile) {
      return res.status(404).json({ error: 'No video file found in torrent' });
    }

    // Handle range requests
    const range = req.headers.range;
    const fileSize = targetFile.length;

    // Tăng số lượng stream đang hoạt động
    torrent.activeStreams = (torrent.activeStreams || 0) + 1;
    torrentManager.scheduleResume(torrent);

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = end - start + 1;

      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4'
      });

      const stream = targetFile.createReadStream({ start, end });
      stream.pipe(res);

      stream.on('error', error => {
        console.error('Stream error:', error);
        if (!res.headersSent) {
          res.status(500).json({ error: 'Streaming error occurred' });
        }
      });

      req.on('close', () => {
        stream.destroy();
        torrent.activeStreams--;
        
        // Schedule pause nếu không còn stream nào
        if (torrent.activeStreams <= 0) {
          console.log(`[${new Date().toISOString()}] No active streams, scheduling pause for torrent: ${torrent.name}`);
          torrentManager.schedulePause(torrent);
        }
      });

    } else {
      res.writeHead(200, {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4'
      });

      const stream = targetFile.createReadStream();
      stream.pipe(res);

      stream.on('error', error => {
        console.error('Stream error:', error);
        if (!res.headersSent) {
          res.status(500).json({ error: 'Streaming error occurred' });
        }
      });

      req.on('close', () => {
        stream.destroy();
        torrent.activeStreams--;
        
        // Schedule pause nếu không còn stream nào
        if (torrent.activeStreams <= 0) {
          console.log(`[${new Date().toISOString()}] No active streams, scheduling pause for torrent: ${torrent.name}`);
          torrentManager.schedulePause(torrent);
        }
      });
    }

    // Update last accessed time
    torrentManager.updateLastAccessed(infoHash);

  } catch (error) {
    console.error('Streaming error:', error);
    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'Failed to stream file',
        message: error.message
      });
    }
  }
});

function streamTorrent(torrent, req, res) {
  const file = torrent.files.reduce((a, b) => a.length > b.length ? a : b);
  const streamId = `${torrent.infoHash}-${file.name}`;
  
  console.log('Stream request:', {
    streamId,
    clients: torrentManager.activeStreams.has(streamId) ? torrentManager.activeStreams.get(streamId).clients : 0
  });

  handleDirectStream(streamId, file, req, res);
}

function handleDirectStream(streamId, file, req, res) {
  let streamInfo = torrentManager.activeStreams.get(streamId);
  const range = req.headers.range;

  if (!streamInfo) {
    streamInfo = {
      clients: 0,
      lastAccessed: Date.now(),
      torrentHash: streamId.split('-')[0]
    };
    torrentManager.activeStreams.set(streamId, streamInfo);
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
      torrentManager.activeStreams.delete(streamId);
    }
  });

  stream.pipe(res);
}

// Thêm endpoint để lấy thông tin về các stream đang hoạt động
app.get('/streams/stats', (req, res) => {
  const stats = Array.from(torrentManager.activeStreams.entries()).map(([streamId, info]) => ({
    streamId,
    clients: info.clients,
    lastAccessed: info.lastAccessed
  }));
  
  res.json(stats);
});

// Thêm hàm buildFileTree trước endpoint /files/:infoHash
const buildFileTree = (files) => {
  const structure = {
    name: '',
    type: 'directory',
    size: 0,
    children: {}
  };

  files.forEach(file => {
    const pathParts = file.path.split('\\');
    let current = structure;
    
    // Build directory structure
    for (let i = 0; i < pathParts.length - 1; i++) {
      const part = pathParts[i];
      if (!current.children[part]) {
        current.children[part] = {
          name: part,
          type: 'directory',
          size: 0,
          children: {}
        };
      }
      current = current.children[part];
    }

    // Add file
    const fileName = pathParts[pathParts.length - 1];
    current.children[fileName] = {
      name: fileName,
      type: file.type,
      size: file.length,
      progress: file.progress,
      extension: fileName.split('.').pop(),
      path: file.path
    };

    // Update directory sizes
    let dirCurrent = structure;
    for (const part of pathParts.slice(0, -1)) {
      dirCurrent.size += file.length;
      dirCurrent = dirCurrent.children[part];
    }
    dirCurrent.size += file.length;
  });

  return structure;
};

// Update the /files/:infoHash endpoint
app.get('/files/:infoHash', async (req, res) => {
  const infoHash = req.params.infoHash;
  const magnet = `magnet:?xt=urn:btih:${infoHash}`;

  try {
    const torrent = await torrentManager.addTorrent(magnet, infoHash);
    
    if (!torrent) {
      throw new Error('Failed to get torrent information');
    }

    // Đảm bảo torrent đã load metadata
    if (!torrent.files || torrent.files.length === 0) {
      await new Promise((resolve) => {
        torrent.once('ready', resolve);
      });
    }

    const files = torrent.files.map(file => ({
      path: file.path,
      length: file.length,
      progress: file.progress,
      type: getFileType(file.path)
    }));

    const structure = buildFileTree(files);
    structure.name = torrent.name;

    // Cập nhật last accessed
    torrentManager.updateLastAccessed(infoHash);

    res.json({ structure });

  } catch (error) {
    console.error('Error getting torrent files:', error);
    res.status(500).json({
      error: 'Failed to get torrent files',
      message: error.message
    });
  }
});

const getFileType = (path) => {
  const ext = path.split('.').pop()?.toLowerCase();
  if (['mp4', 'mkv', 'avi', 'mov', 'wmv', 'm4v'].includes(ext)) return 'video';
  if (['mp3', 'wav', 'flac', 'aac', 'm4a'].includes(ext)) return 'audio';
  if (['srt', 'vtt', 'sub', 'ass', 'ssa'].includes(ext)) return 'subtitle';
  if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return 'image';
  return 'other';
};

// Add cleanup for file listing requests
const cleanupTorrents = () => {
  console.log(`[${new Date().toISOString()}] Running torrent cleanup...`);
  torrentManager.cleanup();
}

// Run cleanup every 5 minutes
setInterval(cleanupTorrents, 5 * 60 * 1000);

// Handle process termination
process.on('SIGINT', async () => {
  console.log('Cleaning up torrents before exit...');
  const promises = Array.from(torrentManager.torrents).map(infoHash => 
    torrentManager.removeTorrent(infoHash)
  );
  await Promise.all(promises);
  process.exit();
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Torrent streaming server running on port ${PORT}`);
});


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
