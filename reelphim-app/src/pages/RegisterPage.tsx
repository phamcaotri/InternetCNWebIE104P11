import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/movie_poster_background.jpg';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registration attempt with:', { name, email, password, confirmPassword });
    
    // Assuming registration is successful
    navigate('/login');
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
            Create an Account
          </h2>
          <p className="mt-2 text-sm text-text-muted">
            Join ReelPhim for unlimited entertainment
          </p>
        </div>
        <form className="mt-8 space-y-10" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="input-field w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 
                  focus:ring-2 focus:ring-red-500 focus:border-red-500 
                  transition-colors text-white placeholder-gray-400
                  hover:border-red-200 caret-red-500 selection:bg-red-500/30"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
                className="input-field w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 
                  focus:ring-2 focus:ring-red-500 focus:border-red-500 
                  transition-colors text-white placeholder-gray-400
                  hover:border-red-200 caret-red-500 selection:bg-red-500/30 top-2"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="input-field w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 
                  focus:ring-2 focus:ring-red-500 focus:border-red-500 
                  transition-colors text-white placeholder-gray-400
                  hover:border-red-200 caret-red-500 selection:bg-red-500/30 top-4"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                className="input-field w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 
                  focus:ring-2 focus:ring-red-500 focus:border-red-500 
                  transition-colors text-white placeholder-gray-400
                  hover:border-red-200 caret-red-500 selection:bg-red-500/30 top-6"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="btn-primary w-full py-2.5 rounded-lg text-lg font-semibold"
            >
              Create Account
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          <Link to="/login" className="btn-tertiary">
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;