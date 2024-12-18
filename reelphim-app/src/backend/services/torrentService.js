import WebTorrent from 'webtorrent';
import TorrentSearchApi from 'torrent-search-api';
import axios from 'axios';
import cheerio from 'cheerio';
import { initTorrentProviders } from '../config/torrentConfig.js';

// Initialize WebTorrent client
const webTorrentClient = new WebTorrent({
  maxConns: 50, // Maximum simultaneous connections
  destroyStoreOnDestroy: true, // Destroy temporary storage after torrent removal
});

const activeTorrents = new Map();
const activeStreams = new Map();

initTorrentProviders();

export const addTorrent = (infoHash) => {
  const magnet = `magnet:?xt=urn:btih:${infoHash}`;
  const torrent = webTorrentClient.add(magnet);
  activeTorrents.set(infoHash, torrent);
  return torrent;
};

export const getTorrentStatus = (infoHash) => {
  const torrent = activeTorrents.get(infoHash);
  if (!torrent) return { error: 'Torrent not found' };

  return {
    progress: (torrent.progress * 100).toFixed(2) + '%',
    downloadSpeed: (torrent.downloadSpeed / 1024).toFixed(2) + ' KB/s',
    peers: torrent.numPeers,
  };
};

// 📡 Stream a torrent file
export const streamTorrentFile = (torrent, req, res) => {
  if (!torrent) {
    res.status(404).json({ error: 'Torrent not found' });
    return;
  }

  const file = torrent.files.reduce((a, b) => (a.length > b.length ? a : b));
  const streamId = `${torrent.infoHash}-${file.name}`;
  let streamInfo = activeStreams.get(streamId);

  if (!streamInfo) {
    streamInfo = { clients: 0, lastAccessed: Date.now() };
    activeStreams.set(streamId, streamInfo);
  }

  streamInfo.clients++;
  streamInfo.lastAccessed = Date.now();

  const range = req.headers.range;

  if (!range) {
    const head = {
      'Content-Length': file.length,
      'Content-Type': 'video/mp4',
      'Accept-Ranges': 'bytes',
    };
    res.writeHead(200, head);
    const stream = file.createReadStream();
    handleStream(stream, streamInfo, streamId, req, res);
  } else {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : file.length - 1;
    const chunksize = end - start + 1;

    const head = {
      'Content-Range': `bytes ${start}-${end}/${file.length}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(206, head);
    const stream = file.createReadStream({ start, end });
    handleStream(stream, streamInfo, streamId, req, res);
  }
};

// Handle streaming logic for video files
export const handleStream = (stream, streamInfo, streamId, req, res) => {
  stream.on('error', (error) => {
    console.error('Stream error:', error);
    if (!res.headersSent) {
      res.status(500).send('Stream error');
    }
    res.end();
  });

  req.on('close', () => {
    streamInfo.clients = Math.max(0, streamInfo.clients - 1);
    console.log(`Client disconnected from ${streamId}, remaining clients: ${streamInfo.clients}`);

    if (streamInfo.clients <= 0) {
      console.log(`No more clients for ${streamId}, cleaning up...`);
      stream.destroy();
      activeStreams.delete(streamId);
    }
  });

  stream.pipe(res);
};

// Clean up torrents and streams
export const cleanupTorrents = async () => {
  for (const [infoHash, torrent] of activeTorrents.entries()) {
    try {
      const shouldRemove = torrent.done || 
        (Date.now() - torrent.lastAccessed > 5 * 60 * 1000); // 5 minutes

      if (shouldRemove) {
        await new Promise((resolve) => {
          webTorrentClient.remove(torrent, () => {
            activeTorrents.delete(infoHash);
            resolve();
          });
        });
      }
    } catch (error) {
      console.error(`[cleanupTorrents] Error removing torrent: ${infoHash}`, error.message);
    }
  }

  for (const [streamId, streamInfo] of activeStreams.entries()) {
    if (streamInfo.clients <= 0 || Date.now() - streamInfo.lastAccessed > 5 * 60 * 1000) {
      activeStreams.delete(streamId);
    }
  }
};

// Search for torrents using TorrentSearchApi
export const searchTorrents = async (query, category = 'Movies', limit = 20) => {
  console.log(' Query nhận được:', query); // 
  try {
    if (!query || query.trim().length === 0) {
      console.warn(' Truy vấn không hợp lệ:', query);
      return { error: 'Search query is required' };
    }

    const results = await TorrentSearchApi.search(query, category, limit);
    console.log('[TorrentSearchApi] Raw results:', results); // 
    if (!results || results.length === 0) {
      console.warn(' Không có kết quả nào được tìm thấy cho query:', query);
      return [];
    }

    const formattedResults = results.map(torrent => ({
      title: torrent.title,
      size: torrent.size,
      seeds: torrent.seeds || 0,
      peers: torrent.peers || 0,
      magnet: torrent.magnet || '',
      provider: torrent.provider,
    }));
    console.log('🚀 Kết quả được định dạng:', formattedResults);
    return formattedResults;
  } catch (error) {
    console.error('[TorrentSearchApi] Search error:', error);
    return { error: 'Search failed', details: error.message };
  }
};

// Scrape torrents from 1337x
export const torrent1337x = async (query, page = '1') => {
  if (!query || query.trim().length === 0) {
    throw new Error('Search query is required');
  }

  const allTorrent = [];
  const url = `https://1337x.to/search/${encodeURIComponent(query)}/${page}/`;

  try {
    const html = await axios.get(url);
    const $ = cheerio.load(html.data);

    const links = $('td.name a:nth-of-type(2)').map((_, element) => {
      const link = 'https://1337x.to' + $(element).attr('href');
      return link;
    }).get();

    await Promise.all(
      links.map(async (element) => {
        const data = {};
        const labels = ['Category', 'Type', 'Language', 'Size', 'UploadedBy', 'Downloads', 'LastChecked', 'DateUploaded', 'Seeders', 'Leechers'];

        try {
          const html = await axios.get(element);
          const $ = cheerio.load(html.data);

          data.Name = $('.box-info-heading h1').text().trim();
          data.Magnet = $('.clearfix ul li a').attr('href') || '';

          const poster = $('div.torrent-image img').attr('src');
          data.Poster = poster ? (poster.startsWith('http') ? poster : `https:${poster}`) : '';

          $('div .clearfix ul li > span').each((i, element) => {
            const $list = $(element);
            data[labels[i]] = $list.text();
          });

          data.Url = element;
          allTorrent.push(data);
        } catch (error) {
          console.error(`[torrent1337x] Error scraping torrent details from: ${element}`, error.message);
        }
      })
    );

    return allTorrent;
  } catch (error) {
    console.error('[torrent1337x] Error scraping search results:', error.message);
    throw new Error('Scraping search results failed: ' + error.message);
  }
};
