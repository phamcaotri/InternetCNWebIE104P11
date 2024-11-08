import React from 'react';
import MovieSection from '../components/MovieSection';
import { usePoppularTVShows, useNewTVShows, useTopRatedTVShows } from '../hooks/useTVShows';

const TVShowsPage = () => {
  // Fetch data từ API
  const { data: popularTVShows, isLoading: isPopularLoading } = usePopularTVShows();
  const { data: newTVShows, isLoading: isNewLoading } = useNewTVShows();
  const { data: topRatedTVShows, isLoading: isTopRatedLoading } = useTopRatedTVShows();

  // Loading state
  if (isPopularLoading || isNewLoading || isTopRatedLoading) {
    return <div>Loading...</div>;
  }

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