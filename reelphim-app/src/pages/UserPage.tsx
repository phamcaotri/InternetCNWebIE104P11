import React, { useState, useEffect  } from 'react'; 
import { logoutUser, getUserId, uploadAvatar, getUserAva, updateUserProfile } from '../services/api'; // Hàm gọi API lấy lịch sử xem
import WatchHistoryTab from '../components/WatchHistoryTab';
import FavoriteMoviesTab from '../components/favouriteTab';
import CustomModal from '../components/modal';

const UserPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Tài khoản và Cài đặt');
    const [watchingHistory, setWatchingHistory] = useState<any[]>([]);
    const [userId, setUserId] = useState<string | null>(null); // Thêm state cho userId
    const [profilePhotoURL, setProfilePhotoURL] = useState<string>('https://via.placeholder.com/150');
    const [userName, setUserName] = useState<string>('Anna'); // Tên người dùng
    const [userEmail, setUserEmail] = useState<string>('nhata137@gmail.com'); // Email
    const [userPhone, setUserPhone] = useState<string>('+84 869591047'); // Số điện thoại
    const [userPassword, setUserPassword] = useState<string>('•••••••'); // Mật khẩu
    const [showPassword, setShowPassword] = useState<boolean>(false); // Trạng thái hiển thị mật khẩu    
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [updateType, setUpdateType] = useState<string>('');
    const [newValue, setNewValue] = useState<string>('');

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            // Gọi API lấy userId
            const id = await getUserId();
            if (!id) {
              console.error('Không thể lấy userId');
              return;
            }
            setUserId(id);
      
            const userAva = await getUserAva(); 
            setProfilePhotoURL(userAva.profile_photo_url || 'https://via.placeholder.com/150');
            setUserName(userAva.name || 'Anna');
            setUserEmail(userAva.email || 'email@example.com');
            setUserPhone(userAva.phone_number || '+84 000000000');
            setUserPassword('•••••••'); // Không lưu mật khẩu thực tế
          } catch (error) {
            console.error('Không thể lấy Avatar User:', error);
          }
        };
      
        fetchUserData(); 
      }, []);
      
    const tabs = ['Tài khoản và Cài đặt', 'Yêu thích', 'Đang xem'];

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

   const handleLogout = async () => {
        try {
            await logoutUser(); // Call the logout API
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = '/welcome'; // Redirect to the welcome page
        } catch (error: any) {
            console.error('Logout failed:', error.response?.data || error.message);
            alert('Failed to log out. Please try again.');
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Lấy file từ input
        if (!file) {
          alert('Vui lòng chọn một file hợp lệ!');
          return;
        }
      
        // Kiểm tra loại file
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
          alert('Chỉ cho phép upload các file ảnh (PNG, JPEG, JPG, WebP)!');
          return;
        }
      
        // Kiểm tra kích thước file (ví dụ: 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
          alert('File quá lớn, vui lòng chọn file dưới 2MB!');
          return;
        }
      
        try {
            const publicURL = await uploadAvatar(Number(userId), file);
            alert('Cập nhật ảnh đại diện thành công!');
            setProfilePhotoURL(publicURL); // Cập nhật URL ảnh đại diện
          } catch (error) {
            console.error('Lỗi khi cập nhật ảnh đại diện:', error);
            alert('Không thể cập nhật ảnh đại diện, vui lòng thử lại sau.');
          }
      };

      const handleUpdateClick = (type: string) => {
        setUpdateType(type);
        setModalOpen(true); // Hiển thị modal
    };
         
    const handleSave = async () => {
        if (!newValue) {
            alert('Vui lòng nhập giá trị mới!');
            return;
        }

        try {
            const updates: Record<string, string> = {};
            updates[updateType] = newValue;

            const updatedUser = await updateUserProfile(updates);

            // Cập nhật UI
            if (updatedUser.success) {
                // API trả về thành công nhưng không có `data`
                if (updateType === "name") setUserName(newValue);
                if (updateType === "email") setUserEmail(newValue);
                if (updateType === "phone") setUserPhone(newValue);
                if (updateType === "password") setUserPassword("•••••••");
          
                alert(updatedUser.message || "Cập nhật thành công!");
              } else {
                throw new Error(updatedUser.message || "Lỗi không xác định");
              }
          
              setModalOpen(false);
        } catch (error) {
            console.error('Error updating user profile:', error);
            alert('Không thể cập nhật thông tin, vui lòng thử lại sau.');
        }
    };

      
    
    const styles: Record<string, React.CSSProperties> = {
        rowContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '5px 0',
        },
        labelColumn: {
            flex: 1,
            textAlign: 'left',
            fontWeight: 'bold',
            marginRight: '10px',
        },
        valueColumn: {
            flex: 2,
            textAlign: 'left',
        },
        actionColumn: {
            flex: 1,
            textAlign: 'right',
        },
        actionLink: {
            color: '#ff4500',
            cursor: 'pointer',
            textDecoration: 'none',
        },
        tabContent: {
            marginTop: '20px',
            textAlign: 'center',
        },
        placeholderImage: {
            width: '150px',
            height: '150px',
            marginBottom: '20px',
        },
        placeholderButton: {
            padding: '10px 20px',
            backgroundColor: '#ff4500',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        },
        largeImage: {
            marginTop: '40px', // Giảm khoảng cách phía dưới
            width: '250px', // Giảm kích thước để cân đối
            height: '250px',
            objectFit: 'cover',
            marginBottom: '15px', // Giảm khoảng cách phía dưới
            margin: '0 auto', // Đảm bảo căn giữa
        },
        button: {
            padding: '10px 25px', // Thu nhỏ button
            backgroundColor: '#ff4500',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '15px', // Giảm font-size
            margin: '0 auto', // Căn giữa
            display: 'block', // Đảm bảo button căn giữa
        },
        description: {
            fontSize: '16px', // Giảm font-size để cân đối
            color: '#ccc',
            marginBottom: '10px', // Giảm khoảng cách phía dưới
            textAlign: 'center',
        },
        logoutButton: {
            padding: '10px 25px',
            backgroundColor: '#ff4500',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '15px',
            marginTop: '20px', // Thêm khoảng cách trên
            alignSelf: 'center', // Căn giữa
        }
        ,
        userPage: {
            width: '100%',
            minHeight: '100vh',
            color: 'white',
            fontFamily: 'Arial, sans-serif',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
        },
        profileSection: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: '20px',
        },
        profileImage: {
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            marginBottom: '10px',
            border: '5px solid black',
            cursor: 'pointer',
        },
        tabsContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '30px',
            paddingBottom: '10px',
            width: '100%',
            maxWidth: '600px',
        },
        tab: {
            padding: '10px 20px',
            cursor: 'pointer',
            color: 'white',
            fontWeight: 'bold',
            textDecoration: 'none',
            textAlign: 'center',
        },
        activeTab: {
            color: '#ff4500',
            borderBottom: '2px solid #ff4500',
        },
        contentContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            width: '100%',
            maxWidth: '1200px',
            marginTop: '20px',
            textAlign: 'center',
        },
        fileInputContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
        },
        fileInputLabel: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            borderRadius: '8px',
        },
        fileInput: {
            display: 'none',
        },
    };
    

    const renderContent = () => {
        switch (activeTab) {
            case 'Tài khoản và Cài đặt':
                return (
                    <div style={styles.contentContainer}>
                        {/* Chủ tài khoản */}
                        <div style={styles.rowContainer}>
                            <div style={styles.labelColumn}>Chủ tài khoản:</div>
                            <div style={styles.valueColumn}>{userName}</div>
                            <div style={styles.actionColumn}>
                                <button
                                    onClick={() => handleUpdateClick('name')}
                                    style={styles.actionLink}
                                >
                                    Đổi tên
                                </button>
                            </div>
                        </div>
                        {/* Email */}
                        <div style={styles.rowContainer}>
                            <div style={styles.labelColumn}>Email:</div>
                            <div style={styles.valueColumn}>{userEmail}</div>
                            <div style={styles.actionColumn}>
                                <button
                                    onClick={() => handleUpdateClick('email')}
                                    style={styles.actionLink}
                                >
                                    Đổi email
                                </button>
                            </div>
                        </div>
                        {/* Số điện thoại */}
                        <div style={styles.rowContainer}>
                            <div style={styles.labelColumn}>Số điện thoại:</div>
                            <div style={styles.valueColumn}>{userPhone}</div>
                            <div style={styles.actionColumn}>
                                <button
                                    onClick={() => handleUpdateClick('phone')}
                                    style={styles.actionLink}
                                >
                                    Đổi số
                                </button>
                            </div>
                        </div>
                        {/* Mật khẩu */}
                        <div style={styles.rowContainer}>
                            <div style={styles.labelColumn}>Mật khẩu:</div>
                            <div style={styles.valueColumn}>
                                {showPassword ? userPassword : '•••••••'}
                            </div>
                            <div style={styles.actionColumn}>
                                <button
                                    onClick={() => handleUpdateClick('password')}
                                    style={styles.actionLink}
                                >
                                    Đổi mật khẩu
                                </button>
                            </div>
                        </div>    
                                    {/* Modal */}
                        <CustomModal
                            isOpen={isModalOpen}
                            onClose={() => setModalOpen(false)}
                            onSave={handleSave}
                            title={`Cập nhật ${updateType === 'name' ? 'Tên' : updateType === 'email' ? 'Email' : updateType === 'phone' ? 'Số Điện Thoại' : 'Mật Khẩu'}`}
                        >
                            <input
                                type="text"
                                className="mt-4 w-full rounded border p-2 text-sm text-black bg-white focus:border-green-500 focus:ring focus:ring-green-300"
                                value={newValue}
                                onChange={(e) => setNewValue(e.target.value)}
                                placeholder={`Nhập ${updateType === 'name' ? 'tên mới' : updateType === 'email' ? 'email mới' : updateType === 'phone' ? 'số điện thoại mới' : 'mật khẩu mới'}`}
                            />
                        </CustomModal>            
                        {/* Nút Đăng xuất */}
                        <div style={{ ...styles.rowContainer, justifyContent: 'center', marginTop: '20px' }}>
                            <button style={styles.logoutButton} onClick={handleLogout}>
                                Đăng xuất
                            </button>
                        </div>
                    </div>
                );
            case 'Yêu thích':
                return (
                    <div style={styles.contentContainer}>
                    {userId ? <FavoriteMoviesTab userId={userId!} /> : <p>Đang tải dữ liệu...</p>}
                </div>
                );
                case 'Đang xem':
                    return (
                        <div style={styles.contentContainer}>
                            {userId ? <WatchHistoryTab userId={userId!} /> : <p>Đang tải dữ liệu...</p>}
                        </div>
                    );
            default:
                return null;
        }
    };

    return (
        <div style={styles.userPage}>
        <div style={styles.fileInputContainer}>
            <label htmlFor="dropzone-file" style={styles.fileInputLabel}>
            <div style={styles.profileSection}>
                <img src={profilePhotoURL} alt="Profile" style={styles.profileImage} />
                <h1>Chào mừng bạn, {userName}</h1>
            </div>
            <input id="dropzone-file" type="file" style={styles.fileInput} onChange={handleFileChange} />
            </label>
        </div>
            {/* Tabs */}
            <div style={styles.tabsContainer}>
                {tabs.map((tab) => (
                    <a
                        key={tab}
                        onClick={() => handleTabClick(tab)}
                        style={{
                            ...styles.tab,
                            ...(activeTab === tab ? styles.activeTab : {}),
                        }}
                    >
                        {tab}
                    </a>
                ))}
            </div>

            {/* Content */}
            {renderContent()}
        </div>
    );
};

export default UserPage;
