// import axios from 'axios';
// import { TRACKER_CONFIG } from '../config/tracker.config';

// interface TorrentInfo {
//   infoHash: string;
//   magnetURI: string;
//   name: string;
//   size: number;
//   seeds: number;
//   peers: number;
// }

// export class TrackerSearchService {
//   private readonly searchEndpoints = [
//     'https://api.opentrackr.org/search',
//     'https://api.open.tracker.cl/search'
//   ];

//   async searchByTMDBId(tmdbId: number): Promise<TorrentInfo[]> {
//     try {
//       // Tìm kiếm trên tất cả các tracker
//       const searchPromises = this.searchEndpoints.map(endpoint => 
//         axios.get(`${endpoint}`, {
//           params: {
//             tmdb: tmdbId,
//             verified: true
//           }
//         })
//       );

//       const results = await Promise.allSettled(searchPromises);
//       const torrents: TorrentInfo[] = [];

//       results.forEach(result => {
//         if (result.status === 'fulfilled' && result.value.data) {
//           const items = result.value.data.map(item => ({
//             ...item,
//             magnetURI: this.generateMagnetURI(item.infoHash, item.name)
//           }));
//           torrents.push(...items);
//         }
//       });

//       // Lọc và sắp xếp kết quả
//       return torrents
//         .filter(torrent => this.isValidTorrent(torrent))
//         .sort((a, b) => b.seeds - a.seeds);

//     } catch (error) {
//       console.error('Tracker search error:', error);
//       return [];
//     }
//   }

//   private isValidTorrent(torrent: TorrentInfo): boolean {
//     return (
//       !!torrent.magnetURI &&
//       torrent.seeds > 0 &&
//       torrent.size > 0
//     );
//   }

//   generateMagnetURI(infoHash: string, name: string): string {
//     const trackers = TRACKER_CONFIG.announceList
//       .map(tracker => `&tr=${encodeURIComponent(tracker)}`)
//       .join('');

//     return `magnet:?xt=urn:btih:${infoHash}&dn=${encodeURIComponent(name)}${trackers}`;
//   }
// }