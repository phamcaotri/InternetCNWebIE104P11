import React, { useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import useDragScroll from '../hooks/useDragScroll';
import { tmdbapi } from '../services/tmdbApi';
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
        height: '100vh', // Chiếm toàn bộ chiều cao màn hình
        overflow: 'hidden' // Ẩn phần tràn
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%)',
        zIndex: 1
    },
    info: {
        position: 'absolute',
        left: '50px',
        top: '50%', // Đặt ở giữa theo chiều dọc
        transform: 'translateY(-50%)', // Căn chỉnh chính xác vào giữa
        zIndex: 2,
        color: 'white',
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        maxWidth: '40%' // Giới hạn chiều rộng của phần text
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover', // Đảm bảo hình ảnh bao phủ toàn bộ
        position: 'absolute',
        top: 0,
        left: 0
    },
    button: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 3,
        padding: '15px 20px',
        backgroundColor: 'rgba(0,0,0,0.5)',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    },
    buttonLeft: {
        left: '20px',
    },
    buttonRight: {
        right: '20px',
    },
    watchButton: {
        padding: '10px 25px',
        backgroundColor: '#e50914', // Netflix-style red button
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '1.1rem',
        cursor: 'pointer',
        marginTop: '20px',
        transition: 'background-color 0.3s',
        '&:hover': {
            backgroundColor: '#f40612'
        }
    },
    logo: {
        maxWidth: '400px',
        width: '100%',
        height: 'auto',
        marginBottom: '20px'
    }
};

export const Dashboard = () => {

    const { data: popularMovies } = tmdbapi.PopularMovies({ page: 2 });
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef(null);

    if (!popularMovies) {
        return <div>Loading...</div>;
    }


    const navigate = useNavigate();
    const handleWatchClick = () => {
        navigate(`/movie/${popularMovies.results[currentIndex].id}`);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (
            prevIndex === 0 ? 2 : prevIndex - 1  // Changed to hardcoded 2 (3-1)
        ));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (
            prevIndex === 2 ? 0 : prevIndex + 1  // Changed to hardcoded 2
        ));
    };

    const scrollRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
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
                {/* Logo */}
                <h1>{popularMovies.results[currentIndex].title}</h1>
                <p>{popularMovies.results[currentIndex].overview}</p>
                <button style={styles.watchButton} onClick={handleWatchClick}>
                    Xem Phim
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