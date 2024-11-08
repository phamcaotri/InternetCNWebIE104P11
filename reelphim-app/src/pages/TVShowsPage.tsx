import React from 'react';
import MovieSection from '../components/MovieSection';

const TVShowsPage = () => {
  const popularTVShows = [];
  const newTVShows = [];
  const topRatedTVShows = [];

  return (
    <main>
      <h1 className="text-3xl font-bold mb-8 text-text">TV Shows</h1>
      <MovieSection
        title="Phổ biến"
        description="Những series TV đang được yêu thích nhất hiện nay."
        movies={popularTVShows}
      />
      <MovieSection
        title="Mới phát hành"
        description="Các series TV mới nhất, đừng bỏ lỡ tập nào."
        movies={newTVShows}
      />
      <MovieSection
        title="Đánh giá cao nhất"
        description="Những series TV được đánh giá cao nhất mọi thời đại."
        movies={topRatedTVShows}
      />
    </main>
  );
};

export default TVShowsPage;