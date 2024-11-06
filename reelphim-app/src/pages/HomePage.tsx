import React from 'react';
import MovieSection from '../components/MovieSection';
import { 
  useLatestMovies,
  useNowPlayingMovies,
  usePopularMovies,
  useTopRatedMovies 
} from '../hooks/useMovie';

const HomePage = () => {
  // Fetch data từ API
  const { data: latestMovies, isLoading: isLatestLoading } = useLatestMovies();
  const { data: popularMovies, isLoading: isPopularLoading } = usePopularMovies();
  const { data: nowPlayingMovies, isLoading: isNowPlayingLoading } = useNowPlayingMovies();
  const { data: topRatedMovies, isLoading: isTopRatedLoading } = useTopRatedMovies();
 
  // // Loading state
  // if (isLatestLoading || isPopularLoading || isNowPlayingLoading || isTopRatedLoading) {
  //   return <div>Loading...</div>; // Có thể thay bằng loading spinner
  // }

  return (
    <main>
      {nowPlayingMovies?.results && (
        <MovieSection
          title="Tiếp tục xem"
          description="Tiếp tục hành trình khám phá những câu chuyện đang dang dở."
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
      
      {latestMovies?.results && (
        <MovieSection
          title="Mới phát hành"
          description="Đừng bỏ lỡ cơ hội thưởng thức những bộ phim mới nhất."
          movies={latestMovies.results}
        />
      )}
      
      {topRatedMovies?.results && (
        <MovieSection
          title="Đề xuất"
          description="Khám phá những bộ phim mà bạn sẽ yêu thích."
          movies={topRatedMovies.results}
        />
      )}
    </main>
  );
};

export default HomePage;