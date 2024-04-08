import React from 'react';
import Footer from './Footer';
import useStore from './store'
import moment from 'moment';

const Bookings = () => {

    const { startDate, endDate, updateCheckIn, updateCheckOut, editIndex, setEditIndex } = useStore();
    const bookingCart = useStore((state) => state.bookingCart);
    const addRoom = useStore((state) => state.addRoom);

    const newBooking = { id: 1, room_name: 'Premium Room', room_price: '2000', checkIn: '2024-04-09', checkOut: '2024-04-11', nights: 2 };

    const handleAddRoom = (newRoom) => {
        addRoom(newRoom)
    }

    const handleCheckInChange = (roomId, newCheckInDate) => {
        updateCheckIn(roomId, newCheckInDate);
    };

    const handleCheckOutChange = (roomId, newCheckOutDate) => {
        updateCheckOut(roomId, newCheckOutDate);
    };

    const handleEditClick = (index) => {
        setEditIndex(index);
    };

    return (
        <div id="bookingsPage">
            <p style={{ color: '#996132', fontSize: "2.5rem", fontFamily: "'Caveat', cursive", margin: '5rem 0 0 0' }}>Book Your Stay</p>

            <div id="bookingDashboard">
                <div id="room-selection-container">

                </div>
                <div id="room-selection-cart">
                    {bookingCart.length === 0 ? (<p>Your booking cart is currently empty.</p>) :
                        bookingCart.map((item, index) => (
                            <div key={item.id} className={editIndex === index ? "editing" : "default"}>
                                <p>{item.id}</p>
                                <p>{item.room_name}</p>
                                <p>{item.room_price}</p>
                                <p>{moment(item.checkIn).format('DD-MM-YYYY')}</p>
                                <p>{moment(item.checkOut).format('DD-MM-YYYY')}</p>
                                <p>{item.nights}</p>
                                {editIndex === index ?
                                    <div>
                                        <input id="checkInDateInput-cart"
                                            type="date"
                                            value={item.checkIn}
                                            onChange={(event) => handleCheckInChange(item.id, event.target.value)}
                                        />
                                        <input id="checkOutDateInput-cart"
                                            type="date"
                                            value={item.checkOut}
                                            onChange={(event) => handleCheckOutChange(item.id, event.target.value)}
                                        />
                                    </div> : null}
                                <button onClick={() => handleEditClick(index)}>Edit</button>
                            </div>
                        ))
                    }

                    <button onClick={() => { handleAddRoom(newBooking) }}>Add Room</button>
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