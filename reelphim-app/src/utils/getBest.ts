import { TorrentResult } from '../types/torrent';

export const getBestTorrent = (torrents: TorrentResult[]) => {
    if (!torrents || torrents.length === 0) {
      return null;
    }
  
    // Tìm torrent có nhiều seeds nhất
    const bestTorrent = torrents.reduce((best, current) => {
      return current.seeds > best.seeds ? current : best;
    }, torrents[0]);
  
    console.log('Torrent tốt nhất được chọn:', bestTorrent);
    return bestTorrent;
  };