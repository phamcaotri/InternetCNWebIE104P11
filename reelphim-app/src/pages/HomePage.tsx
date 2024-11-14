import React from 'react';
import MovieSection from '../components/MovieSection';
import { tmdbapi } from '../services/tmdbApi';

const HomePage = () => {
  /** @author @phamcaotri
   * Định nghĩa nội dung trang homepage, với 4 section chính:
   * - Đang chiếu
   * - Được xem nhiều nhất
   * - Sắp ra mắt
   * - Đánh giá cao
   * Mỗi section lấy thông tin movie từ API trong ../hooks/useMovie.ts
   * 
   */
  // Fetch data từ API
  const { data: upcomingMovies } =  tmdbapi.UpcomingMovies();
  const { data: popularMovies } = tmdbapi.PopularMovies();
  const { data: nowPlayingMovies } = tmdbapi.NowPlayingMovies();
  const { data: topRatedMovies } = tmdbapi.TopRatedMovies();
 
  // // Loading state
  // if (isLatestLoading || isPopularLoading || isNowPlayingLoading || isTopRatedLoading) {
  //   return <div>Loading...</div>; // Có thể thay bằng loading spinner
  // }

  return (
    <main>
      {nowPlayingMovies?.results && (
        <MovieSection
          title="Đang chiếu"
          description="Thưởng thức những bộ phim hot nhất như đang ở rạp."
          movies={nowPlayingMovies.results}
        />
      )}
      
      {popularMovies?.results && (
        <MovieSection
          title="Được xem nhiều nhất"
          description="Khám phá những bộ phim mà ai cũng đang bàn tán."
          movies={popularMovies.results}
        />
      )}
      
      {upcomingMovies?.results && (
        <MovieSection
          title="Sắp ra mắt"
          description="Đừng bỏ lỡ cơ hội thưởng thức những bộ phim mới nhất."
          movies={upcomingMovies.results}
        />
      )}
      
      {topRatedMovies?.results && (
        <MovieSection
          title="Đánh giá cao"
          description="Khám phá những bộ phim bất hủ."
          movies={topRatedMovies.results}
        />
      )}
    </main>
  );
};

export default HomePage;