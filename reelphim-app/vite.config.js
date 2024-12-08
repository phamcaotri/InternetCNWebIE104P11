import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      stream: 'stream-browserify',
      buffer: 'buffer/'
    }
  },
  define: {
    'process.env': {},
    'global': 'globalThis'
  },
  optimizeDeps: {
    include: ['webtorrent']
  },
  server: {
    host: '0.0.0.0',
    port: 3000
  }
});