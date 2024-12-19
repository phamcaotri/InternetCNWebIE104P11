import React, { useState } from 'react';

const UserPage: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [userInfo, setUserInfo] = useState({
        username: 'BaThuanPham',
        email: 'example@email.com',
        password: 'BaThuanYeuMeo11',
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
        // Save updated user info logic here
    };

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const editableFieldStyle = {
        background: 'none',
        color: 'white',
        border: 'none',
        borderBottom: '1px solid white',
        marginLeft: '10px',
        textAlign: 'left',
        display: 'inline-block',
        flex: 2
    };

    const styles = {
        userPage: {
            textAlign: 'center',
            padding: '20px'
        },
        content: {
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'left'
        },
        centralColumn: {
            flex: 2,
            padding: '10px',
            maxWidth: '800px'
        },
        section: {
            marginBottom: '20px'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
        },
        headerTitle: {
            fontSize: '20px',
            fontWeight: 'bold'
        },
        editButton: {
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '5px',
            cursor: 'pointer'
        },
        fieldRow: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '10px 0'
        },
        fieldLabel: {
            flex: 1,
            fontWeight: 'bold'
        },
        fieldValue: {
            flex: 2,
            marginLeft: '10px',
            border: 'none',
            borderBottom: '1px solid transparent',
            display: 'inline-block'
        },
        passwordInputWrapper: {
            display: 'flex',
            alignItems: 'center',
            flex: 2, // Same as other fields
            width: '100%',
        },
        passwordToggleButton: {
            marginLeft: '10px',
            background: 'transparent',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
        }
    };

    return (
        <div style={styles.userPage}>
            <div style={styles.content}>
                <div style={styles.centralColumn}>
                    <div style={styles.section}>
                        <div style={styles.header}>
                            <h2 style={styles.headerTitle}>Thông tin tài khoản</h2>
                            {isEditing ? (
                                <button style={styles.editButton} onClick={handleSaveClick}>
                                    Lưu thông tin
                                </button>
                            ) : (
                                <button style={styles.editButton} onClick={handleEditClick}>
                                    Chỉnh sửa thông tin
                                </button>
                            )}
                        </div>
                        <div style={styles.fieldRow}>
                            <span style={styles.fieldLabel}>Tên tài khoản</span>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="username"
                                    value={userInfo.username}
                                    onChange={handleChange}
                                    style={editableFieldStyle}
                                />
                            ) : (
                                <span style={styles.fieldValue}>{userInfo.username}</span>
                            )}
                        </div>
                        <div style={styles.fieldRow}>
                            <span style={styles.fieldLabel}>Email</span>
                            {isEditing ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={userInfo.email}
                                    onChange={handleChange}
                                    style={editableFieldStyle}
                                />
                            ) : (
                                <span style={styles.fieldValue}>{userInfo.email}</span>
                            )}
                        </div>
                        <div style={styles.fieldRow}>
                            <span style={styles.fieldLabel}>Mật khẩu</span>
                            {isEditing ? (
                                <div style={styles.passwordInputWrapper}>
                                    <input
                                        type={passwordVisible ? 'text' : 'password'}
                                        name="password"
                                        value={userInfo.password}
                                        onChange={handleChange}
                                        style={editableFieldStyle}
                                    />
                                    <button
                                        style={styles.passwordToggleButton}
                                        onClick={togglePasswordVisibility}
                                    >
                                        {passwordVisible ? 'Ẩn' : 'Hiển thị'}
                                    </button>
                                </div>
                            ) : (
                                <span style={styles.fieldValue}>
                                    {userInfo.password.replace(/./g, '●')} {/* Replace password with circles */}
                                </span>
                            )}
                        </div>
                        <div style={styles.fieldRow}>
                            <span style={styles.fieldLabel}>Số điện thoại</span>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="contactInfo"
                                    value={userInfo.contactInfo}
                                    onChange={handleChange}
                                    style={editableFieldStyle}
                                />
                            ) : (
                                <span style={styles.fieldValue}>{userInfo.contactInfo}</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPage;
