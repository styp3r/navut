import React, { useState, useEffect } from 'react';
import { isBefore, isAfter, eachDayOfInterval } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import rooms from './Rooms'

const About = ({ bookedRooms, setBookedRooms }) => {
    const navigate = useNavigate();
    const [checkin, setCheckin] = useState('');
    const [checkout, setCheckout] = useState('');
    const [availableRooms, setAvailableRooms] = useState([]);
    const [disabledButtons, setDisabledButtons] = useState([]);
    const [isCheckAvailBtnDisabled, setisCheckAvailBtnDisabled] = useState(true);
    const [isDisabled, setIsDisabled] = useState('none');

    useEffect(() => {
        // Reset bookedRooms to an empty array on page load
        setBookedRooms([]);
        // Set up the beforeunload event listener
        const beforeUnloadListener = (event) => {
            // No need to do anything here since the state has already been reset
        };
        window.addEventListener('beforeunload', beforeUnloadListener);
        // Cleanup the event listener when the component is unmounted
        return () => {
            window.removeEventListener('beforeunload', beforeUnloadListener);
        };
    }, [setBookedRooms]);

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
            setBookedRooms(prevBookedRooms => [...prevBookedRooms, { ...selectedRoom, isSelected: true }]);
            setDisabledButtons(prevDisabledButtons => [...prevDisabledButtons, roomId]);
        } else if (bookedRooms.length >= 6) {
            alert('You can book a maximum of 6 rooms.');
        }
    };

    const handleDeleteRoom = (roomId) => {
        setBookedRooms(prevBookedRooms =>
            prevBookedRooms.filter(room => {
                if (room.id === roomId) {
                    setDisabledButtons(prevDisabledButtons => prevDisabledButtons.filter(disabledId => disabledId !== roomId));
                    return false; // Exclude the room from the bookedRooms array
                }
                return true;
            })
        );
    };

    const handleReviewBooking = () => {
        navigate('/reviewBooking');
    };

    return (
        <div id="bookingsPage">
            <h1>Bookings</h1>
            <div className="dateInputsContainer">
                <div className="checkInDateInput">
                    <label htmlFor="checkin">Check-in Date: </label>
                    <input type="date" id="checkin" value={checkin} onChange={(e) => setCheckin(e.target.value)} />
                </div>

                <div className="checkOutDateInput">
                    <label htmlFor="checkout">Check-out Date: </label>
                    <input type="date" id="checkout" value={checkout} onChange={(e) => {setisCheckAvailBtnDisabled(false); setCheckout(e.target.value) }} />
                </div>
                <button disabled={isCheckAvailBtnDisabled} className="checkAvailBtn1" onClick={() => {setIsDisabled('flex'); checkAvailability();}}>Check Availability</button>
            </div>
            <div className = "displayRooms" style = {{display: isDisabled}}>
                <div className="availRooms">
                    <h2>Available Rooms</h2>
                    {availableRooms.map(room => (
                        <div key={room.id}>
                            {room.name}{' '}
                            <button onClick={() => handleBookNow(room.id)} disabled={disabledButtons.includes(room.id)}>Select</button>
                        </div>
                    ))}
                </div>

                {bookedRooms.length > 0 && (
                    <div className="selectedRooms">
                    <h2>Selected Rooms</h2>
                    {bookedRooms.map(room => (
                        <div key={room.id}>
                            {room.name}{' '}
                            <button onClick={() => handleDeleteRoom(room.id)}>Delete</button>
                        </div>
                    ))}
                    <button onClick={handleReviewBooking}>Review Booking</button>
                </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default About;
