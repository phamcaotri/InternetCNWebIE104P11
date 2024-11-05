import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MovieList from '../components/MovieList';
const fakeSearchResults = [
  { id: 1, title: "Deadpool và Wolverine", year: "2024", imageUrl: "https://upload.wikimedia.org/wikipedia/vi/4/4c/Deadpool_%26_Wolverine_poster.jpg?20240726002313" },
  { id: 2, title: "Những mảnh ghép cảm xúc 2", year: "2024", imageUrl: "https://upload.wikimedia.org/wikipedia/en/f/f7/Inside_Out_2_poster.jpg" },
  { id: 3, title: "Kẻ trộm Mặt Trăng 4", year: "2024", imageUrl: "https://upload.wikimedia.org/wikipedia/vi/thumb/e/e3/K%E1%BA%BB_tr%E1%BB%99m_m%E1%BA%B7t_tr%C4%83ng_4_poster2.jpg/220px-K%E1%BA%BB_tr%E1%BB%99m_m%E1%BA%B7t_tr%C4%83ng_4_poster2.jpg" },
  { id: 4, title: "Lật mặt 7: Một điều ước", year: "2024", imageUrl: "https://upload.wikimedia.org/wikipedia/vi/d/d4/%C3%81p_ph%C3%ADch_ch%C3%ADnh_th%E1%BB%A9c_L%E1%BA%ADt_m%E1%BA%B7t_7.jpg" },
  { id: 5, title: "Mai", year: "2024", imageUrl: "https://upload.wikimedia.org/wikipedia/vi/thumb/3/36/Mai_2024_poster.jpg/220px-Mai_2024_poster.jpg" },
  { id: 6, title: "Look Back: Liệu Ta Có Dám Nhìn Lại?", year: "2024", imageUrl: "https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/image/c5f0a1eff4c394a251036189ccddaacd/p/o/poster_lookback_.jpg" },
  { id: 7, title: "Khóa chặt cửa nào Suzume", year: "2023", imageUrl: "https://upload.wikimedia.org/wikipedia/vi/thumb/5/51/Suzume_no_Tojimari.tiff/lossy-page1-374px-Suzume_no_Tojimari.tiff.jpg?20220929010539" },
  { id: 8, title: "Oppenheimer", year: "2023", imageUrl: "https://upload.wikimedia.org/wikipedia/vi/2/21/Oppenheimer_%E2%80%93_Vietnam_poster.jpg" },
  { id: 9, title: "Interstellar: Hố đen tử thần", year: "2014", imageUrl: "https://upload.wikimedia.org/wikipedia/vi/4/46/Interstellar_poster.jpg?20160325095701" },
  { id: 10, title: "Zootopia: Phi vụ động trời", year: "2016", imageUrl: "https://upload.wikimedia.org/wikipedia/vi/1/1f/Zootopia_logo_vietnam.jpg?20160307231626" },
  { id: 11, title: "Người nhện: Du hành vũ trụ nhện", year: "2023", imageUrl: "https://upload.wikimedia.org/wikipedia/vi/thumb/b/b8/Spider-Man-_Across_the_Spider-Verse_poster.jpg/220px-Spider-Man-_Across_the_Spider-Verse_poster.jpg" },
  { id: 12, title: "Vùng đất linh hồn", year: "2020", imageUrl: "https://upload.wikimedia.org/wikipedia/vi/thumb/8/89/Soul_%282020%29_Film_Poster.jpg/220px-Soul_%282020%29_Film_Poster.jpg" },
  { id: 13, title: "Chú chó đỏ khổng lồ", year: "2022", imageUrl: "https://upload.wikimedia.org/wikipedia/vi/thumb/5/5e/Turning_Red_poster.jpg/220px-Turning_Red_poster.jpg" },
  { id: 14, title: "Luca", year: "2021", imageUrl: "https://upload.wikimedia.org/wikipedia/vi/thumb/3/33/Luca_%28phim_2021%29_poster.jpg/220px-Luca_%28phim_2021%29_poster.jpg" },
  { id: 15, title: "Coco: Hội ngộ diệu kỳ", year: "2017", imageUrl: "https://upload.wikimedia.org/wikipedia/vi/thumb/9/98/Coco_%28phim_2017%29_poster.jpg/220px-Coco_%28phim_2017%29_poster.jpg" },
];

const SearchResultsPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('q') || '';

  useEffect(() => {
    const filteredResults = fakeSearchResults.filter(movie => 
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredResults);
  }, [searchTerm]);

  return (
    <div>
      <h1 className="text-3xl font-bold my-8 text-text">Kết quả tìm kiếm cho "{searchTerm}"</h1>
      {searchResults.length > 0 ? (
        <MovieList movies={searchResults} />
      ) : (
        <p className="text-lg text-text-muted">Không tìm thấy kết quả phù hợp.</p>
      )}
    </div>
  );
};

export default SearchResultsPage;