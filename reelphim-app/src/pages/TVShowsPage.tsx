import React from 'react';
import MovieSection from '../components/MovieSection';
import { tmdbapi } from '../services/tmdbApi';

const TVShowsPage = () => {
  const { data: popularTVShows } = tmdbapi.PopularTVShows();
  const { data: newTVShows } = tmdbapi.NowPlayingTVShows();
  const { data: topRatedTVShows } = tmdbapi.TopRatedTVShows();

  return (
    <main>
      <h1 className="text-3xl font-bold mb-8 text-text">TV Shows</h1>
      {popularTVShows?.results && (
      <MovieSection
        title="Phổ biến"
        description="Những series TV đang được yêu thích nhất hiện nay."
        movies={popularTVShows.results}
      />
      )}
      {newTVShows?.results && (
      <MovieSection
        title="Mới phát hành"
        description="Các series TV mới nhất, đừng bỏ lỡ tập nào."
        movies={newTVShows.results}
      />
      )}
      {topRatedTVShows?.results && (
      <MovieSection
        title="Đánh giá cao nhất"
        description="Những series TV được đánh giá cao nhất mọi thời đại."
        movies={topRatedTVShows.results}
      />
      )}
    </main>
  );
};

export default TVShowsPage;