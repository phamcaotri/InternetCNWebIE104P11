import TorrentSearchApi from 'torrent-search-api';

export const initTorrentProviders = () => {
  try {
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

    console.log('[TorrentSearchApi] Providers initialized successfully.');
  } catch (error) {
    console.error('[TorrentSearchApi] Error initializing providers:', error);
  }
};
