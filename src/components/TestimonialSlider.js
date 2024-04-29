import React, { useState } from 'react';
import Reviews from './Reviews'
import QuoteSymbol from '../images/decoration/quoteSymbol.png'

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
            <p className = "testimonial-slider-title">Testimonials</p>
            <p className = "testimonial-slider-title">Hear From Happy Guests</p>
            <div className = "testimonial-card">
            <img alt = "quote symbol" className = "quote-symbol" src = {QuoteSymbol}></img>
                <div className={`testimonial ${hideTestimonial ? 'hidden' : ''}`}>
                    <p className="testimonial-text">{Reviews[currentSlide].text}</p>
                    <p style = {{fontStyle: 'italic', fontSize: '1.2rem'}} className="testimonial-name">{Reviews[currentSlide].name}</p>
                </div>
            </div>
            <div className="slide-btns">
                <button className="prev-btn" onClick={prevSlide}><span className="material-symbols-outlined">chevron_left</span></button>
                <button className="next-btn" onClick={nextSlide}><span className="material-symbols-outlined">chevron_right</span></button>
            </div>
        </div>
    );
};

export default TestimonialSlider;


//box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;