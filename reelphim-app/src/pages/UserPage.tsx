import React, { useState } from 'react';

const UserPage: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [userInfo, setUserInfo] = useState({
        username: 'JohnDoe',
        email: 'johndoe@example.com',
        password: '********',
        contactInfo: '123-456-7890'
    });

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        // Save the updated user info here
    };

    const editableFieldStyle = {
        background: 'none',
        color: 'white',
        borderBottom: '1px solid white',
        border: 'none'
    };

    const styles = {
        userPage: {
            textAlign: 'center',
            padding: '20px'
        },
        banner: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px',
            position: 'relative'
        },
        bannerImage: {
            width: '100%',
            maxWidth: '1200px',
            height: 'auto'
        },
        content: {
            display: 'flex',
            justifyContent: 'space-between',
            textAlign: 'left'
        },
        column: {
            flex: 0.5,
            padding: '10px',
            marginTop: '-175px'
        },
        centralColumn: {
            flex: 2,
            padding: '10px',
            margin: '0 20px'
        },
        miniColumnsContainer: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        miniColumn: {
            flex: 1,
            padding: '10px'
        },
        nav: {
            listStyleType: 'none',
            padding: 0
        },
        navItem: {
            marginBottom: '10px'
        },
        profileSection: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '20px',
            position: 'relative',
            top: '-75px'
        },
        profileImage: {
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            marginBottom: '5px',
            border: '5px solid black'
        },
        section: {
            marginBottom: '20px'
        },
        userInfo: {
            position: 'relative',
            top: '-75px',
            marginTop: '10px'
        },
        editButton: {
            float: 'right',
            marginRight: '10px'
        }
        
    };

    return (
        <div style={styles.userPage}>
            <div style={styles.banner}>
                <img src="https://via.placeholder.com/1200x300" alt="Banner" style={styles.bannerImage} />
            </div>
            <div style={styles.profileSection}>
                <img src="https://via.placeholder.com/150" alt="Profile" style={styles.profileImage} />
                <h1>Chào mừng bạn, reelphim!</h1>
            </div>
            <div style={styles.content}>
                <div style={styles.column}>
                    <ul style={styles.nav}>
                        <li style={styles.navItem}><a href="#general">Cài đặt chung</a></li>
                        <li style={styles.navItem}><a href="#billing">Gói dịch vụ</a></li>
                        <li style={styles.navItem}><a href="#favorites">Lịch sử xem</a></li>
                    </ul>
                </div>
                <div style={styles.centralColumn}>
                    <div style={{ ...styles.section, ...styles.userInfo }} className="user-info">
                        <h2>
                            Thông tin tài khoản
                            <button style={styles.editButton} onClick={handleEditClick}>
                                {isEditing ? 'Save' : 'Edit'}
                            </button>
                        </h2>
                        <div style={styles.miniColumnsContainer}>
                        <div style={styles.miniColumn}>
                                <h3>Username</h3>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="username"
                                        value={userInfo.username}
                                        onChange={handleChange}
                                        style={editableFieldStyle}
                                    />
                                ) : (
                                    <p>{userInfo.username}</p>
                                )}
                                <h3>Email</h3>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={userInfo.email}
                                        onChange={handleChange}
                                        style={editableFieldStyle}
                                    />
                                ) : (
                                    <p>{userInfo.email}</p>
                                )}
                            </div>
                            <div style={styles.miniColumn}>
                                <h3>Password</h3>
                                {isEditing ? (
                                    <input
                                        type="password"
                                        name="password"
                                        value={userInfo.password}
                                        onChange={handleChange}
                                        style={editableFieldStyle}
                                    />
                                ) : (
                                    <p>{userInfo.password}</p>
                                )}
                                <h3>Contact Info</h3>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="contactInfo"
                                        value={userInfo.contactInfo}
                                        onChange={handleChange}
                                        style={editableFieldStyle}
                                    />
                                ) : (
                                    <p>{userInfo.contactInfo}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div style={styles.column}>
                    <ul style={styles.nav}>
                        <li style={styles.navItem}><a href="#help">Trợ giúp</a></li>
                        <li style={styles.navItem}><a href="#signout">Đăng xuất</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default UserPage;