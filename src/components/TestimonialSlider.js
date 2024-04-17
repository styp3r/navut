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
            <p style = {{color: '#996132', fontSize: "2.5rem",fontFamily: "'Caveat', cursive"}}>Testimonials</p>
            <p style = {{fontWeight: 'bold', margin: 0}}>~ Discover why others love staying here ~</p>
            <img alt = "quote symbol" className = "quoteSymbol" src = {QuoteSymbol}></img>
            <div className = "testimonialCard">
                <div className={`testimonial ${hideTestimonial ? 'hidden' : ''}`}>
                    <p className="testimonial-text">{Reviews[currentSlide].text}</p>
                    <p style = {{fontStyle: 'italic', fontSize: '1.2rem'}} className="testimonial-name">- {Reviews[currentSlide].name}</p>
                </div>
            </div>
            <div className="slideBtns">
                <button className="prevBtn" onClick={prevSlide}><span className="material-symbols-outlined">chevron_left</span></button>
                <button className="nextBtn" onClick={nextSlide}><span className="material-symbols-outlined">chevron_right</span></button>
            </div>
        </div>
    );
};

export default TestimonialSlider;
