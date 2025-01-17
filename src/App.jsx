import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/nav';
import Hero from './components/hero';
import Available from './components/Available';
import AboutUs from './components/Aboutus';
import Trip from './components/Trip';
import Footer from './components/footer';

function App() {
    const [isHindi, setIsHindi] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [hovered, setHovered] = useState(false); // Track hover state

    const handleToggleLanguage = () => setIsHindi(!isHindi);

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 100); // Show button after scrolling 100px
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <Router>
            {/* Navigation Bar */}
            <Navigation isHindi={isHindi} onToggleLanguage={handleToggleLanguage} />

            {/* Routes */}
            <Routes>
                <Route path="/" element={<Hero isHindi={isHindi} />} />
                <Route path="/Available" element={<Available isHindi={isHindi} />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/trip" element={<Trip isHindi={isHindi} />} />
            </Routes>

            {/* Footer */}
            <Footer isHindi={isHindi} />

            {/* Back to Top Button */}
            {showBackToTop && (
                <button
                    onClick={handleScrollToTop}
                    onMouseEnter={() => setHovered(true)} // Set hover state
                    onMouseLeave={() => setHovered(false)} // Reset hover state
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        backgroundColor: hovered ? '#555' : '#333', // Change color on hover
                        color: '#fff',
                        padding: '10px 15px',
                        borderRadius: '5px',
                        fontSize: '18px',
                        cursor: 'pointer',
                        zIndex: '1000',
                        border: 'none',
                        transition: 'background-color 0.3s ease', // Smooth transition
                    }}
                >
                    ↑
                </button>
            )}
        </Router>
    );
}

export default App;
