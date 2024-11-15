import React from 'react';

const UserPage: React.FC = () => {
    return (
        <div>
            <h1>User Profile</h1>
            <div className="user-info">
                <h2>Username: JohnDoe</h2>
                <p>Email: johndoe@example.com</p>
            </div>
            <div className="user-favorites">
                <h2>Favorite Movies</h2>
                <ul>
                    <li>Movie 1</li>
                    <li>Movie 2</li>
                    <li>Movie 3</li>
                </ul>
            </div>
            <div className="user-settings">
                <h2>Settings</h2>
                <button>Edit Profile</button>
                <button>Change Password</button>
            </div>
        </div>
    );
};

export default UserPage;