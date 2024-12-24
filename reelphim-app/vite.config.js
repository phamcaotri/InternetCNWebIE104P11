import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      buffer: 'buffer/',
      stream: 'stream-browserify',
      crypto: 'crypto-browserify'
    }
  },
  define: {
    'process.env': {},
    'global': 'globalThis',
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true, 
        secure: false, 
        rewrite: (path) => path.replace(/^\/api/, ''), 
      }
    }
  }
});
