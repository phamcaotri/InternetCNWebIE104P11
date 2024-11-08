import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG, NAVIGATION } from '../config/site.config';

const Footer = () => {
  /** @author @phantruowngthanhtrung
   * Định ngĩa nội dung của Footer:
   * - Thông tin liên hệ
   * Lấy thông tin từ file siteConfig.ts
   * - Liên kết
   * Lấy thông tin từ file index.d.ts
   */
  return (
    <footer className="bg-background text-text w-full mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{SITE_CONFIG.NAME}</h3>
            <p className="text-text-muted">{SITE_CONFIG.DESCRIPTION}</p>
            <div>
              <ModeButton />
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Liên kết</h4>
            <ul className="space-y-2">
              {NAVIGATION.FOOTER_LINKS.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="text-text hover:text-primary-hover">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Liên hệ</h4>
            <p className="text-text">Email: {SITE_CONFIG.CONTACT_EMAIL}</p>
            <p className="text-text">Điện thoại: {SITE_CONFIG.SUPPORT_PHONE}</p>
          </div>

        </div>
        <div className="mt-8 pt-8 border-t border-secondary text-center text-text-muted">
          <p>{SITE_CONFIG.COPYRIGHT}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;