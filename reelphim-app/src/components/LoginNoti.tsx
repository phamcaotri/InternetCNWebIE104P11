import React, { useEffect } from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000); // Ẩn thông báo sau 5 giây
    return () => clearTimeout(timer); // Xóa bộ hẹn giờ khi component bị hủy
  }, [onClose]);

  return (
    <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg 
      ${type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
      {message}
      <button onClick={onClose} className="ml-4 text-lg font-bold">X</button>
    </div>
  );
};

export default Notification;
