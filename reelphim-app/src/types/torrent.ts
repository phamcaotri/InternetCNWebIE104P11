export interface TorrentInfo {
    infoHash: string;           // Mã hash định danh duy nhất của torrent
    magnetURI: string;          // Magnet link đầy đủ
    name: string;               // Tên file/folder
    size: number;               // Kích thước (bytes)
    
    // Thông tin về nguồn
    seeds: number;              // Số lượng seeders
    peers: number;              // Số lượng peers
    
    // Thông tin chất lượng
    quality?: string;           // 1080p, 720p, etc.
    codec?: string;            // x264, x265, etc.
    source?: string;           // WEB-DL, BluRay, etc.
    
    // Metadata
    uploadDate?: Date;         // Ngày upload
    verified: boolean;         // Đã xác minh chưa
    provider?: string;         // Nguồn cung cấp
    
    // Thông tin TMDB (để liên kết với phim)
    tmdbId?: number;
    imdbId?: string;
  }
  
  // Stats cho streaming
  export interface TorrentStreamStats {
    progress: number;          // 0-1
    downloadSpeed: number;     // bytes/sec
    peers: number;            // số peers hiện tại
    status: 'idle' | 'downloading' | 'done' | 'error';
  }