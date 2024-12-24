import React, { useEffect, useState } from 'react';
import { getFavourite } from '../services/api';
import { useNavigate } from 'react-router-dom';

interface FavoriteMoviesTabProps {
  userId: string; // ID người dùng
}

const FavoriteMoviesTab: React.FC<FavoriteMoviesTabProps> = ({ userId }) => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const data = await getFavourite(Number(userId)); // Gọi API lấy danh sách yêu thích
        setFavorites(data); // Lưu danh sách yêu thích
      } catch (err) {
        console.error('Error fetching favorites:', err);
        setFavorites([]); // Nếu có lỗi, đặt favorites là mảng rỗng
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      loadFavorites();
    }
  }, [userId]);

 return (
    <div style={{ padding: '20px' }}>
      <h2
        style={{
          color: 'white',
          marginBottom: '20px',
          textAlign: 'center',
          fontSize: '24px',
          fontWeight: 'bold',
        }}
      >
        Danh sách yêu thích
      </h2>
      {favorites.length === 0 ? (
        <p style={{ color: 'white', textAlign: 'center', fontSize: '18px' }}>
          Không có phim yêu thích.
        </p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '20px',
          }}
        >
          {favorites.map((item) => (
            <div
              key={item.tmdb_id}
              style={{
                position: 'relative',
                backgroundColor: '#1c1c1c',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 8px 15px rgba(0, 0, 0, 0.3)',
                transition: 'transform 0.3s ease',
                cursor: 'pointer',
              }}
              onClick={() => navigate(`/movie/${item.tmdb_id}`)} // Điều hướng đến trang chi tiết phim
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <div
                style={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                }}
              >
                <img
                  src={item.banner || '/default-banner.jpg'}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover', // Đảm bảo ảnh phủ đầy khung
                  }}
                />
              </div>
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
                <h4
                  style={{
                    fontSize: '16px',
                    marginBottom: '5px',
                    fontWeight: 'bold',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap', // Giới hạn tiêu đề trong 1 dòng
                  }}
                >
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export default FavoriteMoviesTab;
