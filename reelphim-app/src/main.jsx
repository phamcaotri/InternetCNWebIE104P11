// MAIN.JSX VUI LÒNG KHÔNG CHỈNH SỬA FILE NÀY CHO CÁC TÍNH NĂNG CỦA WEB.
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './fonts.css';

// Import Supabase Provider (nếu có)
import { SupabaseProvider } from './contexts/SupabaseProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SupabaseProvider>
      <App />
    </SupabaseProvider>
  </StrictMode>,
);
