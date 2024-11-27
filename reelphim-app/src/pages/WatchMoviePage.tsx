import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { tmdbapi } from '../services/tmdbApi';
import TorrentService from '../services/torrent.service';
import { TrackerSearchService } from '../services/trackerSearch.service';
import { TorrentInfo } from '../types/torrent';

const WatchMoviePage = () => {
  const { id } = useParams();
  const [torrents, setTorrents] = useState<TorrentInfo[]>([]);
  const [streamURL, setStreamURL] = useState('');
  const [streamStats, setStreamStats] = useState({
    progress: 0,
    downloadSpeed: 0,
    peers: 0
  });
  const { data: movie, isLoading, error } = tmdbapi.GetMovieDetails(Number(id));
  
  const torrentServiceRef = useRef<TorrentService | null>(null);

  const destroyTorrentService = () => {
    if (torrentServiceRef.current) {
      try {
        torrentServiceRef.current.destroy();
      } catch (error) {
        console.error('Error destroying torrent service:', error);
      }
      torrentServiceRef.current = null;
    }
  };

  useEffect(() => {
    const testTorrent: TorrentInfo = {
      infoHash: 'a1b27ec0197693caba6bd12e535fe11e042ba2ba',
      magnetURI: 'magnet:?xt=urn:btih:a1b27ec0197693caba6bd12e535fe11e042ba2ba&dn=%5bJudas%5d%20I%20Want%20to%20Eat%20Your%20Pancreas%20(Kimi%20no%20Suizou%20wo%20Tabetai)%20%5bBD%201080p%5d%5bHEVC%20x265%2010bit%5d%5bDual-Audio%5d%5bEng-Subs%5d&tr=http%3a%2f%2fnyaa.tracker.wf%3a7777%2fannounce&tr=udp%3a%2f%2fopen.stealth.si%3a80%2fannounce&tr=udp%3a%2f%2ftracker.opentrackr.org%3a1337%2fannounce&tr=udp%3a%2f%2fexodus.desync.com%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.torrent.eu.org%3a451%2fannounce',
      name: '[Judas] I Want to Eat Your Pancreas',
      size: 276445467,
      seeds: 15,
      peers: 25,
      verified: true,
      quality: '1080p',
      source: 'WEB-DL'
    };

    console.log('[WatchMoviePage] Test torrent info:', {
      name: testTorrent.name,
      infoHash: testTorrent.infoHash,
      size: (testTorrent.size / 1024 / 1024).toFixed(2) + ' MB',
      seeds: testTorrent.seeds,
      peers: testTorrent.peers,
      quality: testTorrent.quality,
      source: testTorrent.source
    });

    // Parse magnet URI để xem trackers
    const magnetParams = new URLSearchParams(testTorrent.magnetURI.split('?')[1]);
    console.log('[WatchMoviePage] Magnet trackers:', 
      Array.from(magnetParams.getAll('tr')).map(tr => decodeURIComponent(tr))
    );

    setTorrents([testTorrent]);
    handleTorrentSelect(testTorrent);

    return () => {
      destroyTorrentService();
    };
  }, []);

  const handleTorrentSelect = async (torrent: TorrentInfo) => {
    try {
      destroyTorrentService();
      
      const service = new TorrentService();
      torrentServiceRef.current = service;
      
      const {streamURL, stats} = await service.streamTorrent(torrent.magnetURI);
      setStreamURL(streamURL);
      setStreamStats(stats);
    } catch (error) {
      console.error('Streaming error:', error);
      destroyTorrentService();
    }
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8">Error loading movie</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8 bg-background text-text">
      <div id="player" className="w-full aspect-video bg-gray-800 rounded-lg"></div>
      
      {/* Torrent Stats */}
      <div className="mt-4 p-4 bg-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Stream Stats</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Progress</p>
            <p className="text-white">{(streamStats.progress * 100).toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-gray-400">Download Speed</p>
            <p className="text-white">{(streamStats.downloadSpeed / 1024).toFixed(1)} KB/s</p>
          </div>
          <div>
            <p className="text-gray-400">Peers</p>
            <p className="text-white">{streamStats.peers}</p>
          </div>
        </div>
      </div>
      {/* Movie information */}
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">{movie?.title}</h1>
        
        <div className="flex gap-4 text-sm text-gray-400">
          <span>{movie?.releaseDateFormatted}</span>
          <span>{movie?.runtime} minutes</span>
          <span>{movie?.voteAverage?.toFixed(1)} ⭐</span>
        </div>

        <p className="text-gray-300">{movie?.overview}</p>

        <div>
          <h2 className="text-xl font-semibold mb-2">Genres</h2>
          <div className="flex gap-2 flex-wrap">
            {movie?.genres?.map((genre) => (
              <span key={genre.id} className="px-3 py-1 bg-primary rounded-full text-sm">
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default WatchMoviePage;