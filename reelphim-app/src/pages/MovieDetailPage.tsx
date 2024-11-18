import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tmdbapi } from '../services/tmdbApi';
import { Play } from 'lucide-react';
import { SITE_CONFIG } from '../config/site.config';

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const mainLanguage = SITE_CONFIG.DEFAULT_LANGUAGE;
  const otherLanguages = [SITE_CONFIG.OTHER_LANGUAGES, 'null'];
  const { data: movie, isLoading, error } = tmdbapi.GetMovieDetails(Number(id), { append_to_response: 'images', include_image_language: mainLanguage + ',' + otherLanguages.join(',') });

  const handlePlayClick = () => {
    navigate(`/movie/watch/${id}`);
  };

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
    </>
  );
};

export default MovieDetailPage;