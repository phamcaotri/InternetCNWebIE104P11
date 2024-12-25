// MAIN.JSX VUI LÒNG KHÔNG CHỈNH SỬA FILE NÀY CHO CÁC TÍNH NĂNG CỦA WEB.
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import './fonts.css';

createRoot(document.getElementById('root')).render(
  <App />
);
