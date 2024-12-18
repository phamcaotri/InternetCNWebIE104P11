import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/01.webp';
import logoReelphim from '../assets/logoreelphim.png';
import { Eye, EyeOff } from 'lucide-react';
import { loginUser } from '../services/api'; 
import Notification from '../components/LoginNoti'; // Thêm component Notification

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState('');

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError(''); // Reset lỗi trước khi gửi

  try {
    const userData = { email, password };
    const response = await loginUser(userData); // Gửi thông tin đăng nhập đến backend
    console.log('Đăng nhập thành công:', response);

    // Lưu JWT token vào localStorage
    localStorage.setItem('authToken', response.token);

    // Hiển thị thông báo thành công
    setNotification('Đăng nhập thành công!');

    // Điều hướng người dùng đến trang chính (HomePage)
    const { state } = location;
    navigate(state?.from || '/Home');
  } catch (error: any) {
    setError(error.response?.data?.message || 'Đăng nhập thất bại'); // Hiển thị lỗi từ backend
  } finally {
    setLoading(false); // Dù thành công hay thất bại, tắt loading
  }

};

return (
  <div className="min-h-screen flex items-center justify-center relative">
    <div 
      className="absolute inset-0 bg-cover bg-center z-0"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    ></div>
    <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
    <div className="form-container">
      <div className="text-center">
      <img 
        src={logoReelphim}
        className="mt-2 mx-auto max-w-[150px] h-auto"/>
      <h2 className="mt-6 text-2xl font-bold text-text">
          Chào mừng trở lại với Reelphim!
      </h2>
      </div>

      {notification && (
        <Notification 
          message={notification} 
          type="success" 
          onClose={() => setNotification('')} 
        />
      )}

      {error && <p className="text-red-500 text-center mb-4">{error}</p>} 

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm space-y-4">
          <div>
            <input
              id="email-address"
              name="email"
              type="email"
              required
              className="block w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              className="block w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg pr-12"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div>
          <button type="submit" className="btn-primary w-full py-2.5">
            {loading ? 'Loading...' : 'Sign in'}
          </button>
        </div>
      </form>

      <div className="text-sm text-center">
        <Link to="/register" className="btn-tertiary">
          Don't have an account? Sign up
        </Link>
      </div>
    </div>
  </div>
);
};

export default LoginPage;