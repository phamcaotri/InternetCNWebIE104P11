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
        marginBottom: '20px',
        justifyContent: 'space-between',
        width: '100%',
        position: 'relative', // Add relative positioning to the container
        minWidth: '300px' // Ensure the container has a minimum width
    },
    info: {
        flex: 1,
        marginRight: '20px'
    },
    image: {
        width: '50%',
        maxWidth: '500px',
        height: '50%',
        maxHeight: '500px'
    },
    button: {
        position: 'absolute', // Use absolute positioning for the buttons
        top: '50%', // Center the buttons vertically
        transform: 'translateY(-50%)', // Adjust for vertical centering
        margin: '10px',
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    },
    buttonLeft: {
        left: '-50px', // Position the left button outside the container
    },
    buttonRight: {
        right: '-50px', // Position the right button outside the container
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