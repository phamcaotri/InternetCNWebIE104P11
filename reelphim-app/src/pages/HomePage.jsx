import React from 'react';
import MovieSection from '../components/MovieSection';
import { continueWatching, mostWatched, newReleases, recommended } from '../data/homeData';
// import { useState, useEffect } from 'react';
// import { useTMDB } from '../hooks/useTMDB';

// function HomePage() {
//   const [trendingMovies, setTrendingMovies] = useState([]);
//   const { loading, error, fetchMovies } = useTMDB();

//   useEffect(() => {
//     const getTrendingMovies = async () => {
//       try {
//         const data = await fetchMovies('popular');
//         setTrendingMovies(data.results);
//       } catch (err) {
//         console.error('Error fetching trending movies:', err);
//       }
//     };

//     getTrendingMovies();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       {trendingMovies.map(movie => (
//         <MovieCard key={movie.id} movie={movie} />
//       ))}
//     </div>
//   );
// }
const HomePage = () => {
  return (
    <main>
      <MovieSection
        title="Tiếp tục xem"
        description="Tiếp tục hành trình khám phá những câu chuyện đang dang dở."
        movies={continueWatching}
      />
      <MovieSection
        title="Được xem nhiều nhất"
        description="Khám phá những bộ phim mà ai cũng đang bàn tán."
        movies={mostWatched}
      />
      <MovieSection
        title="Mới phát hành"
        description="Đừng bỏ lỡ cơ hội thưởng thức những bộ phim mới nhất."
        movies={newReleases}
      />
      <MovieSection
        title="Đề xuất"
        description="Khám phá những bộ phim mà bạn sẽ yêu thích."
        movies={recommended}
      />
    </main>
  );
};

export default HomePage;