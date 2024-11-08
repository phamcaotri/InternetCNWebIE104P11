# Cấu trúc thư mục dự án Reelphim

## Tổng quan
Reelphim là một ứng dụng web xem phim trực tuyến được xây dựng bằng React + Vite. Dự án sử dụng TailwindCSS cho styling và được tổ chức theo cấu trúc module.

## Cấu trúc thư mục
``` text
reelphim-app/
├── src/
│   ├── assets/         # Chứa tài nguyên tĩnh (hình ảnh, logo)
│   ├── components/     # Components tái sử dụng
│   ├── config/         # Cấu hình ứng dụng
│   ├── constants/      # Các hằng số
│   ├── contexts/       # React contexts
│   ├── data/          # Dữ liệu mẫu
│   ├── hooks/         # Custom hooks
│   ├── layouts/       # Layout components
│   ├── pages/         # Các trang của ứng dụng
│   ├── services/      # Các service gọi API
│   ├── transforms/    # Transform data
│   ├── types/         # TypeScript types
│   ├── fonts/         # Font chữ
│   ├── App.tsx        # Component gốc
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
- **MovieCard.tsx**: Hiển thị thông tin phim
- **MovieGrid.tsx**: Grid layout cho danh sách phim với tính năng drag-to-scroll
- **MovieSection.jsx**: Section hiển thị nhóm phim
- **Search.jsx**: Component tìm kiếm
- **PrivateRoute.jsx**: Route bảo vệ cho người dùng đã đăng nhập

### Services (`/src/services`)
- **tmdb.service.ts**: Service gọi API từ TMDB
- **auth.service.ts**: Service xử lý authentication

### Transforms (`/src/transforms`)
- **movie.transform.ts**: Transform data từ TMDB API sang định dạng ứng dụng

### Types (`/src/types`)
- **movie.types.ts**: TypeScript interfaces cho movie data
- **auth.types.ts**: TypeScript interfaces cho authentication

### Configuration (`/src/config`)
- **tmdb.config.ts**: Cấu hình cho TMDB API
- **siteConfig.ts**: Cấu hình chung của website
  - Thông tin website
  - Navigation links
  - Thông tin liên hệ

### Styling
- Sử dụng TailwindCSS
- Custom theme trong `tailwind.config.js`
  - Colors: primary, secondary, accent, background, text
  - Font family: Reelphim (Overpass)
- Utility classes trong `index.css`
  - Input fields
  - Buttons
  - Form containers
  - Scrollbar hiding

## API Integration
- Sử dụng TMDB API cho dữ liệu phim
- React Query cho state management và caching
- Custom hooks cho data fetching
- Transform layer để chuẩn hóa data

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

# Giải quyết một số lỗi
- Nếu sau khi đã chạy `npm run dev` và bị hiện lỗi tương tự như ` Could not resolve "../createLucideIcon.js"`, hãy chạy lệnh `npm uninstall lucide-react` rồi `npm install lucide-react` rồi chạy lại lệnh `npm run dev`
