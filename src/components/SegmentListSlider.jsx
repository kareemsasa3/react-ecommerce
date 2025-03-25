import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './SegmentListSlider.css'; // Include your custom CSS

const SegmentListSlider = ({ segments }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  const startAutoTransition = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === segments.length - 1 ? 0 : prevIndex + 1
      );
    }, 7000); // Auto-transition every 7 seconds
  };

  const stopAutoTransition = () => {
    clearInterval(intervalRef.current); // Clear the interval
  };

  const manualTransition = (direction) => {
    stopAutoTransition(); // Stop auto-transition
    if (direction === 'left') {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? segments.length - 1 : prevIndex - 1
      );
    } else {
      setCurrentIndex((prevIndex) =>
        prevIndex === segments.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handlePrevious = () => {
    manualTransition('left');
  };

  const handleNext = () => {
    manualTransition('right');
  };

  const handleDotClick = (index) => {
    stopAutoTransition(); // If dots are clicked, stop auto-transition
    setCurrentIndex(index);
  };

  const currentSection = segments[currentIndex];

  const backgroundStyle = currentSection.background
    ? { backgroundImage: `url(${currentSection.background})` }
    : { backgroundColor: 'lightgray' };

  useEffect(() => {
    startAutoTransition();
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <section className="segment-list-slider" style={backgroundStyle}>
      <div className="segment-content">
        <button className="arrow left" onClick={handlePrevious}>
          <i className="angle left icon arrow-icon"></i>
        </button>
        <div className="section-text">
          {currentSection.title && <h2>{currentSection.title}</h2>}
          {currentSection.text && <p>{currentSection.text}</p>}
        </div>
        {currentSection.image && (
          <img
            src={currentSection.image}
            alt={currentSection.title}
            className="segment-image"
          />
        )}
        <button className="arrow right" onClick={handleNext}>
          <i className="angle right icon arrow-icon"></i>
        </button>
      </div>
      
      <div className="dots-container">
        {segments.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to segment ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

SegmentListSlider.propTypes = {
  segments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // ID can be string or number
      title: PropTypes.string.isRequired, // Title is required
      text: PropTypes.string, // Text is optional
      image: PropTypes.string, // Image URL is optional
      background: PropTypes.string, // Background image URL is optional
    })
  ).isRequired, // The segments array must be provided
};

export default SegmentListSlider;
