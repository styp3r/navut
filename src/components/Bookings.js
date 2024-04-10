import React from 'react';
import Footer from './Footer';
import useStore from './store'
import gal from '../images/gallery/gal1.jpeg'
import { Link } from 'react-router-dom'

const Bookings = () => {

    const { availableRooms,
        bookingCart,
        updateCheckIn,
        updateCheckOut,
        editIndex,
        setEditIndex,
        inc,
        dec,
        addRoom,
        deleteRoom,
        setIsSelected,
        setIsNotSelected } = useStore();

    const isEmpty = bookingCart.length === 0;

    //const newBooking = { id: 1, room_name: 'Premium Room', room_price: '2000', checkIn: '2024-04-09', checkOut: '2024-04-11', nights: 2 };

    const handleAddRoom = () => {
        document.getElementById('room-selection-list-container').style.display = "flex";
        document.getElementById('guest-details-input-container').style.display = "none";
        document.getElementById('save-changes-btn').style.display = "none";
        setEditIndex(null);
    }

    const handleSaveChanges = () => {
        document.getElementById('room-selection-list-container').style.display = "none";
        document.getElementById('guest-details-input-container').style.display = "flex";
        document.getElementById('save-changes-btn').style.display = "none";
        document.getElementById('add-room-btn').style.display = "flex";
        setEditIndex(null);
    }

    const handleCheckInChange = (roomId, newCheckInDate) => {
        updateCheckIn(roomId, newCheckInDate);
    };

    const handleCheckOutChange = (roomId, newCheckOutDate) => {
        updateCheckOut(roomId, newCheckOutDate);
    };

    const handleOneUp = (roomId, count) => {
        inc(roomId, count);
    }

    const handleOneDown = (roomId, count) => {
        dec(roomId, count);
    }

    const handleEditClick = (index) => {
        window.scrollTo(0, 0);
        document.getElementById('room-selection-list-container').style.display = "none";
        document.getElementById('guest-details-input-container').style.display = "flex";
        document.getElementById('save-changes-btn').style.display = "flex";
        document.getElementById('add-room-btn').style.display = "none";
        setEditIndex(index);
    };

    const handleDeleteClick = (roomId) => {
        document.getElementById('room-selection-list-container').style.display = "none";
        document.getElementById('guest-details-input-container').style.display = "flex";
        document.getElementById('save-changes-btn').style.display = "none";
        document.getElementById('add-room-btn').style.display = "flex";
        setIsNotSelected(roomId)
        deleteRoom(roomId);
        setEditIndex(null);
    }

    const formatDate = (date) => {
        const dd = String(date.getDate()).padStart(2, '0'); // Day with leading zero
        const mm = String(date.getMonth() + 1).padStart(2, '0'); // Month with leading zero (January is 0!)
        const yyyy = date.getFullYear();
        let formattedDate = String(yyyy + '-' + mm + '-' + dd)

        return formattedDate;
    }

    const formateDateStr = (dateString) => {
        const year = parseInt(dateString.slice(0, 4));
        const month = parseInt(dateString.slice(5, 7)) - 1; // Months are zero-indexed
        const day = parseInt(dateString.slice(8, 10));

        // Check if date is valid (optional)
        if (year > 0 && month >= 0 && month < 12 && day > 0 && day <= 31) {
            const formattedDate = day.toString().padStart(2, '0') + '-' + (month + 1).toString().padStart(2, '0') + '-' + year;
            return formattedDate; // Output: 19-11-2023
        } else {
            alert("Invalid date format provided");
        }
    }

    const handleAddRoomToCart = (newRoomId, newRoomName, newRoomPrice, newRoomCount) => {

        let newBooking = {
            id: newRoomId,
            room_name: newRoomName,
            room_price: newRoomPrice,
            count: newRoomCount,
            checkIn: formatDate(new Date()),
            checkOut: formatDate(new Date()),
        }

        window.scrollTo(0, 0);
        document.getElementById('room-selection-list-container').style.display = "none";
        document.getElementById('guest-details-input-container').style.display = "flex";
        setIsSelected(newRoomId)
        setEditIndex(null);
        addRoom(newBooking);
    }

    return (
        <div id="bookingsPage">
            <p style={{ color: '#996132', fontSize: "2.5rem", fontFamily: "'Caveat', cursive", margin: '7rem 0 0 0' }}>Book Your Stay</p>

            <div id="bookingDashboard">
                <div id="dashboard-main">
                    <div id="room-selection-list-container" style={{ display: bookingCart.length === 0 ? "flex" : "none" }}> {/* Left Dashboard - Main - 1 - default*/}
                        {availableRooms.map((ar) => (
                            <div key={ar.id} id="room-selection-list">
                                <div id="room-details-container">
                                    <div className="room-details-content">
                                        <img alt='bedroom shot' src={gal} width='280' height='200' style={{ borderRadius: '0.5rem', objectFit: 'cover' }}></img>
                                        <p>{ar.id}</p>
                                        <p>{ar.room_name}</p>
                                        <p>{ar.room_price}</p>
                                    </div>
                                    <button id="book-room-btn" disabled={ar.isSelected} onClick={() => handleAddRoomToCart(ar.id, ar.room_name, ar.room_price, ar.count)} className="classicBtn" >Book Room</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div id="guest-details-input-container" style={{ display: bookingCart.length === 0 ? "none" : "flex" }}> {/* Left Dashboard - Main - 2*/}
                        <h3>Guest Details</h3>
                        <p style = {{margin: 0}}>* Required Fields</p>
                        <div className="guest-details-input-form">
                            <input required className="guest-input-item1" type="text" placeholder="Full Name *"></input>
                            <input required className="guest-input-item-email" type="email" placeholder="Email Address *"></input>
                            <p style = {{margin: 0, fontSize: '0.8rem'}}>Your booking details will be sent to this Email ID.</p>
                            <input required className="guest-input-item1" type="text" placeholder="Phone Number *"></input>
                            <textarea className = "spReqInput" type="text" placeholder="Special Requests and Preferences"></textarea>
                        </div>
                        <Link to="/review-booking" style={{ textDecoration: 'none', color: '#ffffff' }}><button id="complete-booking-btn" className="classicBtn"><span className="material-symbols-outlined">verified_user</span>Complete Booking</button></Link>
                    </div>

                </div>

                <div id="room-selection-cart">  {/* Right Dashboard*/}
                    <h3>Your Bookings</h3>
                    {bookingCart.length === 0 ? (
                        <div style={{ margin: '3rem 0 0 0' }}>
                            <span style={{ fontSize: '2rem', color: '#996132' }} className="material-symbols-outlined">more_horiz</span>
                            <p>No Rooms Selected.</p>
                        </div>
                    ) :
                        bookingCart.map((item, index) => (
                            <div key={item.id} className={editIndex === index ? "editing" : "default"}>
                                <p>{item.id}</p>
                                <p style={{ fontWeight: 'bold' }}>{item.room_name}</p>
                                <p>{item.room_price}</p>
                                <div style = {{border: 'solid 1px #d49c6e', display: 'inline-block', padding: '0 0.5rem 0 0.5rem', borderRadius: '0.5rem'}}>
                                    <button style={{ display: 'inline-block', width: '1.5rem', height: '1.5rem' }} className="classicBtn" onClick={() => handleOneDown(item.id, item.count)}>-</button>
                                    <p style={{ display: 'inline-block', margin: '0.5rem 1rem 0.5rem 1rem' }}>{item.count}</p>
                                    <button style={{ display: 'inline-block', width: '1.5rem', height: '1.5rem' }} className="classicBtn" onClick={() => handleOneUp(item.id, item.count)}>+</button>
                                </div>
                                <p>{formateDateStr(item.checkIn)} | {formateDateStr(item.checkOut)}</p>
                                <p></p>
                                <p>{item.nights}</p>
                                <button id="delete-booking-btn" className="classicBtn" onClick={() => handleDeleteClick(item.id)}><span className="material-symbols-outlined" style={{ margin: '0 0 0 0' }}>delete</span>Delete</button>
                                {editIndex === index ?
                                    <div>
                                        <label id="checkInDateInput-cart-label">Check-in</label>
                                        <input id="checkInDateInput-cart"
                                            type="date"
                                            value={item.checkIn}
                                            label="Check-in"
                                            onChange={(event) => handleCheckInChange(item.id, event.target.value)}
                                        />
                                        <label id="checkOutDateInput-cart-label">Check-out</label>
                                        <input id="checkOutDateInput-cart"
                                            type="date"
                                            value={item.checkOut}
                                            onChange={(event) => handleCheckOutChange(item.id, event.target.value)}
                                        />
                                    </div> : null}
                                <button id="edit-booking-btn" className="classicBtn" onClick={() => handleEditClick(index)}><span className="material-symbols-outlined" style={{ margin: '0 0.5rem 0 0' }}>edit_square</span>Edit</button>
                                <button id="save-changes-btn" className="classicBtn" onClick={() => handleSaveChanges(index)}><span className="material-symbols-outlined" style={{ margin: '0 0.5rem 0 0' }}>done</span>Save Edits</button>
                            </div>
                        ))
                    }

                    {!isEmpty && <button id="add-room-btn" onClick={() => { handleAddRoom() }}><span className="material-symbols-outlined" style={{ margin: '0 0.5rem 0 0' }}>add_home</span>Add Room</button>}
                </div>
            </div>

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
                    If you have any questions, concerns, or special requests, feel free to reach out to our <Link to="/contact" style={{ textDecoration: 'none', color: '#996132', fontWeight: 'bold' }}>team</Link>. We are here to make your stay memorable and enjoyable.
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


/*
-Data To Be Uploaded To Server After Successful Payment-

1. checkInDate - roomData[0].checkInDate
2. checkOutDate - roomData[0].checkOutDate
3. roomType - rd.name
4. priceWOtax - rd.price * noOfDays
5. priceWithTax - (rd.price * noOfDays)* 0.18
6. grandTotal - (grandTotal) + ((grandTotal) * 0.18)
7. guestEmail - email
8. guestPhone - phNo
9. guestName - name
10. specialReq- spReq
11. roomId - rd.id
12. nights - nights
*/