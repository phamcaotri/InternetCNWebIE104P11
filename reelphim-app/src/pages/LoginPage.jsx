import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/movie_poster_background.jpg';
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
          <h2 className="mt-6 text-4xl font-extrabold text-text">
            Sign in to ReelPhim
          </h2>
          <p className="mt-2 text-sm text-text-muted">
            Your gateway to endless entertainment
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="input-field w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 
                  focus:ring-2 focus:ring-red-500 focus:border-red-500 
                  transition-colors text-white placeholder-gray-400
                  hover:border-red-200 caret-red-500 selection:bg-red-500/30 bottom-3"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='relative'>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="input-field w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 
                  focus:ring-2 focus:ring-red-500 focus:border-red-500 
                  transition-colors text-white placeholder-gray-400
                  hover:border-red-200 caret-red-500 selection:bg-red-500/30 pr-12"
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
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
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
              className="btn-primary"
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