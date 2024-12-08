import React from 'react';
import { useParams } from 'react-router-dom';
import { tmdbapi } from '../services/tmdbApi';
import { API_CONFIG } from '../config';
import { Play } from 'lucide-react';
import { SITE_CONFIG } from '../config/site.config';

const TVShowDetail = () => {
  const { id } = useParams();
  const mainLanguage = SITE_CONFIG.DEFAULT_LANGUAGE;
  const otherLanguages = [SITE_CONFIG.OTHER_LANGUAGES, 'null'];
  const { data: tvShow, isLoading, error } = tmdbapi.GetTvDetails(Number(id), { 
    append_to_response: 'images,alternative_titles', 
    include_image_language: mainLanguage + ',' + otherLanguages.join(','), 
    country: 'US' 
  });
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

        {/* Seasons Section */}
        {tvShow?.seasons && tvShow.seasons.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-semibold mb-4">Seasons</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {tvShow.seasons.map((season) => (
                <div key={season.id} className="bg-gray-800/50 rounded-lg p-3">
                  <img 
                    src={season.posterPath || tvShow.posterPath || ''} 
                    alt={season.name}
                    className="w-full h-40 object-cover rounded-lg mb-2"
                  />
                  <h3 className="font-semibold text-sm">{season.name}</h3>
                  <p className="text-xs text-gray-400">
                    {season.episodeCount} episodes
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default TVShowDetail;