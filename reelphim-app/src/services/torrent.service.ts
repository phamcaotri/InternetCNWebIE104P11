import { TRACKER_CONFIG } from '../config/tracker.config';
import { TorrentStreamStats } from '../types/torrent';
import WebTorrent from 'webtorrent/dist/webtorrent.min.js';

export class TorrentService {
  private client: any;
  private workingTrackers: string[];

  constructor() {
    const rtcConfig = {
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19305",
            "stun:stun1.l.google.com:19305",
          ],
        },
      ],
    };

    // Cập nhật danh sách tracker hoạt động
    this.workingTrackers = [
      'http://nyaa.tracker.wf:7777/announce',
      'udp://open.stealth.si:80/announce',
      'udp://tracker.opentrackr.org:1337/announce',
      'udp://exodus.desync.com:6969/announce',
      'udp://tracker.torrent.eu.org:451/announce',
      // 'udp://tracker.opentrackr.org:1337/announce',
      // 'udp://open.stealth.si:80/announce',
      // 'udp://tracker.openbittorrent.com:6969/announce',
      // 'wss://tracker.btorrent.xyz',
      // 'wss://tracker.files.fm:7073/announce',
      // 'wss://tracker.openwebtorrent.com'
      // "wss://tracker.btorrent.xyz",
      // "wss://tracker.openwebtorrent.com",
      // "udp://glotorrents.pw:6969/announce",
      // "udp://tracker.opentrackr.org:1337/announce",
      // "udp://torrent.gresille.org:80/announce",
      // "udp://tracker.openbittorrent.com:80",
      // "udp://tracker.coppersurfer.tk:6969",
      // "udp://tracker.leechers-paradise.org:6969",
      // "udp://p4p.arenabg.ch:1337",
      // "udp://p4p.arenabg.com:1337",
      // "udp://tracker.internetwarriors.net:1337",
      // "udp://9.rarbg.to:2710",
      // "udp://9.rarbg.me:2710",
      // "udp://exodus.desync.com:6969",
      // "udp://tracker.cyberia.is:6969",
      // "udp://tracker.torrent.eu.org:451",
      // "udp://tracker.open-internet.nl:6969",
    ];

    const trackerOpts = {
      announce: this.workingTrackers,
      rtcConfig: rtcConfig,
      getAnnounceOpts: () => ({
        numwant: 50,
        uploaded: 0,
        downloaded: 0
      })
    };

    this.client = new WebTorrent({
      tracker: trackerOpts,
      maxConns: TRACKER_CONFIG.maxConnections,
      downloadLimit: TRACKER_CONFIG.downloadRateLimit,
      uploadLimit: TRACKER_CONFIG.uploadRateLimit
    });

    // Xử lý lỗi client
    this.client.on('error', (err: Error) => {
      console.error('[TorrentService] Client Error:', {
        message: err.message,
        stack: err.stack
      });
    });

    // Xử lý lỗi tracker
    this.client.on('warning', (err: Error) => {
      console.warn('[TorrentService] Warning:', {
        message: err.message,
        type: err.name
      });
    });

    this.client.on('torrent', (torrent: any) => {
      console.log('[TorrentService] New torrent added:', torrent.infoHash);
    });

    this.client.on('error', (err: Error) => {
      console.error('[TorrentService] Client Error:', err);
    });
  }

  async streamTorrent(magnetURI: string): Promise<{streamURL: string, stats: TorrentStreamStats}> {
    console.log('[TorrentService] Starting stream for magnet:', magnetURI);
    
    return new Promise((resolve, reject) => {
      const torrentOpts = {
        announce: this.workingTrackers,
        maxWebConns: TRACKER_CONFIG.maxWebConnections
      };

      // Thêm timeout để reject nếu torrent không khởi tạo được
      const timeout = setTimeout(() => {
        reject(new Error('Torrent initialization timeout'));
      }, 30000);

      this.client.add(magnetURI, torrentOpts, (torrent: any) => {
        console.log('[TorrentService] Torrent added:', {
          name: torrent.name,
          files: torrent.files.map((f: any) => ({
            name: f.name,
            size: (f.length / 1024 / 1024).toFixed(2) + ' MB',
            path: f.path
          })),
          pieceLength: (torrent.pieceLength / 1024).toFixed(2) + ' KB',
          announce: torrent.announce,
          numPeers: torrent.numPeers,
          downloadSpeed: (torrent.downloadSpeed / 1024).toFixed(2) + ' KB/s'
        });
        clearTimeout(timeout);
        
        // Log thông tin chi tiết về torrent
        console.log('[TorrentService] Torrent metadata:', {
          infoHash: torrent.infoHash,
          name: torrent.name,
          announce: torrent.announce,
          urlList: torrent.urlList,
          magnetURI: torrent.magnetURI
        });

        // Theo dõi trạng thái torrent
        torrent.on('error', (err: Error) => {
          console.error('[TorrentService] Torrent error:', err);
          reject(err);
        });

        torrent.on('noPeers', (announceType: string) => {
          console.warn('[TorrentService] No peers:', announceType);
        });

        torrent.on('ready', () => {
          console.log('[TorrentService] Torrent ready:', {
            pieces: torrent.pieces.length,
            pieceLength: torrent.pieceLength
          });
        });

        torrent.on('download', () => {
          console.log('[TorrentService] Download progress:', {
            progress: (torrent.progress * 100).toFixed(1) + '%',
            downloadSpeed: (torrent.downloadSpeed / 1024).toFixed(1) + ' KB/s',
            peers: torrent.numPeers,
            uploaded: (torrent.uploaded / 1024).toFixed(1) + ' KB',
            downloaded: (torrent.downloaded / 1024).toFixed(1) + ' KB',
            ratio: torrent.ratio.toFixed(2)
          });
        });

        torrent.on('wire', (wire: any) => {
          console.log('[TorrentService] New peer connected:', {
            address: wire.remoteAddress,
            type: wire.type
          });
        });

        const file = torrent.files.find((file: any) => 
          file.name.endsWith('.mp4') || 
          file.name.endsWith('.mkv')
        );
        
        if (!file) {
          reject(new Error('No video file found'));
          return;
        }

        const stats: TorrentStreamStats = {
          progress: 0,
          downloadSpeed: 0,
          peers: 0,
          status: 'idle'
        };

        const statsInterval = setInterval(() => {
          stats.progress = torrent.progress;
          stats.downloadSpeed = torrent.downloadSpeed;
          stats.peers = torrent.numPeers;
          stats.status = torrent.progress === 1 ? 'done' : 'downloading';
        }, 1000);

        // Tạo video element thay vì sử dụng appendTo
        const video = document.createElement('video');
        video.controls = true;
        video.autoplay = true;
        
        // Tạo object URL từ file stream
        file.createReadStream().on('data', (chunk: any) => {
          console.log('[TorrentService] Received data chunk:', {
            size: chunk.length,
            videoSrc: !!video.src
          });
          if (!video.src) {
            const blob = new Blob([file], { type: 'video/mp4' });
            const url = URL.createObjectURL(blob);
            video.src = url;
            
            // Append video vào player container
            const playerContainer = document.getElementById('player');
            if (playerContainer) {
              playerContainer.innerHTML = '';
              playerContainer.appendChild(video);
              resolve({ streamURL: url, stats });
            }
          }
        }).on('error', (err: Error) => {
          console.error('[TorrentService] Stream error:', err);
          clearInterval(statsInterval);
          reject(err);
        });
      });
    });
  }

  destroy() {
    if (this.client) {
      try {
        this.client.destroy();
      } catch (error) {
        console.error('Error destroying WebTorrent client:', error);
      }
    }
  }
}

export default TorrentService;