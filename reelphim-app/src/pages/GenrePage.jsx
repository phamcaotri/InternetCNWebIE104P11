import React from 'react';
import MovieSection from '../components/MovieSection';
import { action, comedy, drama, sciFi } from '../data/genreData';

const GenrePage = () => {
  return (
    <main>
      <h1 className="text-3xl font-bold mb-8 text-text">Thể loại phim</h1>
      <MovieSection
        title="Hành động"
        description="Những bộ phim gay cấn và đầy kịch tính."
        movies={action}
      />
      <MovieSection
        title="Hài"
        description="Giải trí với những tình huống hài hước."
        movies={comedy}
      />
      <MovieSection
        title="Chính kịch"
        description="Khám phá những câu chuyện sâu sắc và đầy cảm xúc."
        movies={drama}
      />
      <MovieSection
        title="Khoa học viễn tưởng"
        description="Phiêu lưu vào thế giới của tương lai và công nghệ."
        movies={sciFi}
      />
    </main>
  );
};

export default GenrePage;