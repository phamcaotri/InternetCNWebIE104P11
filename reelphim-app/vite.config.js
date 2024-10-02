import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname, 'app'), // Đặt thư mục gốc là 'app'
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, 'dist'), // Đặt thư mục đầu ra là 'dist'
  },
  server: {
    port: 3000, // Đặt cổng máy chủ phát triển
  },
});