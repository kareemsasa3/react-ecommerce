import React, { useState, useEffect, useRef } from 'react';
import './SegmentListSlider.css'; // Include your custom CSS

const SegmentListSlider = ({ segments }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  const startAutoTransition = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === segments.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Auto-transition every 5 seconds
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

  const currentSection = segments[currentIndex];

  useEffect(() => {
    startAutoTransition(); // Start auto-transition on mount
    return () => clearInterval(intervalRef.current); // Cleanup on unmount
  }, []); // Only run once on component mount

  return (
    <section className="segment-list-slider">
      <div className="segment-content">
        <div className="arrow left" onClick={handlePrevious}>
          <i className="angle left icon arrow-icon"></i>
        </div>
        {currentSection.image && (
          <img
            src={currentSection.image}
            alt={currentSection.title}
            className="segment-image"
          />
        )}
        <div className="section-text">
          {currentSection.title && <h2>{currentSection.title}</h2>}
          {currentSection.text && <p>{currentSection.text}</p>}
        </div>
        <div className="arrow right" onClick={handleNext}>
          <i className="angle right icon arrow-icon"></i>
        </div>
      </div>
    </section>
  );
};

export default SegmentListSlider;
