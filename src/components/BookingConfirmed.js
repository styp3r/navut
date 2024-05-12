import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';

const BookingConfirmed = () => {
    const [count, setCount] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {

        const interval = setInterval(() => {
            setCount(prevCount => prevCount - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (count === 0) {
            // Redirect to another page after the countdown
            navigate('/');
        }
    }, [count, navigate]);

    return (
        <div id="booking-confirmed-page">
            <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={500} recycle = {false}/>
            <div className = "booking-confirmed-page-content">
                <h2 className="booking-confirmed-title-1">Your Booking Is Confirmed! <span style={{color: '#25D366', margin: '0 0 0 0.5rem' }} className="material-symbols-outlined">verified</span></h2>
                <h3 className="booking-confirmed-title-2">Booking Details Will Be Sent To Your Email Shortly.</h3>
                <h4>Redirecting in {count}...</h4>
                <p>Do not close or refresh page</p>
            </div>
        </div>
    );
}

export default BookingConfirmed;
