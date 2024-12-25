import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Kiểm tra trạng thái đăng nhập bằng token

  return isAuthenticated ? (
    <>{children}</> // Hiển thị nội dung nếu đã đăng nhập
  ) : (
    <Navigate to="/welcome" replace /> // Chuyển hướng về trang đăng nhập
  );
};


const PublicRoute: React.FC = () => {
  const authToken = localStorage.getItem('authToken'); // Kiểm tra trạng thái đăng nhập

  if (authToken) {
    // Đã đăng nhập, chuyển hướng về trang Home
    return <Navigate to="/home" replace />;
  }

  // Chưa đăng nhập, hiển thị nội dung route
  return <Outlet />;
};

export default { PrivateRoute, PublicRoute };

