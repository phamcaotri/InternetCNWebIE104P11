import React, { useState } from 'react';
import supabase from '../config/supabaseclient';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/01.webp';
import logoReelphim from '../assets/logoreelphim.png';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt with:', { email, password });
    
    // Assuming login is successful
    const { state } = location;
    if (state?.from) {
      navigate(state.from);
    } else {
      navigate('/home');
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
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email-address" className="sr-only">
              Địa chỉ email
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full px-4 py-3 bg-gray-800 text-white placeholder-gray-500 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <label htmlFor="password" className="sr-only">
              Mật khẩu
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              className="block w-full px-4 py-3 bg-gray-800 text-white placeholder-gray-500 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary pr-12"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2
              text-gray-400 hover:text-white focus:outline-none
              p-1 rounded-lg hover:bg-gray-700 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-secondary-gray rounded"
              />
              <label htmlFor="remember-me" 
               className="ml-2 block text-sm text-text-muted">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="btn-tertiary">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="btn-primary w-full py-2.5 rounded-lg text-lg font-semibold"
            >
              Sign in
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