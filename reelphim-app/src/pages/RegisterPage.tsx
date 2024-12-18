import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/01.webp';
import { registerUser } from '../services/api'; // Kết nối API đăng ký

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState(''); // Trạng thái lỗi

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Kiểm tra mật khẩu và xác nhận mật khẩu
    if (password !== confirmPassword) {
      setError('Mật khẩu không khớp!');
      return;
    }

    if (password !== confirmPassword) {
      setError('Ban chưa chấp nhận điều khoản và điều kiện!');
      return;
    }

    try {
      const userData = { name, email, password };
      const response = await registerUser(userData); // Gửi dữ liệu người dùng đến backend
      console.log('Đăng ký thành công:', response);
      navigate('/login'); // Chuyển hướng người dùng đến trang đăng nhập
    } catch (error) {
      setError(error.response?.data?.message || 'Đăng ký thất bại'); // Hiển thị lỗi từ backend
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
      <div className="form-container relative z-20 bg-gray p-10 rounded-lg shadow-lg max-w-4xl w-full">
      <div className="text-center mb-6">

          <h2 className="text-3xl font-bold text-white">Chào mừng đến với Reelphim!</h2>
          <p className="mt-2 text-sm text-text-muted">Hãy điền vào các ô bên dưới để cùng bắt đầu nhé</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Tên của bạn *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="input-field block w-full px-4 py-2 bg-gray-800 text-white placeholder-gray-500 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Full Name"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                />
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Địa chỉ email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="input-field block w-full px-4 py-2 bg-gray-800 text-white placeholder-gray-500 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Email address"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password *
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="input-field block w-full px-4 py-2 bg-gray-800 text-white placeholder-gray-500 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300 mb-1">
                Confirm Password *
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                className="input-field block w-full px-4 py-2 bg-gray-800 text-white placeholder-gray-500 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Hiển thị lỗi nếu có */}
          {error && (
            <div className="text-red-500 text-sm font-medium mt-2">
              {error}
            </div>
          )}

          {/* Terms and Conditions */}
          <div className="flex items-center mt-4">
            <input
              id="accept-terms"
              name="accept-terms"
              type="checkbox"
              required
              className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-600 rounded"
              checked={acceptTerms}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAcceptTerms(e.target.checked)}

            />
            <label htmlFor="accept-terms" className="ml-2 text-sm text-gray-300">
              Tôi đã đọc các{' '}
              <span className="text-red-500 underline cursor-pointer">
                điều khoản & điều kiện
              </span>
              *
            </label>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="btn-primary w-1/2 mx-auto py-3 bg-red-1000 text-white font-semibold text-lg rounded-lg hover:bg-red-1000 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
              ĐĂNG KÝ
            </button>
          </div>
        </form>
        <div className="text-sm text-center mt-4">
          <Link to="/login" className="text-gray-300">
            Bạn đã có tài khoản Reelphim?{' '}
            <span className="text-red-500 underline">Quay về trang đăng nhập</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;