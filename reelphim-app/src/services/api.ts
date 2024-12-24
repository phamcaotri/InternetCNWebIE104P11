import axios, { AxiosInstance } from 'axios';
const API_URL: string = 'http://localhost:5000/api';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Gửi token trong header
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken'); // Lấy token từ localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


interface UserData {
  username: string;
  email: string;
  password: string;
}

interface LoginUserData {
  email: string;
  password: string
}

interface UpdateUserData {
  [key: string]: any;
}


export const registerUser = async (userData: UserData): Promise<any> => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error: any) {
    console.error('Lỗi đăng ký:', error.response?.data || error.message);
    throw error;
  }
};

export const loginUser = async (userData: LoginUserData): Promise<any> => {
  try {
    const response = await api.post('/auth/login', userData);
    return response.data;
  } catch (error: any) {
    console.error('Lỗi đăng nhập:', error.response?.data || error.message);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.post('/auth/logout'); 
    return response.data;
  } catch (error: any) {
    console.error('Error during logout:', error.response?.data || error.message);
    throw error;
  }
};

export const getUserId = async (): Promise<string | null> => {
  try {
    const response = await api.get('/auth/getuserId', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Token từ localStorage
      },
    });
    return response.data.userId; 
  } catch (error) {
    console.error('Lỗi khi lấy userId:', error);
    return null;
  }
};

export const uploadAvatar = async (userId: number, file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('avatar', file);
  formData.append('userId', String(userId));

  try {
    const response = await api.post('/auth/updateProfilePhoto', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.publicURL;
  } catch (error) {
    console.error('Error uploading avatar:', error);
    throw new Error('Không thể upload ảnh. Vui lòng thử lại sau.');
  }
};

export const getUserAva = async (): Promise<any> => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Không tìm thấy token trong localStorage');
    }

    const response = await api.get('/auth/getUserAva', {
      headers: {
        Authorization: `Bearer ${token}`, // Gửi token trong header
      },
    });
    return response.data.user;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw new Error('Failed to fetch user info');
  }
};

export const updateUserProfile = async (updates: {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
}) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Không tìm thấy token trong localStorage');
  }

  try {
    const response = await api.post('/auth/updateUserProfile', updates, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật thông tin người dùng:', error);
    throw new Error('Cập nhật thông tin thất bại');
  }
};

// Hàm gọi API liên quan đến lịch sử xem
// Lưu hoặc cập nhật lịch sử xem
export const saveWatchHistory = async (data: any) => {
  console.log('Sending API request with data:', data);
  try {
    const response = await api.post('/history/saveHistory', data);
    return response.data;
  } catch (error: any) {
    console.error('Error in API request:', error.response?.data || error.message);
    throw error;
  }
};

// Lấy danh sách lịch sử xem
export const getWatchHistory = async (user_id: string) => {
  try {
    const response = await api.get('/history/loadHistory', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Token lấy từ localStorage
      },
    });
      return response.data;
  } catch (error: any) {
      console.error('Lỗi lấy lịch sử xem:', error.response?.data || error.message);
      throw error;
  }
};

// Hàm gọi API liên quan đến danh sách yêu thích
//Thêm phim yêu thích
export const addFavourite = async (userId, movieId, title, poster) => {
  const response = await api.post('/favourites/add', {
    userId,
    movieId,
    title,
    poster
  });
  return response.data;
};

export const removeFavourite = async (userId, movieId) => {
  const response = await api.delete('/favourites/remove', {
    data: {userId, movieId }
  });
  return response.data;
}

export const getFavourite = async (userId: number) => {
  try {
    const response = await api.get('/favourites/getfavour', {
      params: {userId}
    });
      return response.data;
  } catch (error: any) {
      console.error('Lỗi lấy thông tin yêu thích', error.response?.data || error.message);
      throw error;
  }
};

export const checkFavourite = async (userId: string, movieId: number) => {
  try {
    const response = await api.get('/favourites/check', {
      params: {userId, tmdbId: movieId}
    });
      return response.data;
  } catch (error: any) {
      console.error('Lỗi check thông tin yêu thích', error.response?.data || error.message);
      throw error;
  }
};

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authToken')}`;

export default api;