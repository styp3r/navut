import React, { useState, useEffect } from 'react';
import { isBefore, isAfter, eachDayOfInterval } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import rooms from './Rooms'

const Bookings = ({ bookedRooms, setBookedRooms }) => {
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
            <p className = "bookingPageTitle">Reservations</p>
            <p className = "bookingPageTitleContent">Book now and let the anticipation of your upcoming stay fill you with excitement!</p>
            <div className="dateInputsContainer">
                <div className="checkInDateInput">
                    <label htmlFor="checkin">Check-in Date: </label>
                    <input type="date" id="checkin" value={checkin} onChange={(e) => setCheckin(e.target.value)} />
                </div>

                <div className="checkOutDateInput">
                    <label htmlFor="checkout">Check-out Date: </label>
                    <input type="date" id="checkout" value={checkout} onChange={(e) => { setisCheckAvailBtnDisabled(false); setCheckout(e.target.value) }} />
                </div>
                <button disabled={isCheckAvailBtnDisabled} className="checkAvailBtn" onClick={() => { setIsDisabled('flex'); checkAvailability(); }}>View Availability</button>
            </div>

            <div className="displayRooms" style={{ display: isDisabled }}>
                <div className="availRooms">
                    <h2>Select a Room</h2>
                    {availableRooms.map(room => (
                        <div key={room.id}>
                            <div className="roomDetails">
                                <p>{room.name}{' '}</p>
                                <p>{room.price}</p>
                                <button className="selectRoomBtn" onClick={() => handleBookNow(room.id)} disabled={disabledButtons.includes(room.id)}>Select Room</button>
                            </div>
                        </div>
                    ))}
                </div>

                {bookedRooms.length > 0 && (
                    <div className="selectedRooms">
                        {bookedRooms.map(room => (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 1rem 0 1rem', color: '#ffffff' }} key={room.id}>
                                <div>
                                    <p style={{ margin: '0', color: '#996132', fontWeight: 'bold' }}>{room.name}{' '}</p>
                                    <p style={{ margin: '0', color: '#996132' }}>{room.price}{' '}</p>
                                </div>
                                <button style={{ display: 'block', borderRadius: '1rem', outline: 'none', border: 'none', cursor: 'pointer', margin: '0 0.4rem 0 0.4rem', color: '#737373' }} onClick={() => handleDeleteRoom(room.id)}>x</button>
                            </div>
                        ))}
                        <button className="reviewBookingBtn" onClick={handleReviewBooking}>Review Booking</button>
                    </div>
                )}
            </div>

            <hr className="divider"></hr>

            <div className="booking-content">
                <h2 style = {{color: '#d49c6e', margin: '2rem 0 3rem 0'}}>Terms & Conditions</h2>
                <h3>Check-In and Check-Out Timings</h3>
                <p>
                    Check-in time is from 3:00 PM onwards, and check-out time is until 11:00 AM. If you require an early check-in or late check-out, please contact us in advance, and we will do our best to accommodate your request.
                </p>

                <h3>General Rules</h3>
                <ul>
                    <li>Please be considerate of other guests and maintain a quiet atmosphere in common areas.</li>
                    <li>No smoking is allowed inside the rooms or common areas.</li>
                    <li>Pets are not permitted in our homestay.</li>
                    <li>Kindly respect the property and its surroundings.</li>
                </ul>

                <h3>Cancellation Policy</h3>
                <p>
                    We understand that plans can change. If you need to cancel your reservation, please do so at least 48 hours before your scheduled check-in time to avoid any cancellation charges. Late cancellations or no-shows may incur a cancellation fee.
                </p>

                <h3>Contact Information</h3>
                <p>
                    If you have any questions, concerns, or special requests, feel free to reach out to our team at [Your Contact Email/Phone]. We are here to make your stay memorable and enjoyable.
                </p>

                <p>
                    We look forward to hosting you at our homestay and wish you a wonderful stay!
                </p>
            </div>
            <Footer />
        </div>
    );
};

export default Bookings;
