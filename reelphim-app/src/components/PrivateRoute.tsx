import React from 'react';

const PrivateRoute = ({ children }) => {
  /** @author @phantruowngthanhtrung
   * Định nghĩa PrivateRoute:
   * - Kiểm tra xem người dùng đã đăng nhập chưa
   * - Nếu chưa, chuyển hướng đến trang đăng nhập
   * - Nếu rồi, cho phép truy cập vào các trang riêng tư
   */
  // Temporarily allow access to all private routes
  return children;
};

export default PrivateRoute;