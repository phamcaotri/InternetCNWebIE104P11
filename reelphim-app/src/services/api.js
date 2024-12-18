import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL; // URL backend từ file .env

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Lỗi đăng ký:', error.response?.data || error.message);
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await api.post('/auth/login', userData);
    return response.data; // Trả về dữ liệu của người dùng
  } catch (error) {
    console.error('Lỗi đăng nhập:', error.response?.data || error.message);
    throw error;
  }
};

export default api;
