import React, { useState, useEffect } from 'react';
import { isBefore, isAfter, eachDayOfInterval } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import rooms from './Rooms'
import RoomImg from '../images/decoration/roomImg.png'

const Bookings = ({ bookedRooms, setBookedRooms }) => {

    const navigate = useNavigate();
    const [checkin, setCheckin] = useState('');
    const [checkout, setCheckout] = useState('');
    const [availableRooms, setAvailableRooms] = useState([]);
    const [disabledButtons, setDisabledButtons] = useState([]);
    const [isCheckAvailBtnDisabled, setisCheckAvailBtnDisabled] = useState(true);
    const [isDisabled, setIsDisabled] = useState('none');
    const [grandTotalRoomAmt, setGrandTotalRoomAmt] = useState([]);
    const [noOfDays, setNoOfDays] = useState(0);

    let roomData = [];
    for (let i = 0; i < bookedRooms.length; i++) {
        roomData[i] = {
            id: bookedRooms[i].id,
            name: bookedRooms[i].name,
            price: bookedRooms[i].price,
            checkInDate: checkin,
            checkOutDate: checkout,
            noOfDays: noOfDays,
            grandTotal: grandTotalRoomAmt.reduce((acc, current) => acc + current, 0)
        }
    }

    useEffect(() => {
        setBookedRooms([]);
    }, [setBookedRooms]);

    const checkAvailability = () => {
        const checkinDate = new Date(checkin);
        const checkoutDate = new Date(checkout);

        const timeDifference = checkoutDate - checkinDate;
        const numberOfDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        setNoOfDays(numberOfDays);

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

    const handleBookNow = (roomId, roomPrice) => {
        const selectedRoom = availableRooms.find(room => room.id === roomId);
        if (selectedRoom && bookedRooms.length < 6) {
            setBookedRooms(prevBookedRooms => [...prevBookedRooms, { ...selectedRoom, isSelected: true }]);
            setDisabledButtons(prevDisabledButtons => [...prevDisabledButtons, roomId]);
            setGrandTotalRoomAmt(grandTotalRoomAmt => [...grandTotalRoomAmt, roomPrice]);
        } else if (bookedRooms.length >= 6) {
            alert('You can book a maximum of 6 rooms.');
        }
    };

    const handleDeleteRoom = (roomId, roomPrice) => {
        setBookedRooms(prevBookedRooms =>
            prevBookedRooms.filter(room => {
                if (room.id === roomId) {
                    setDisabledButtons(prevDisabledButtons => prevDisabledButtons.filter(disabledId => disabledId !== roomId));
                    setGrandTotalRoomAmt(grandTotalRoomAmt.filter(Item => Item !== roomPrice));
                    return false; // Exclude the room from the bookedRooms array
                }
                return true;
            })
        );
    };

    const handleReviewBooking = () => {
        navigate('/reviewBooking', { state: { data: roomData } });
    };

    return (
        <div id="bookingsPage">
            <p className="bookingPageTitle">Reservations</p>
            <p className="bookingPageTitleContent">Book now and let the anticipation of your upcoming stay fill you with excitement!</p>
            <div className="dateInputsContainer">
                <div className="checkInDateInput">
                    <label htmlFor="checkin">Check-in Date: </label>
                    <input style = {{border: 'none', width: '7rem', height: '2rem', borderRadius: '0.5rem', margin: '0 0 0 0.5rem', padding: '0.3rem'}} type="date" id="checkin" required value={checkin} onChange={(e) => setCheckin(e.target.value)} />
                </div>

                <div className="checkOutDateInput">
                    <label htmlFor="checkout">Check-out Date: </label>
                    <input style = {{border: 'none', width: '7rem', height: '2rem', borderRadius: '0.5rem', margin: '0 0 0 0.5rem', padding: '0.3rem'}} type="date" id="checkout" required value={checkout} onChange={(e) => { setisCheckAvailBtnDisabled(false); setCheckout(e.target.value) }} />
                </div>
                <button disabled={isCheckAvailBtnDisabled} className="checkAvailBtn" onClick={() => { setIsDisabled('flex'); checkAvailability(); }}>View Availability</button>
            </div>

            <div className="displayRooms" style={{ display: isDisabled }}>
                <div className="availRooms">
                    {availableRooms.map(room => (
                        <div key={room.id}>
                            <div className="roomDetails">
                                <div className="roomImgIcon">
                                    <img alt='room img template' style={{ objectFit: 'cover' }} src={RoomImg} width='350' height='300'></img>
                                </div>
                                <div className="roomAboutContent"> {/* Amenities according to room type*/}
                                    <p style = {{fontSize: '1.5rem'}}>{room.name}{' '}</p>
                                    <div style={{ display: 'flex' }}>
                                        <div>
                                            <p>Room Size : x sq.ft.</p>
                                            <p>Queen Size Bed</p>
                                            <p>Nightstand</p>
                                            <p>Towels & Essentials</p>
                                            <p>Smoking Allowed</p>
                                        </div>
                                        <div style={{ margin: '0 0 2rem 2rem' }}>
                                            <p>Air Conditioner</p>
                                            <p>Electric Kettle</p>
                                            <p>Housekeeping Services</p>
                                            <p>Free Wifi</p>
                                            {room.name === 'Deluxe Room' ? <p>Private Balcony</p> : <p>Private Porche</p>}
                                        </div>
                                    </div>
                                    <p style={{ fontWeight: 'bold', color: '#996132', fontSize: '1.5rem', margin: '0'}} >&#8377;{room.price}<span style = {{color: '#9a9a9a', fontWeight: '350', fontSize: '1rem'}}> Per Night</span></p>
                                    <p style = {{color: '#9a9a9a', fontWeight: '350', fontSize: '1rem', margin: '0'}}> (Excluding Taxes & Fees)</p>
                                </div>
                                <button className="selectRoomBtn" onClick={() => handleBookNow(room.id, room.price)} disabled={disabledButtons.includes(room.id)}>Select Room</button>
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
                                    <p style={{ margin: '0', color: '#996132' }}>&#8377;{room.price}{' '}</p>
                                </div>
                                <button style={{ display: 'block', borderRadius: '1rem', outline: 'none', border: 'none', cursor: 'pointer', margin: '0 0.4rem 0 0.4rem', color: '#737373' }} onClick={() => handleDeleteRoom(room.id, room.price)}>x</button>

                                <p className="totalRoomAmountTitle_bookingPage">Total</p>
                                <p className="totalRoomAmount_bookingPage">&#8377;{grandTotalRoomAmt.reduce((acc, current) => acc + current, 0)}</p>
                            </div>
                        ))}
                        <button className="reviewBookingBtn" onClick={handleReviewBooking}>Review Booking</button>
                    </div>
                )}
            </div>

            <hr className="divider"></hr>

            <div className="booking-content">
                <h2 style={{ color: '#d49c6e', margin: '2rem 0 3rem 0' }}>Terms & Conditions</h2>
                <h3>Check-In and Check-Out Timings</h3>
                <p>
                    Check-in time is from <span style={{ fontWeight: 'bold' }}>3:00 PM</span> onwards, and check-out time is until <span style={{ fontWeight: 'bold' }}>11:00 AM</span>. If you require an early check-in or late check-out, please contact us in advance, and we will do our best to accommodate your request.
                </p>

                <h3>General Rules</h3>
                <ul>
                    <li>Please be considerate of other guests and maintain a quiet atmosphere in common areas.</li>
                    <li>Smoking is allowed inside the rooms but not in the common areas.</li>
                    <li>Pets are permitted in our homestay. Guests are solely responsible for their pets.</li>
                    <li>Kindly respect the property and its surroundings.</li>
                </ul>

                <h3>Cancellation Policy</h3>
                <p>
                    We understand that plans can change. If you need to cancel your reservation, please do so at least 48 hours before your scheduled check-in time.
                </p>

                <h3>Contact Information</h3>
                <p>
                    If you have any questions, concerns, or special requests, feel free to reach out to our team at +91 63644 01444. We are here to make your stay memorable and enjoyable.
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
