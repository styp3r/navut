import React from 'react';
import Footer from './Footer';
import useStore from './store'
import moment from 'moment';
import RoomDetailsCont from './RoomDetailsContainer';

const Bookings = () => {

    const { startDate, endDate, availableRooms, bookingCart, updateCheckIn, updateCheckOut, editIndex, setEditIndex } = useStore();

    const isEmpty = bookingCart.length === 0;

    //const newBooking = { id: 1, room_name: 'Premium Room', room_price: '2000', checkIn: '2024-04-09', checkOut: '2024-04-11', nights: 2, isBreakfast: true };

    const handleAddRoom = () => {
        document.getElementById('room-selection-list-container').style.display = "flex";
        document.getElementById('guest-details-input-container').style.display = "none";
        document.getElementById('save-changes-btn').style.display = "none";
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

    const handleEditClick = (index) => {
        document.getElementById('room-selection-list-container').style.display = "flex";
        document.getElementById('guest-details-input-container').style.display = "none";
        document.getElementById('save-changes-btn').style.display = "flex";
        document.getElementById('add-room-btn').style.display = "none";
        setEditIndex(index);
    };

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

    return (
        <div id="bookingsPage">
            <p style={{ color: '#996132', fontSize: "2.5rem", fontFamily: "'Caveat', cursive", margin: '5rem 0 0 0' }}>Book Your Stay</p>

            <div id="bookingDashboard">
                <div id="dashboard-main">

                    <div id="room-selection-list-container"> {/* Left Dashboard - Main - 1 - default*/}
                        {availableRooms.map((ar) => (
                            <div key={ar.id} id="room-selection-list">
                                <RoomDetailsCont key={ar.id} id={ar.id} roomName={ar.room_name} roomPrice={ar.room_price} isBreakfast={ar.isBreakfast} />
                            </div>
                        ))}
                    </div>

                    <div id="guest-details-input-container"> {/* Left Dashboard - Main - 2*/}
                        <h3>Guest Details</h3>
                        <p>* Required</p>
                        <div className="guest-details-input-form">
                            <input required className="guest-input-item1" type="text" placeholder="Full Name *"></input>
                            <input required className="guest-input-item1" type="text" placeholder="Email Address *"></input>
                            <input required className="guest-input-item1" type="text" placeholder="Phone Number *"></input>
                            <textarea style={{ width: '20rem', height: '5rem', resize: 'none', margin: '1rem' }} type="text" placeholder="Special Requests and Preferences (Optional)"></textarea>
                        </div>
                    </div>

                </div>

                <div id="room-selection-cart">  {/* Right Dashboard*/}
                    <h3>Your Bookings</h3>
                    {bookingCart.length === 0 ? (
                        <p>No Bookings Available.</p>
                    ) :
                        bookingCart.map((item, index) => (
                            <div key={item.id} className={editIndex === index ? "editing" : "default"}>
                                <p>{item.id}</p>
                                <p>{item.room_name}</p>
                                <p>{item.room_price}</p>
                                <p>{formateDateStr(item.checkIn)}</p>
                                <p>{formateDateStr(item.checkOut)}</p>
                                <p>{item.nights}</p>
                                {editIndex === index ?
                                    <div>
                                        <label id = "checkInDateInput-cart-label">Check-in</label>
                                        <input id="checkInDateInput-cart"
                                            type="date"
                                            value={item.checkIn}
                                            label = "Check-in"
                                            onChange={(event) => handleCheckInChange(item.id, event.target.value)}
                                        />
                                        <label id = "checkOutDateInput-cart-label">Check-out</label>
                                        <input id="checkOutDateInput-cart"
                                            type="date"
                                            value={item.checkOut}
                                            onChange={(event) => handleCheckOutChange(item.id, event.target.value)}
                                        />
                                    </div> : null}
                                <button id="edit-booking-btn" className = "classicBtn" onClick={() => handleEditClick(index)}><span class="material-symbols-outlined" style = {{margin: '0 0.5rem 0 0'}}>edit_square</span>Edit</button>
                                <button id="save-changes-btn" className = "classicBtn" onClick={() => handleSaveChanges(index)}><span class="material-symbols-outlined" style = {{margin: '0 0.5rem 0 0'}}>done</span>Save Booking</button>
                            </div>
                        ))
                    }

                    {!isEmpty && <button id="add-room-btn" className = "classicBtn" onClick={() => { handleAddRoom() }}><span class="material-symbols-outlined" style = {{margin: '0 0.5rem 0 0'}}>add_home</span>Add Room</button>}
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
12. noOfDays - noOfDays
*/

/*
{console.log(bookingCart.map((item, index) => (
                    <div key = {index}>
                        <p>{item.id}</p>
                        <p>{item.room_name}</p>
                        <p>{item.room_price}</p>
                        <p>{item.checkIn}</p>
                        <p>{item.checkOut}</p>
                        <p>{item.nights}</p>
                    </div>
                )))}
                <button onClick = {() => {handleAddRoom(newBooking)}}>Add Room</button> */