import React, { useState } from 'react';
import { isBefore, isAfter, eachDayOfInterval } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const About = ({ bookedRooms, setBookedRooms }) => {
    const navigate = useNavigate();
    const [checkin, setCheckin] = useState('');
    const [checkout, setCheckout] = useState('');
    const [availableRooms, setAvailableRooms] = useState([]);
    const [disabledButtons, setDisabledButtons] = useState([]);

    // Sample room data (replace this with your 'rooms.js' file)
    const rooms = [
        { id: 1, name: 'Room 101', bookings: [{ startDate: '2024-01-30', endDate: '2024-02-05' }] },
        { id: 2, name: 'Room 102', bookings: [] },
        // Add more rooms as needed
    ];

    const checkAvailability = () => {
        const checkinDate = new Date(checkin);
        const checkoutDate = new Date(checkout);

        if (isNaN(checkinDate) || isNaN(checkoutDate) || isAfter(checkoutDate, checkinDate)) {
            const selectedDates = eachDayOfInterval({ start: checkinDate, end: checkoutDate });

            const conflictingDates = selectedDates.slice(1, -1); // Exclude the start and end dates

            const availableRooms = rooms.filter(room => {

                const hasConflictingDates = room.bookings.some(booking =>
                    conflictingDates.some(date =>
                        isBefore(date, new Date(booking.endDate)) && isAfter(date, new Date(booking.startDate))
                    )
                );

                return !hasConflictingDates;
            });

            setAvailableRooms(availableRooms);
        } else {
            alert('Invalid date range');
        }
    };

    const handleBookNow = (roomId) => {
        const selectedRoom = availableRooms.find(room => room.id === roomId);
        if (selectedRoom && bookedRooms.length < 6) {
            setBookedRooms(prevBookedRooms => [...prevBookedRooms, selectedRoom]);
            setDisabledButtons(prevDisabledButtons => [...prevDisabledButtons, roomId]);
        } else if (bookedRooms.length >= 6) {
            alert('You can book a maximum of 6 rooms.');
        }
    };

    const handleReviewBooking = () => {
        navigate('/reviewBooking');
    };

    return (
        <div>
            <h1>Room Booking System</h1>

            <label htmlFor="checkin">Check-in Date:</label>
            <input type="date" id="checkin" value={checkin} onChange={(e) => setCheckin(e.target.value)} />

            <label htmlFor="checkout">Check-out Date:</label>
            <input type="date" id="checkout" value={checkout} onChange={(e) => setCheckout(e.target.value)} />

            <button onClick={checkAvailability}>Check Availability</button>

            <div>
                <h2>Available Rooms:</h2>
                <ul>
                    {availableRooms.map(room => (
                        <div key={room.id}>
                            {room.name}{' '}
                            <button onClick={() => handleBookNow(room.id)} disabled={disabledButtons.includes(room.id)}>Select</button>
                        </div>
                    ))}
                    <button onClick={handleReviewBooking}>Review Booking</button>
                </ul>
            </div>

            {bookedRooms.length > 0 && (
                <div>
                    <h2>Selected Rooms:</h2>
                    <ul>
                        {bookedRooms.map(room => (
                            <li key={room.id}>{room.name}</li>
                        ))}
                    </ul>
                    {/*<Link to="/reviewBooking">
                        <button>Review Booking</button>
                        </Link>*/}
                </div>
            )}
        </div>
    );
};

export default About;
