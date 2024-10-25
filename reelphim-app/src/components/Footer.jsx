import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG, NAVIGATION } from '../config/siteConfig';

const Footer = () => {
  return (
    <footer className="bg-secondary w-full mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{SITE_CONFIG.NAME}</h3>
            <p className="text-text-muted">{SITE_CONFIG.DESCRIPTION}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Liên kết</h4>
            <ul className="space-y-2">
              {NAVIGATION.FOOTER_LINKS.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="hover:text-primary-hover">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Liên hệ</h4>
            <p>Email: {SITE_CONFIG.CONTACT_EMAIL}</p>
            <p>Điện thoại: {SITE_CONFIG.SUPPORT_PHONE}</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-text-muted">
          <p>{SITE_CONFIG.COPYRIGHT}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;