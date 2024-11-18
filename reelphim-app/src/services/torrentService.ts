import { useEffect,useState } from "react";
import WebTorrent from 'webtorrent';

export class TorrentService {
  private client: WebTorrent.Instance;

  constructor() {
    this.client = new WebTorrent();
  }

  async streamTorrent(magnetURI: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.client.add(magnetURI, (torrent) => {
        const file = torrent.files.find(file => 
          file.name.endsWith('.mp4') || 
          file.name.endsWith('.mkv')
        );
        
        if (!file) {
          reject(new Error('No video file found'));
          return;
        }

        // Create stream URL
        const stream = file.createReadStream();
        const chunks: Uint8Array[] = [];
        
        stream.on('data', (chunk: Uint8Array) => {
          chunks.push(chunk);
        });

        stream.on('end', () => {
          const blob = new Blob(chunks);
          const streamURL = URL.createObjectURL(blob);
          resolve(streamURL);
        });
      });
    });
  }
}