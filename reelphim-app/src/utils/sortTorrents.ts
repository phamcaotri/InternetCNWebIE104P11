import { TorrentResult } from '../types/torrent';

export const sortTorrents = (torrents: TorrentResult[], sortBy: 'seeds' | 'size' | 'peers' = 'seeds') => {
  return [...torrents].sort((a, b) => {
    switch (sortBy) {
      case 'seeds':
        return b.seeds - a.seeds;
      case 'peers':
        return b.peers - a.peers;
      case 'size':
        return parseFloat(b.size) - parseFloat(a.size);
      default:
        return 0;
    }
  });
}; 