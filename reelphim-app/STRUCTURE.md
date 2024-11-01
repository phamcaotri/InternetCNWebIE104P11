# Cấu trúc thư mục dự án Reelphim

## Tổng quan
Reelphim là một ứng dụng web xem phim trực tuyến được xây dựng bằng React + Vite. Dự án sử dụng TailwindCSS cho styling và được tổ chức theo cấu trúc module.

## Cấu trúc thư mục

reelphim-app/
├── src/
│   ├── assets/         # Chứa tài nguyên tĩnh (hình ảnh, logo)
│   ├── components/     # Components tái sử dụng
│   ├── config/         # Cấu hình ứng dụng
│   ├── contexts/       # React contexts
│   ├── data/          # Dữ liệu mẫu
│   ├── hooks/         # Custom hooks
│   ├── layouts/       # Layout components
│   ├── pages/         # Các trang của ứng dụng
│   ├── fonts/         # Font chữ
│   ├── App.jsx        # Component gốc
│   ├── main.jsx       # Entry point
│   └── index.css      # Global styles
├── public/            # Tài nguyên công khai
├── package.json       # Dependencies và scripts
└── node_modules/      # Thư mục chứa các dependencies

## Chi tiết các thành phần chính

### Components (`/src/components`)
- **Header.jsx**: Navigation bar và tìm kiếm
- **Footer.jsx**: Thông tin liên hệ và links
- **MovieCard.jsx**: Hiển thị thông tin phim
- **MovieGrid.jsx**: Grid layout cho danh sách phim
- **MovieSection.jsx**: Section hiển thị nhóm phim
- **Search.jsx**: Component tìm kiếm
- **PrivateRoute.jsx**: Route bảo vệ cho người dùng đã đăng nhập

### Pages (`/src/pages`)
- **HomePage.jsx**: Trang chủ
- **MoviesPage.jsx**: Danh sách phim lẻ
- **TVShowsPage.jsx**: Danh sách phim bộ
- **GenrePage.jsx**: Thể loại phim
- **MovieDetailPage.jsx**: Chi tiết phim
- **SearchResultsPage.jsx**: Kết quả tìm kiếm
- **WelcomePage.jsx**: Trang chào mừng
- **LoginPage.jsx**: Trang đăng nhập
- **RegisterPage.jsx**: Trang đăng ký

### Contexts (`/src/contexts`)
- **AuthContext.jsx**: Quản lý trạng thái đăng nhập

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
7. Xác thực người dùng (đăng nhập/đăng ký)

## Hướng dẫn sử dụng
1. Clone repository
2. Vào thư mục project: `cd reelphim-app`
3. Cài đặt dependencies: `npm install`
4. Chạy development server: `npm run dev`
5. Build production: `npm run build`

# Quy tắc phát triển dự án
## Quy tắc sử dụng Git
- Ghi rõ lý do commit
- Tạo một branch mới từ main và đặt theo tên của mình
- Commit và push lên branch của mình
- Chỉ khi xong 1 task thì Merge vào main và giải quyết conflict nếu có

## Quy tắc thêm tính năng mới
- Trang web được cấu trúc thành nhiều module tái sử dụng. Mỗi module có cùng chức năng sẽ được đặt ở một thư mục riêng (được trình bày ở trên). Tuân thủ quy tắc này và không viết trực tiếp module vào `App.jsx` cũng như các module khác.
- Không dùng css bừa bãi. Bảng màu đã được định nghĩa sẵn ở `tailwind.config.js`, nên chỉ được phép sử dụng, thay đổi các màu đã được định nghĩa trong đó. Các component có css tái sử dụng phải dùng css tái sử dụng.
- Đối với css, các css tái sử dụng được đặt trong `index.css`. Còn lại những css dùng 1 lần ghi trực tiếp vào trong file đó.
