import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary w-full mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Reelphim</h3>
              <p className="text-text-muted">Trang web xem phim trực tuyến hàng đầu</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Liên kết</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-primary-hover">Trang chủ</Link></li>
                <li><Link to="/genres" className="hover:text-primary-hover">Thể loại</Link></li>
                <li><Link to="#" className="hover:text-primary-hover">Danh sách lưu</Link></li>
                <li><Link to="#" className="hover:text-primary-hover">Về chúng tôi</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Theo dõi chúng tôi</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-text-muted hover:text-primary-hover">
                  <Facebook size={24} />
                </a>
                <a href="#" className="text-text-muted hover:text-primary-hover">
                  <Twitter size={24} />
                </a>
                <a href="#" className="text-text-muted hover:text-primary-hover">
                  <Instagram size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-text-muted">
            <p>&copy; 2024 Reelphim. Tất cả các quyền được bảo lưu.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;