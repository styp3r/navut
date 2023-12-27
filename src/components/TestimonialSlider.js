import React, { useState } from 'react';
import Reviews from './Reviews'

const TestimonialSlider = () => {

  const [currentSlide, setCurrentSlide] = useState(0);
  const [hideTestimonial, setHideTestimonial] = useState(false);

  const prevSlide = () => {
    setHideTestimonial(true);
    setTimeout(() => {
      const newIndex = (currentSlide - 1 + Reviews.length) % Reviews.length;
      setCurrentSlide(newIndex);
      setHideTestimonial(false);
    }, 500); // Ensure this matches the transition duration in CSS
  };

  const nextSlide = () => {
    setHideTestimonial(true);
    setTimeout(() => {
      const newIndex = (currentSlide + 1) % Reviews.length;
      setCurrentSlide(newIndex);
      setHideTestimonial(false);
    }, 500); // Ensure this matches the transition duration in CSS
  };

  return (
    <div className="testimonial-slider">
      <div className={`testimonial ${hideTestimonial ? 'hidden' : ''}`}>
        <p className="testimonial-text">{Reviews[currentSlide].text}</p>
        <p className="testimonial-name">- {Reviews[currentSlide].name}</p>
      </div>
      <div className = "slideBtns">
      <button className = "prevBtn" onClick={prevSlide}><span class="material-symbols-outlined">chevron_left</span></button>
      <button className = "nextBtn" onClick={nextSlide}><span class="material-symbols-outlined">chevron_right</span></button>
      </div>
    </div>
  );
};

export default TestimonialSlider;
