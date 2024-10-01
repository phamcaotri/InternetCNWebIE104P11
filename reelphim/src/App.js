import React, {useRef} from 'react';
import { Search } from 'lucide-react';

const MovieCard = ({ title, year, imageUrl }) => (
  <div className="relative overflow-hidden rounded-md transition-transform hover:scale-105">
    <img src={imageUrl} alt={`${title} poster`} className="w-full h-full object-cover" />
    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2 transform translate-y-full transition-transform group-hover:translate-y-0">
      <div className="font-bold mb-1">{title}</div>
      <div className="text-sm opacity-80">{year}</div>
    </div>
  </div>
);

const MovieGrid = ({ movies }) => {
  const gridRef = useRef(null);

  const scrollLeft = () => {
    if (gridRef.current) {
      gridRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (gridRef.current) {
      gridRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        onClick={scrollLeft}
      >
        &lt;
      </button>
      <div ref={gridRef} className="flex overflow-x-auto space-x-4 no-scrollbar">
        {movies.map((movie, index) => (
          <div key={index} className="flex-shrink-0 w-48">
            <MovieCard {...movie} />
          </div>
        ))}
      </div>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        onClick={scrollRight}
      >
        &gt;
      </button>
    </div>
  );
};

const MovieSection = ({ title, description, movies }) => (
  <section className="mb-8">
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    <p className="mb-4">{description}</p>
    <MovieGrid movies={movies} />
  </section>
);
const App = () => {
  const continueWatching = [
    { title: "Look Back: Liệu Ta Có Dám Nhìn Lại?", year: "2024", imageUrl: "https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/image/c5f0a1eff4c394a251036189ccddaacd/p/o/poster_lookback_.jpg" },
    { title: "Khóa chặt cửa nào Suzume", year: "2023", imageUrl: "https://upload.wikimedia.org/wikipedia/vi/thumb/5/51/Suzume_no_Tojimari.tiff/lossy-page1-374px-Suzume_no_Tojimari.tiff.jpg?20220929010539" },
    { title: "Oppenheimer", year: "2023", imageUrl: "https://upload.wikimedia.org/wikipedia/vi/2/21/Oppenheimer_%E2%80%93_Vietnam_poster.jpg" },
    { title: "Interstellar: Hố đen tử thần", year: "2014", imageUrl: "https://upload.wikimedia.org/wikipedia/vi/4/46/Interstellar_poster.jpg?20160325095701" },
    { title: "Zootopia: Phi vụ động trời", year: "2016", imageUrl: "https://upload.wikimedia.org/wikipedia/vi/1/1f/Zootopia_logo_vietnam.jpg?20160307231626" },
        { title: "Look Back: Liệu Ta Có Dám Nhìn Lại?", year: "2024", imageUrl: "https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/image/c5f0a1eff4c394a251036189ccddaacd/p/o/poster_lookback_.jpg" },
    { title: "Khóa chặt cửa nào Suzume", year: "2023", imageUrl: "https://upload.wikimedia.org/wikipedia/vi/thumb/5/51/Suzume_no_Tojimari.tiff/lossy-page1-374px-Suzume_no_Tojimari.tiff.jpg?20220929010539" },
    { title: "Oppenheimer", year: "2023", imageUrl: "https://upload.wikimedia.org/wikipedia/vi/2/21/Oppenheimer_%E2%80%93_Vietnam_poster.jpg" },
    { title: "Interstellar: Hố đen tử thần", year: "2014", imageUrl: "https://upload.wikimedia.org/wikipedia/vi/4/46/Interstellar_poster.jpg?20160325095701" },
    { title: "Zootopia: Phi vụ động trời", year: "2016", imageUrl: "https://upload.wikimedia.org/wikipedia/vi/1/1f/Zootopia_logo_vietnam.jpg?20160307231626" },
  ];

  const mostWatched = [
    { title: "Deadpool và Wolverine", year: "2024", imageUrl: "https://upload.wikimedia.org/wikipedia/vi/4/4c/Deadpool_%26_Wolverine_poster.jpg?20240726002313" },
    { title: "Những mảnh ghép cảm xúc 2", year: "2024", imageUrl: "https://upload.wikimedia.org/wikipedia/en/f/f7/Inside_Out_2_poster.jpg" },
    { title: "Kẻ trộm Mặt Trăng 4", year: "2024", imageUrl: "https://upload.wikimedia.org/wikipedia/vi/thumb/e/e3/K%E1%BA%BB_tr%E1%BB%99m_m%E1%BA%B7t_tr%C4%83ng_4_poster2.jpg/220px-K%E1%BA%BB_tr%E1%BB%99m_m%E1%BA%B7t_tr%C4%83ng_4_poster2.jpg" },
    { title: "Lật mặt 7: Một điều ước", year: "2024", imageUrl: "https://upload.wikimedia.org/wikipedia/vi/d/d4/%C3%81p_ph%C3%ADch_ch%C3%ADnh_th%E1%BB%A9c_L%E1%BA%ADt_m%E1%BA%B7t_7.jpg" },
    { title: "Mai", year: "2024", imageUrl: "https://upload.wikimedia.org/wikipedia/vi/thumb/3/36/Mai_2024_poster.jpg/220px-Mai_2024_poster.jpg" },
  ];

  const newReleases = [
    { title: "Quái vật không gian: Romulus", year: "2024", imageUrl: "https://upload.wikimedia.org/wikipedia/vi/thumb/7/7e/ALIEN_ROMULUS_%E2%80%93_Vietnam_poster.jpg/220px-ALIEN_ROMULUS_%E2%80%93_Vietnam_poster.jpg" },
    { title: "Ma da", year: "2024", imageUrl: "https://upload.wikimedia.org/wikipedia/vi/thumb/b/bd/%C3%81p_ph%C3%ADch_ch%C3%ADnh_th%E1%BB%A9c_Ma_Da.jpg/220px-%C3%81p_ph%C3%ADch_ch%C3%ADnh_th%E1%BB%A9c_Ma_Da.jpg" },
    { title: "Cám", year: "2024", imageUrl: "https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/image/1800x/71252117777b696995f01934522c402d/t/e/teaser_poster_-_nkc_20.09.2024.jpg" },
  ];

  const recommended = [
    { title: "Tớ muốn ăn tụy của cậu", year: "2019", imageUrl: "https://afamilycdn.com/2019/1/18/tmatcc-main-poster-15478041042761367991513.jpg" },
    { title: "M3gan", year: "2023", imageUrl: "https://upload.wikimedia.org/wikipedia/vi/2/23/Poster_cho_phim_M3gan_%282023%29.jpg?20230123075423" },
    { title: "Inception: Kẻ trộm giấc mơ", year: "2010", imageUrl: "https://upload.wikimedia.org/wikipedia/vi/thumb/1/11/Inception_poster_1.jpg/220px-Inception_poster_1.jpg" },
    { title: "Ký sinh trùng", year: "2019", imageUrl: "https://upload.wikimedia.org/wikipedia/vi/thumb/c/cc/Poster_phim_Parasite_2019.jpg/220px-Poster_phim_Parasite_2019.jpg" },
    { title: "Bẫy", year: "2024", imageUrl: "https://upload.wikimedia.org/wikipedia/vi/thumb/e/e7/TRAP_-_Vietnam_poster.jpg/220px-TRAP_-_Vietnam_poster.jpg" },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex justify-between items-center py-6">
          <div className="text-2xl font-bold">Reelphim</div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#" className="hover:text-gray-300">Trang chủ</a></li>
              <li><a href="#" className="text-blue-500">Thể loại</a></li>
              <li><a href="#" className="hover:text-gray-300">Danh sách lưu</a></li>
            </ul>
          </nav>
          <div className="relative">
            <input
              type="text"
              placeholder="Search movies..."
              className="bg-gray-800 text-white px-4 py-2 rounded-full pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </header>

        <main>
          <MovieSection
            title="Tiếp tục xem"
            description="Tiếp tục hành trình khám phá những câu chuyện đang dở."
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
      </div>
    </div>
  );
};

export default App;