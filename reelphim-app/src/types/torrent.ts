export interface TorrentResult {
  title: string;
  size: string;
  seeds: number;
  peers: number;
  magnet: string;
  provider: string;
  uploader?: string;
  torrentUrl?: string;
  time?: string;
  desc?: string;
}