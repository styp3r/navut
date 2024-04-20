import React, { useState, useEffect } from 'react';
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
            <div style={{ padding: '15rem 0 0 0' }}>
                <h3>Your Booking Is Confirmed!</h3>
                <h1>Redirecting in {count}...</h1>
                <p>Do not close or refresh page</p>
            </div>
        </div>
    );
}

export default BookingConfirmed;
