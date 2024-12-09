import React, { useState, useRef } from 'react';
import useDragScroll from '../hooks/useDragScroll';

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
    }
};

export const Dashboard = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef(null);

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
            <div style={styles.info}>
                <h1>{animes[currentIndex].title}</h1>
                <p>{animes[currentIndex].summary}</p>
            </div>
            <img src={animes[currentIndex].imageURL} alt={animes[currentIndex].title} style={styles.image} />
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