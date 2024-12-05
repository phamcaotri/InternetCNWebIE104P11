export const PUBLIC_TRACKERS = [
    // 'udp://tracker.opentrackr.org:1337/announce',
    // 'udp://open.stealth.si:80/announce', 
    // 'udp://tracker.openbittorrent.com:6969/announce',
    // 'wss://tracker.btorrent.xyz',
    // 'wss://tracker.files.fm:7073/announce',
    // 'wss://tracker.openwebtorrent.com'
  ];
  
  export const TRACKER_CONFIG = {
    announceList: PUBLIC_TRACKERS,
    maxConnections: 55,
    maxWebConnections: 10,
    uploadRateLimit: 30720, // 30 KB/s
    downloadRateLimit: 1073741824, // 1 GB/s
    verifyFiles: true
  };