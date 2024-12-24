import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/01.webp';
import logoReelphim from '../assets/logoreelphim.png';

const WelcomePage = () => {
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
          alt="Chào mừng tới Reelphim" 
          className="mt-2 mx-auto max-w-[150px] h-auto"/>
          <p className="mt-6 text-sm text-text-muted">
            Điểm dến của những chương trình truyền hình, phim không giới hạn
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div>
            <Link
              to="/login"
              className="btn-primary"
            >
              Đăng nhập
            </Link>
          </div>
          <div>
            <Link
              to="/register"
              className="btn-secondary"
            >
              Không có? Tạo tài khoản?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;