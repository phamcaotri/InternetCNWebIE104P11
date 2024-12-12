import React, { useState, useRef } from 'react';
import useDragScroll from '../hooks/useDragScroll';
import { useNavigate } from 'react-router-dom';

export const animes = [
    {
        title: 'Anime 1',
        summary: 'This is a short summary of Anime 1.',
        imageURL: 'https://dailynorthwestern.com/wp-content/uploads/2024/06/inside-out2-dannyogrady-1-1200x800.png'
    },
    {
        title: 'Anime 2',
        summary: 'This is a short summary of Anime 2.',
        imageURL: 'https://dailynorthwestern.com/wp-content/uploads/2024/06/inside-out2-dannyogrady-1-1200x800.png'
    },
    {
        title: 'Anime 3',
        summary: 'This is a short summary of Anime 3.',
        imageURL: 'https://www.alamy.com/my-movies-one-of-the-last-standing-second-hand-blu-ray-and-dvd-stores-in-helsinki-finland-image603810950.html'
    }
];

const styles = {
    container: {
        position: 'relative',
        width: '100%',
        height: '100vh',
        minWidth: '300px',
        backgroundColor: '#000000',
        color: 'white',
        overflow: 'hidden'
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)',
        zIndex: 1 // Đặt giữa ảnh nền và content
    },
    info: {
        position: 'absolute',
        top: '50%', // Căn giữa theo chiều dọc
        left: '5%', // Đặt cách mép trái 5%
        transform: 'translateY(-50%)', // Chỉ căn giữa theo chiều dọc
        zIndex: 2,
        textAlign: 'left', // Căn text sang trái
        width: '40%', // Giới hạn chiều rộng của text
        padding: '20px',
        borderRadius: '10px'
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: 1
    },
    button: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        padding: '15px 20px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        zIndex: 3,
        fontSize: '20px'
    },
    buttonLeft: {
        left: '20px', // Thay đổi từ -50px thành 20px
    },
    buttonRight: {
        right: '20px', // Thay đổi từ -50px thành 20px
    },
    watchButton: {
        backgroundColor: '#ff0000', // Màu đỏ như Netflix
        color: 'white',
        padding: '12px 24px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        marginTop: '20px', // Tạo khoảng cách với text phía trên
    }
};

export const Dashboard = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef(null);
    const navigate = useNavigate();

    const handleWatchClick = () => {
        navigate(`/movie/${animes[currentIndex].title}`);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? animes.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === animes.length - 1 ? 0 : prevIndex + 1));
    };

    const scrollLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    return (
        <div style={styles.container} ref={containerRef}>
            <img 
                src={animes[currentIndex].imageURL} 
                alt={animes[currentIndex].title} 
                style={styles.image} 
            />
            <div style={styles.overlay}></div>
            <div style={styles.info}>
                <h1>{animes[currentIndex].title}</h1>
                <p>{animes[currentIndex].summary}</p>
                <button 
                    style={styles.watchButton}
                    onClick={handleWatchClick}
                >
                    Xem phim
                </button>
            </div>
            <button
                style={{ ...styles.button, ...styles.buttonLeft }}
                onClick={handlePrev}
                draggable="false"
            >
                &lt;
            </button>
            <button
                style={{ ...styles.button, ...styles.buttonRight }}
                onClick={handleNext}
                draggable="false"
            >
                &gt;
            </button>
        </div>
    );
};

export default Dashboard;