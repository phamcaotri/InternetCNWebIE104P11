import React from 'react';
import MovieSection from '../components/MovieSection';
import { popularTVShows, newTVShows, topRatedTVShows } from '../data/tvShowData';

const TVShowsPage = () => {
  return (
    <main className="py-8">
      <h1 className="text-3xl font-bold mb-8">TV Shows</h1>
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