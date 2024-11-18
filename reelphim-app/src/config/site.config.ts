export const SITE_CONFIG = {
    NAME: 'Reelphim',
    LOGO: '/src/assets/logo.png',
    TAGLINE: 'Trải nghiệm điện ảnh tuyệt vời',
    DESCRIPTION: 'Reelphim là nền tảng xem phim trực tuyến hàng đầu với đa dạng thể loại phim và series TV.',
    COPYRIGHT: '© 2024 Reelphim. Tất cả quyền được bảo lưu.',
    SOCIAL_LINKS: {
      FACEBOOK: 'https://facebook.com/reelphim',
      TWITTER: 'https://twitter.com/reelphim',
      INSTAGRAM: 'https://instagram.com/reelphim',
    },
    CONTACT_EMAIL: 'support@reelphim.com',
    SUPPORT_PHONE: '+84 123 456 789',
    LANGUAGE: 'vi-VN',
    DEFAULT_LANGUAGE: 'vi',
    OTHER_LANGUAGES: ['en', 'null'],
    HIDE_MEDIA_WITHOUT_METADATA: true,
  };
  
  export const NAVIGATION = {
    MAIN_MENU: [
      { name: 'Trang chủ', path: '/home' },
      { name: 'Phim lẻ', path: '/movies' },
      { name: 'Phim bộ', path: '/tv-shows' },
      { name: 'Thể loại', path: '/genres' },
    ],
    FOOTER_LINKS: [
      { name: 'Về chúng tôi', path: '/about' },
      { name: 'Điều khoản sử dụng', path: '/terms' },
      { name: 'Chính sách bảo mật', path: '/privacy' },
      { name: 'Liên hệ', path: '/contact' },
    ],
  };