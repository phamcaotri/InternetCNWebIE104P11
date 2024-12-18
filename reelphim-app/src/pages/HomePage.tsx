import React from 'react';
import MovieSection from '../components/MovieSection';
import { tmdbapi } from '../services/tmdbApi';
import Dashboard from '../components/Dashboard';

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
  const { data: upcomingMovies } =  tmdbapi.UpcomingMovies({ page: 1 });
  const { data: popularMovies } = tmdbapi.PopularMovies({ page: 2 });
  const { data: nowPlayingMovies } = tmdbapi.NowPlayingMovies({ page: 1 });
  const { data: topRatedMovies } = tmdbapi.TopRatedMovies();
 
  // // Loading state
  // if (isLatestLoading || isPopularLoading || isNowPlayingLoading || isTopRatedLoading) {
  //   return <div>Loading...</div>; // Có thể thay bằng loading spinner
  // }

  return (
    <div className="min-h-screen bg-background text-white flex flex-col">
      {/* New full-width content section */}
      <div className="w-full bg-black-800 p-6">
        <div className="text-center">
          <Dashboard />
        </div>
      </div>
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
    </div>
  );
};

export default HomePage;