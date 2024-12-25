import React, { useEffect, useState } from 'react';
import { getWatchHistory } from '../services/api'; // API để lấy lịch sử xem
import { useNavigate } from 'react-router-dom';

interface WatchHistoryTabProps {
  userId: string; // ID người dùng
}

const WatchHistoryTab: React.FC<WatchHistoryTabProps> = ({ userId }) => {
  const [watchHistory, setWatchHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Lấy lịch sử xem
  useEffect(() => {
    const loadWatchHistory = async () => {
      try {
        const response = await getWatchHistory(userId); // Gọi API
        console.log('Dữ liệu từ API:', response);
  
        // Đảm bảo response.data là mảng
        const normalizedData = Array.isArray(response.data) 
          ? response.data 
          : response.data 
          ? [response.data] 
          : [];
  
        setWatchHistory(normalizedData);
      } catch (err) {
        console.error('Lỗi khi tải lịch sử xem:', err);
        setWatchHistory([]); // Nếu có lỗi, đặt watchHistory là mảng rỗng
      }
    };
  
    loadWatchHistory();
  }, [userId]);

  // Điều hướng để phát lại phim từ thời điểm đã dừng
  const handleResumePlayback = (magnet: string, last_watched_time: number, movie_id: number, title: string, banner: string) => {
    if (!movie_id || isNaN(movie_id)) {
      console.error('movieId không hợp lệ:', movie_id);
      return; // Ngăn không điều hướng khi movieId không hợp lệ
    }
        localStorage.setItem(
      'currentMovie',
      JSON.stringify({
        movie_id,
        title,
        banner,
        magnet,
        last_watched_time
      })
    );
      navigate(`/movie/watch/${movie_id}?magnet=${encodeURIComponent(magnet)}&startTime=${last_watched_time}`);
  };
  
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: 'white', marginBottom: '20px', textAlign: 'center', fontSize: '24px', fontWeight: 'bold'  }}>
        Lịch sử xem
      </h2>
      {watchHistory.length === 0 ? (
        <p style={{ color: 'white', textAlign: 'center', fontSize: '18px' }}>Không có lịch sử xem.</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '20px',
          }}
        >
          {watchHistory.map((item) => {
            if (!item.movie_id) {
              console.error('Thiếu movie_id trong item:', item);
              return null;
            }

            return (
              <div
                key={item.movie_id}
                style={{
                  position: 'relative',
                  backgroundColor: '#1c1c1c',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 15px rgba(0, 0, 0, 0.3)',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer',
                }}
                onClick={() =>
                  handleResumePlayback(item.magnet, item.last_watched_time || 0, item.movie_id, item.title, item.banner)
                }
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <img
                  src={item.banner || '/default-banner.jpg'}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '300px',
                    objectFit: 'cover',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    padding: '10px',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    textAlign: 'center',
                  }}
                >
                  <h4 style={{ fontSize: '16px', marginBottom: '5px', fontWeight: 'bold'  }}>{item.title}</h4>
                  <p style={{ fontSize: '14px', color: '#ccc' }}>
                    Đã dừng tại <strong>{Math.floor((item.last_watched_time || 0) / 60)} phút</strong>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default WatchHistoryTab;