import React from 'react';
import MovieSection from '../components/MovieSection';
import { tmdbapi } from '../services/tmdbApi';

const TVShowsPage = () => {
  const { data: airingTodayTVShows } = tmdbapi.AiringTodayTvShows({ page: 1 });
  const { data: onTheAirTVShows } = tmdbapi.OnTheAirTvShows({ page: 2 });
  const { data: popularTVShows } = tmdbapi.PopularTvShows({ page: 3 });
  const { data: topRatedTVShows } = tmdbapi.TopRatedTvShows({ page: 1 });

  return (
    <main>
      <h1 className="text-3xl font-bold mb-8 text-text">TV Shows</h1>
      {airingTodayTVShows?.results && (
      <MovieSection
        categoryId="airing-today"
        title="Đang phát hành"
        description="Những series TV đang được yêu thích nhất hiện nay."
        movies={airingTodayTVShows?.results || []}
      />
      )}
      {onTheAirTVShows?.results && (
      <MovieSection
        categoryId="on-the-air"
        title="Đang phát hành"
        description="Các series TV mới nhất, đừng bỏ lỡ tập nào."
        movies={onTheAirTVShows?.results || []}
      />
      )}
      {popularTVShows?.results && (
      <MovieSection
        categoryId="popular"
        title="Phổ biến"
        description="Những series TV đang được yêu thích nhất hiện nay."
        movies={popularTVShows?.results || []}
      />
      )}
      {topRatedTVShows?.results && (
      <MovieSection
        categoryId="top-rated"
        title="Đánh giá cao"
        description="Những series TV được đánh giá cao nhất mọi thời đại."
        movies={topRatedTVShows?.results || []}
      />
      )}
    </main>
  );
};

export default TVShowsPage;