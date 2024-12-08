import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tmdbapi } from '../services/tmdbApi';
import { Play, Download } from 'lucide-react';
import { SITE_CONFIG } from '../config/site.config';
import { searchTorrents } from '../services/torrentApi';
import { sortTorrents } from '../utils/sortTorrents';
import { TorrentResult } from '../types/torrent';

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const mainLanguage = SITE_CONFIG.DEFAULT_LANGUAGE;
  const otherLanguages = [SITE_CONFIG.OTHER_LANGUAGES, 'null'];
  const { data: movie, isLoading, error } = tmdbapi.GetMovieDetails(Number(id), { append_to_response: 'images,alternative_titles', include_image_language: mainLanguage + ',' + otherLanguages.join(','), country: 'US' });

  const [searchResults, setSearchResults] = useState<TorrentResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [sortBy, setSortBy] = useState<'seeds' | 'size' | 'peers'>('seeds');
  const [selectedProvider, setSelectedProvider] = useState('1337x');
  const PROVIDERS = ['1337x'];
  const handlePlayClick = (magnetURI: string) => {
    navigate(`/movie/watch/${id}?magnet=${encodeURIComponent(magnetURI)}`);
  };

  const handleSearch = async () => {
    if (!movie?.title) return;
    
    setIsSearching(true);
    try {
      const title = movie.originalLanguage === 'en' 
        ? movie.originalTitle?.toLowerCase().replace(/\s+/g, '+')
        : movie.alternativeTitles?.titles?.find(t => t.iso_3166_1 === 'US')?.title?.toLowerCase().replace(/\s+/g, '+') || movie.originalTitle?.toLowerCase().replace(/\s+/g, '+');
      const results = await searchTorrents(title + '+' + movie.releaseDate.substring(0,4), selectedProvider);
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (movie?.title) {
      handleSearch();
    }
  }, [movie?.title]);

  const sortedResults = useMemo(() => {
    return sortTorrents(searchResults as TorrentResult[], sortBy);
  }, [searchResults, sortBy]);

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8">Error loading movie details</div>;
  }

  return (
    <>
      {/* Backdrop Section */}
      <div className="absolute top-0 left-0 w-full h-[60vh] z-0">
        <div className="relative w-full h-full">
          <img 
            src={movie?.backdropPath || ''} 
            alt={movie?.title} 
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
              src={movie?.posterPath || ''}
              alt={`${movie?.title} poster`}
              className="w-full rounded-lg shadow-lg"
            />
            <button 
              onClick={handlePlayClick}
              className="btn-primary px-6 py-3 w-full flex items-center justify-center gap-2"
            >
              <Play size={20} />
              Xem phim
            </button>
          </div>

          {/* Right Column - Details */}
          <div className="md:col-span-2 text-text pt-6">
            {movie?.images?.logos && movie.images.logos.length > 0 ? (
              <img 
                src={movie.images.logos[0].file_path}
                alt={movie?.title}
                className="h-24 object-contain mb-4"
              />
            ) : (
              <h1 className="text-3xl font-bold mb-2">{movie?.title}</h1>
            )}

            <div className="space-y-6">
              <div className="flex gap-4 text-sm text-gray-400">
                <span>{movie?.releaseDateFormatted}</span>
                <span>{movie?.runtime} phút</span>
                <span>{movie?.voteAverage?.toFixed(1)} ⭐</span>
              </div>

              <section>
                <h2 className="text-xl font-semibold mb-2">Nội dung</h2>
                <p className="text-gray-300">{movie?.overview || 'Đang cập nhật...'}</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">Thể loại</h2>
                <div className="flex gap-2 flex-wrap">
                  {movie?.genres?.map((genre) => (
                    <span key={genre.id} className="px-3 py-1 bg-primary rounded-full text-sm">
                      {genre.name}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Torrent Results Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        <div className="bg-gray-800/50 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Available Sources</h2>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'seeds' | 'size' | 'peers')}
              className="bg-gray-700 text-white rounded-lg px-3 py-1"
            >
              <option value="seeds">Sort by Seeds</option>
              <option value="peers">Sort by Peers</option>
              <option value="size">Sort by Size</option>
            </select>
          </div>
          
          {isSearching ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-4">
              {sortedResults.map((result, index) => (
                <div 
                  key={index}
                  className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Title and Size */}
                    <div className="flex-1">
                      <h3 className="font-medium text-lg text-gray-200 mb-2">
                        {result.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm">
                        {/* Size */}
                        <div className="flex items-center gap-2">
                          <Download size={16} className="text-gray-400" />
                          <span className="text-gray-300">{result.size}</span>
                        </div>
                        
                        {/* Seeds */}
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                            {result.seeds} seeds
                          </span>
                        </div>
                        
                        {/* Peers */}
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400">
                            {result.peers} peers
                          </span>
                        </div>
                        
                        {/* Provider */}
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 rounded-full bg-gray-700 text-gray-300">
                            {result.provider}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex-shrink-0">
                      <button
                        onClick={() => handlePlayClick(result.magnet)}
                        className="px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-lg flex items-center gap-2 transition-colors"
                      >
                        <Play size={16} />
                        Play
                      </button>
                    </div>
                  </div>
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
    </>
  );
};

export default MovieDetailPage;