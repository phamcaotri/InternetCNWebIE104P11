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
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '20px'
    },
    info: {
        marginRight: '20px'
    },
    image: {
        width: '300px',
        height: '200px'
    },
    image: {

        width: '300px',
        height: '200px'
    },
    button: {
        margin: '10px',
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
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
            <div style={styles.animeContainer}>
                <div style={styles.info}>
                    <h1>{animes[currentIndex].title}</h1>
                    <p>{animes[currentIndex].summary}</p>
                </div>
                <img src={animes[currentIndex].imageURL} alt={animes[currentIndex].title} style={styles.image}/>
            </div>
            <div>
                <button
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-secondary text-text p-2 rounded-full opacity-80 hover:opacity-100 select-none"
                    onClick={handlePrev}
                    draggable="false"
                >
                    &lt;
                </button>
                <button
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-secondary text-text p-2 rounded-full opacity-80 hover:opacity-100 select-none"
                    onClick={handleNext}
                    draggable="false"
                >
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default Dashboard;