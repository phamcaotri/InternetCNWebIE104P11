import { TorrentResult } from "../types/torrent";

const currentHost = window.location.hostname;
const SERVER_PORT = '5000';
const SERVER_URL = `http://${currentHost}:${SERVER_PORT}`;

export const searchTorrents = async (query: string, provider = '1337x'): Promise<TorrentResult[]> => {
  try {
    const response = await fetch(`${SERVER_URL}/api/torrents/search?query=${encodeURIComponent(query)}`);
    const allTorrents = await response.json();
    
    if (!Array.isArray(allTorrents)) return [];

    // Map the scraped data to our TorrentResult format
    return allTorrents.map(item => ({
      title: item.Name,
      size: item.Size,
      seeds: parseInt(item.Seeders.replace(',', ''), 10),
      peers: parseInt(item.Leechers.replace(',', ''), 10),
      magnet: item.Magnet,
      provider: provider,
      uploader: item.UploadedBy,
      torrentUrl: item.Url,
      time: new Date().toISOString(),
      desc: item.Url,
      poster: item.Poster
    }));

  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
}; 