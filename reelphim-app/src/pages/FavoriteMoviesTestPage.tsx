import React, { useState, useEffect } from 'react';
import FavoriteMoviesTab from '../components/favouriteTab'; // Đường dẫn đến component của bạn
import { getUserId } from '../services/api'; // Hàm lấy userId

const FavoriteMoviesTestPage: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId();
      setUserId(id);
    };

    fetchUserId();
  }, []);

  return (
    <div style={{ backgroundColor: '#1c1c1c', minHeight: '100vh', padding: '20px', color: 'white' }}>
      <h1 style={{ textAlign: 'center', fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>
        Test Favorite Movies Tab
      </h1>
      {userId ? (
        <FavoriteMoviesTab userId={userId} />
      ) : (
        <p style={{ textAlign: 'center', fontSize: '18px' }}>Đang tải userId...</p>
      )}
    </div>
  );
};

export default FavoriteMoviesTestPage;
