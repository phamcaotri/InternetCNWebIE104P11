import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tmdbapi } from '../services/tmdbApi';
import { API_CONFIG } from '../config';
import { Play, Download, ChevronDown, Folder, File } from 'lucide-react';
import { SITE_CONFIG } from '../config/site.config';
import { searchTorrents } from '../services/torrentApi';
import { sortTorrents } from '../utils/sortTorrents';
import { TorrentResult } from '../types/torrent';
import { FileTree } from '../components/FileTree';
import { toast } from 'react-hot-toast';

interface FileNode {
  name: string;
  type: string;
  size: number;
  progress?: number;
  extension?: string;
  path?: string;
  children?: { [key: string]: FileNode };
}

interface FileTreeResponse {
  structure: FileNode;
}

interface TorrentStructure {
  files: {
    name: string;
    path: string;
    size: number;
    type: string;
    progress: number;
    extension: string;
    pathParts: string[];
    parentFolder: string | null;
    created?: Date;
    lastModified?: Date;
    priority?: number;
  }[];
  folders: Set<string>;
  totalSize: number;
  fileCount: number;
  hasVideos: boolean;
  hasSubtitles: boolean;
  name: string;
  infoHash: string;
  created?: Date;
  comment?: string;
  isPrivate: boolean;
}

const currentHost = window.location.hostname;
const SERVER_PORT = '5000';
const SERVER_URL = `http://${currentHost}:${SERVER_PORT}`;

const TVShowDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const mainLanguage = SITE_CONFIG.DEFAULT_LANGUAGE;
  const otherLanguages = [SITE_CONFIG.OTHER_LANGUAGES, 'null'];
  const [searchResults, setSearchResults] = useState<TorrentResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedMagnet, setSelectedMagnet] = useState<string>('');
  const [sortBy, setSortBy] = useState<'seeds' | 'size' | 'peers'>('seeds');
  const [torrentFiles, setTorrentFiles] = useState<Array<{
    name: string;
    path: string;
    size: number;
  }>>([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [torrentStructure, setTorrentStructure] = useState<TorrentStructure | null>(null);
  const [fileStructure, setFileStructure] = useState<FileTreeResponse | null>(null);
  const { data: tvShow, isLoading, error } = tmdbapi.GetTvDetails(Number(id), { 
    append_to_response: 'images,alternative_titles', 
    include_image_language: mainLanguage + ',' + otherLanguages.join(','), 
    country: 'US' 
  });

  const handleSearch = async () => {
    if (!tvShow?.name) return;
    
    setIsSearching(true);
    try {
      const title = tvShow.originalLanguage === 'en' 
        ? tvShow.originalName?.toLowerCase().replace(/\s+/g, '+')
        : tvShow.alternativeTitles?.titles?.find(t => t.iso_3166_1 === 'US')?.title?.toLowerCase().replace(/\s+/g, '+') 
          || tvShow.originalName?.toLowerCase().replace(/\s+/g, '+');
      const results = await searchTorrents(title + '+' + tvShow.releaseDate.substring(0,4), 'all');
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleMagnetSelect = async (magnet: string) => {
    setSelectedMagnet(magnet);
    await fetchTorrentFiles(magnet);
  };

  const fetchTorrentFiles = async (magnet: string) => {
    setIsLoadingFiles(true);
    try {
      const infoHash = magnet.match(/btih:([a-zA-Z0-9]+)/)?.[1];
      if (!infoHash) throw new Error('Invalid magnet URL');

      const response = await fetch(`${SERVER_URL}/files/${infoHash}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: FileTreeResponse = await response.json();
      setFileStructure(data);
    } catch (error) {
      console.error('Error fetching files:', error);
      toast.error('Failed to load torrent files');
    } finally {
      setIsLoadingFiles(false);
    }
  };

  const handleFileSelect = (file: FileNode) => {
    if (file.path && file.type === 'video') {
      setSelectedFile(file.path);
      navigate(`/tv/watch/${id}?magnet=${encodeURIComponent(selectedMagnet)}&file=${encodeURIComponent(file.path)}`);
    }
  };

  const renderFileList = () => {
    if (isLoadingFiles) {
      return (
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      );
    }

    if (torrentFiles.length === 0) {
      return (
        <div className="text-center py-4 text-gray-400">
          No files found in torrent
        </div>
      );
    }

    return (
      <FileTree
        files={torrentFiles}
        onFileSelect={(file) => {
          setSelectedFile(file.path);
          navigate(`/tv/watch/${id}?magnet=${encodeURIComponent(selectedMagnet)}&file=${encodeURIComponent(file.path)}`);
        }}
        selectedPath={selectedFile}
      />
    );
  };

  useEffect(() => {
    if (tvShow?.name) {
      handleSearch();
    }
  }, [tvShow?.name]);

  const sortedResults = useMemo(() => {
    return sortTorrents(searchResults, sortBy);
  }, [searchResults, sortBy]);

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8">Error loading TV show details</div>;
  }

  return (
    <>
      {/* Backdrop Section */}
      <div className="absolute top-0 left-0 w-full h-[60vh] z-0">
        <div className="relative w-full h-full">
          <img 
            src={tvShow?.backdropPath || ''} 
            alt={tvShow?.originalName} 
            className="w-full h-full object-cover"
          />
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 50%, rgba(15,15,15,1) 100%)'
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-[35vh]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Poster */}
          <div className="space-y-4">
            <img 
              src={tvShow?.posterPath || ''}
              alt={`${tvShow?.originalName} poster`}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          {/* Right Column - Details */}
          <div className="md:col-span-2 text-text pt-6">
            {tvShow?.images?.logos && tvShow.images.logos.length > 0 ? (
              <img 
                src={tvShow.images.logos[0].file_path}
                alt={tvShow?.originalName}
                className="h-24 object-contain mb-4"
              />
            ) : (
              <h1 className="text-3xl font-bold mb-2">{tvShow?.originalName}</h1>
            )}

            <div className="space-y-6">
              <div className="flex gap-4 text-sm text-gray-400">
                <span>{tvShow?.firstAirDate?.split('-')[0]}</span>
                <span>{tvShow?.numberOfSeasons} Seasons</span>
                <span>{tvShow?.numberOfEpisodes} Episodes</span>
                <span>{tvShow?.voteAverage?.toFixed(1)} ⭐</span>
              </div>

              <section>
                <h2 className="text-xl font-semibold mb-2">Overview</h2>
                <p className="text-gray-300">{tvShow?.overview || 'Coming soon...'}</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">Genres</h2>
                <div className="flex gap-2 flex-wrap">
                  {tvShow?.genres?.map((genre) => (
                    <span key={genre.id} className="px-3 py-1 bg-primary rounded-full text-sm">
                      {genre.name}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
        {/* Torrent Results Section */}
        <div className="mt-8">
          <div className="bg-gray-800/50 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Available Sources</h2>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'seeds' | 'size' | 'peers')}
                  className="bg-gray-700 text-white rounded-lg px-3 py-1 appearance-none pr-8 cursor-pointer"
                  aria-label="Sort results by"
                >
                  <option value="seeds">Sort by Seeds</option>
                  <option value="peers">Sort by Peers</option>
                  <option value="size">Sort by Size</option>
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            
            {isSearching ? (
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : sortedResults.length > 0 ? (
              <div className="space-y-4">
                {sortedResults.map((result, index) => (
                  <div key={index}>
                    <button 
                      className={`w-full text-left bg-gray-800 rounded-lg p-4 hover:bg-gray-700/50 transition-colors ${
                        selectedMagnet === result.magnet ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => {
                        setSelectedMagnet(result.magnet);
                        fetchTorrentFiles(result.magnet);
                      }}
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex-1">
                          <h3 className="font-medium text-lg text-gray-200 mb-2">
                            {result.title}
                          </h3>
                          <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Download size={16} className="text-gray-400" />
                              <span className="text-gray-300">{result.size}</span>
                            </div>
                            <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                              {result.seeds} seeds
                            </span>
                            <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400">
                              {result.peers} peers
                            </span>
                            <span className="px-2 py-1 rounded-full bg-gray-700 text-gray-300">
                              {result.provider}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                    
                    {selectedMagnet === result.magnet && (
                      <div className="mt-4">
                        <h3 className="text-lg font-medium mb-2">Files</h3>
                        {isLoadingFiles ? (
                          <div className="flex items-center justify-center p-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                          </div>
                        ) : fileStructure?.structure ? (
                          <FileTree
                            structure={fileStructure.structure}
                            onFileSelect={handleFileSelect}
                            selectedPath={selectedFile}
                          />
                        ) : (
                          <div className="text-center py-4 text-gray-400">
                            No files found
                          </div>
                        )}
                      </div>  
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                No sources found
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TVShowDetail;