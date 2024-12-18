import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tmdbapi } from '../services/tmdbApi';

const styles = {
    container: {
        position: 'relative',
        width: '100%',
        height: '100%',
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
    },
    logo: {
        maxWidth: '400px',
        width: '100%',
        height: 'auto',
        marginBottom: '20px',
        zIndex: 2
    },
    indicators: {
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '8px',
        zIndex: 2
    },
    indicatorDot: {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        cursor: 'pointer'
    },
    activeDot: {
        backgroundColor: 'rgba(255, 0, 0, 1)'
    }
};

export const Dashboard = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef(null);
    const navigate = useNavigate();
    const { data: popularMovies } = tmdbapi.PopularMovies({ page: 2 });

    if (!popularMovies) {
        return <div>Loading...</div>;
    }

    const handleWatchClick = () => {
        navigate(`/movie/${popularMovies.results[currentIndex].id}`);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? 2 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
    };

    return (
        <div style={styles.container} ref={containerRef}>
            <img 
                src={popularMovies.results[currentIndex].backdropPath} 
                alt={popularMovies.results[currentIndex].title} 
                style={styles.image} 
            />
            <div style={styles.overlay}></div>
            <div style={styles.info}>
                <h1 className="text-3xl font-bold mb-2">{popularMovies.results[currentIndex].title}</h1>
                <p>{popularMovies.results[currentIndex].overview}</p>
                <button 
                    style={styles.watchButton}
                    onClick={handleWatchClick}
                >
                    Xem phim
                </button>
            </div>
            <div style={styles.indicators}>
                {[0, 1, 2].map((index) => (
                <div
                    key={index}
                    style={{
                        ...styles.indicatorDot,
                        ...(currentIndex === index ? styles.activeDot : {})
                    }}
                    onClick={() => setCurrentIndex(index)}
                />
                ))}
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