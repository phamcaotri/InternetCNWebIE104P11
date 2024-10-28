# Cấu trúc thư mục dự án Reelphim

## Tổng quan
Reelphim là một ứng dụng web xem phim trực tuyến được xây dựng bằng React + Vite. Dự án sử dụng TailwindCSS cho styling và được tổ chức theo cấu trúc module.

## Cấu trúc thư mục

```
reelphim-app/
├── src/
│   ├── assets/         # Chứa tài nguyên tĩnh (hình ảnh, logo)
│   ├── components/     # Components tái sử dụng
│   ├── config/         # Cấu hình ứng dụng
│   ├── data/          # Dữ liệu mẫu
│   ├── hooks/         # Custom hooks
│   ├── pages/         # Các trang của ứng dụng
│   ├── fonts/         # Font chữ
│   ├── App.jsx        # Component gốc
│   ├── main.jsx       # Entry point
│   └── index.css      # Global styles
├── public/            # Tài nguyên công khai
├── package.json       # Dependencies và scripts
└── node_modules/      # Thư mục chứa các dependencies
```

## Chi tiết các thành phần chính

### Components (`/src/components`)
- **Header.jsx**: Navigation bar và tìm kiếm
- **Footer.jsx**: Thông tin liên hệ và links
- **MovieCard.jsx**: Hiển thị thông tin phim
- **MovieGrid.jsx**: Grid layout cho danh sách phim
- **MovieSection.jsx**: Section hiển thị nhóm phim
- **Search.jsx**: Component tìm kiếm

### Pages (`/src/pages`)
- **HomePage.jsx**: Trang chủ
- **MoviesPage.jsx**: Danh sách phim lẻ
- **TVShowsPage.jsx**: Danh sách phim bộ
- **GenrePage.jsx**: Thể loại phim
- **MovieDetailPage.jsx**: Chi tiết phim
- **SearchResultsPage.jsx**: Kết quả tìm kiếm
- **WelcomePage.jsx**: Trang chào mừng

### Configuration (`/src/config`)
- **siteConfig.js**: Cấu hình chung của website
  - Thông tin website
  - Navigation links
  - Thông tin liên hệ

### Data (`/src/data`)
- **homeData.js**: Dữ liệu cho trang chủ
- **movieData.js**: Dữ liệu phim lẻ
- **tvShowData.js**: Dữ liệu phim bộ
- **genreData.js**: Dữ liệu theo thể loại

### Hooks (`/src/hooks`)
- **useDragScroll.js**: Hook xử lý scroll bằng drag

### Styling
- Sử dụng TailwindCSS
- Custom theme trong `tailwind.config.js`
- Font chữ riêng được định nghĩa trong `fonts.css`

## Các tính năng chính
1. Xem danh sách phim theo nhiều tiêu chí
2. Tìm kiếm phim
3. Phân loại phim theo thể loại
4. Xem chi tiết phim
5. Responsive design
6. Drag-to-scroll UI

## Hướng dẫn sử dụng
1. Clone repository
2. Vào thư mục project: `cd reelphim-app`
3. Cài đặt dependencies: `npm install`
4. Chạy development server: `npm run dev`
5. Build production: `npm run build`

## Công nghệ sử dụng
- React 18
- Vite
- TailwindCSS
- React Router DOM
- Lucide React (icons)
