import React, { useState } from 'react';
import Footer from './Footer';
import useStore from './store'
import gal from '../images/gallery/gal1.jpeg'
import { Link } from 'react-router-dom'

const Bookings = () => {

    const { availableRoomCategory,
        bookingCart,
        updateCheckIn,
        updateCheckOut,
        editIndex,
        setEditIndex,
        addRoom,
        deleteRoom,
        setGuestName,
        setGuestEmail,
        setGuestPhone,
        deluxeCount,
        incDC,
        decDC,
        familyCount,
        incFC,
        decFC,
        deluxeIdArrayCount,
        familyIdArrayCount,
        incDeluxeIdArrayCount,
        incFamilyIdArrayCount,
        decDeluxeIdArrayCount,
        decFamilyIdArrayCount,
        deluxeIddArray,
        familyIddArray } = useStore();

    const isEmpty = bookingCart.length === 0;

    /*These are state management variables for input fields for guest details.
    This is to ensure that the inputted values meet valid criteria */
    const [inputValue1, setInputValue1] = useState('');
    const [isValid1, setIsValid1] = useState(false);
    const [inputValue2, setInputValue2] = useState('');
    const [isValid2, setIsValid2] = useState(false);
    const [inputValue3, setInputValue3] = useState('');
    const [isValid3, setIsValid3] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

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

    const handleEditClick = (index) => {
        window.scrollTo(0, 0);
        document.getElementById('room-selection-list-container').style.display = "none";
        document.getElementById('guest-details-input-container').style.display = "flex";
        document.getElementById('save-changes-btn').style.display = "flex";
        document.getElementById('add-room-btn').style.display = "none";
        setEditIndex(index);
    };

    const handleDeleteClick = (roomId, type) => {
        document.getElementById('room-selection-list-container').style.display = "none";
        document.getElementById('guest-details-input-container').style.display = "flex";
        document.getElementById('save-changes-btn').style.display = "none";
        document.getElementById('add-room-btn').style.display = "flex";


        if (type === 'd') {
            incDC();
            decDeluxeIdArrayCount();
        }

        if (type === 'f') {
            incFC();
            decFamilyIdArrayCount();
        }

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

    const handleAddRoomToCart = (newRoomId, newRoomName, newRoomPrice, isBreakfastVal, type) => {

        const newDate = new Date();
        newDate.setDate(newDate.getDate() + 1);

        //const newBooking = { id: 0, room_name: 'Deluxe Room', room_price: '1000', isBreakfast: true, type: 'd', checkIn: '2024-04-08', checkOut: '2024-04-09' };

        let newBooking = {
            id: type === 'd' ? deluxeIdArrayCount : type === 'f' ? familyIdArrayCount : newRoomId, // here is the cat
            room_name: newRoomName,
            room_price: newRoomPrice,
            isBreakfast: isBreakfastVal,
            type: type,
            checkIn: formatDate(new Date()),
            checkOut: formatDate(newDate),
        }

        if (type === 'd') {
            decDC();
            incDeluxeIdArrayCount();
        }

        if (type === 'f') {
            decFC();
            incFamilyIdArrayCount();
        }

        window.scrollTo(0, 0);
        document.getElementById('room-selection-list-container').style.display = "none";
        document.getElementById('guest-details-input-container').style.display = "flex";
        setEditIndex(null);
        addRoom(newBooking);
    }

    const handleChange1 = (event) => {
        setInputValue1(event.target.value);
        setIsValid1(event.target.value.trim() !== '');
    };

    const handleChange2 = (event) => {
        setInputValue2(event.target.value);
        setIsValid2(event.target.value.trim() !== '');
    };

    const handleChange3 = (event) => {
        setInputValue3(event.target.value);
        setIsValid3(event.target.value.trim() !== '');
    };

    const handleChange4 = (event) => {
        setIsChecked(event.target.checked);
    };

    const handleConfirmBooking = () => {
        //simple function just to store the name, email and phone number values to be taken to review booking page
        setGuestName(inputValue1)
        setGuestEmail(inputValue2)
        setGuestPhone(inputValue3)
    }

    function nightsBetween(startDate, endDate) {
        // Ensure valid Date objects
        startDate = new Date(startDate);
        endDate = new Date(endDate);

        // Check if start date is after end date (invalid scenario)
        if (startDate > endDate) {
            alert("Invalid: Start date cannot be after end date");
            return (startDate)
        }

        // Get the time difference in milliseconds
        const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());

        // Convert to days and round up to include the last night
        const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        // Subtract 1 to exclude the check-in day
        return days;
    }

    return (
        <div id="bookingsPage">
            <p id="select-room-title">Book Your Stay</p>
            <div id="bookingDashboard">
                <div id="dashboard-main">
                    <div id="room-selection-list-container" style={{ display: bookingCart.length === 0 ? "flex" : "none" }}> {/* Left Dashboard - Main - 1 - default*/}
                        {availableRoomCategory.map((ar) => (
                            <div key={ar.id} id="room-selection-list">
                                <div id="room-details-container">
                                    <div className="room-details-content">
                                        <img alt='bedroom shot' src={gal} width='280' height='200' style={{ borderRadius: '0.5rem', objectFit: 'cover' }}></img>
                                        <div className="room-amenities">
                                            <div style={{ display: 'flex', margin: '0 0 0 2rem', textAlign: 'left' }}>
                                                <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>{ar.room_name} {ar.isBreakfast ? <span style={{ color: '#996132', fontWeight: '300', fontSize: '1rem' }}>(Room with Breakfast)</span> : <span style={{ color: '#996132', fontWeight: '300', fontSize: '1rem' }}>(Room Only)</span>}</p>
                                            </div>

                                            <div style={{ display: 'flex', textAlign: 'left', margin: '2rem' }}>
                                                <div style={{ margin: 0 }}>
                                                    <p className='amenItem'><span style={{ margin: '8px 8px 8px 0' }} className="material-symbols-outlined">fit_Screen</span> Room Size: xyz sq. ft.</p>
                                                    <p className='amenItem'><span style={{ margin: '8px 8px 8px 0' }} className="material-symbols-outlined">bed</span> Queen Bed</p>
                                                    <p className='amenItem'><span style={{ margin: '8px 8px 8px 0' }} className="material-symbols-outlined">bathtub</span> Bathtub</p>
                                                    <p className='amenItem'><span style={{ margin: '8px 8px 8px 0' }} className="material-symbols-outlined">groups</span> 3 pax maximum</p>
                                                    {ar.isBreakfast ? <p className='amenItem'><span style={{ margin: '8px 8px 8px 0' }} className="material-symbols-outlined">dinner_dining</span> Breakfast Included</p> : <p className='amenItem'><span style={{ margin: '8px 8px 8px 0' }} className="material-symbols-outlined">no_meals</span> Breakfast Not Included</p>}
                                                </div>
                                                <div style={{ margin: '0 0 0 1rem' }}>
                                                    <p className='amenItem'><span className="material-symbols-outlined">wifi</span> Free WiFi</p>
                                                    <p className='amenItem'><span className="material-symbols-outlined">chair</span> Pull-out Bed/Sofa</p>
                                                    <p className='amenItem'><span className="material-symbols-outlined">balcony</span> Private Balcony</p>
                                                    <p className='amenItem'><span className="material-symbols-outlined">self_care</span> Towels & Essentials</p>
                                                    <p className='amenItem'><span className="material-symbols-outlined">table_lamp</span> Personal Workspace</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div style={{ display: 'block', textAlign: 'right' }}>
                                        <p style={{ fontWeight: 'bold', fontSize: '1.5rem', margin: '2rem 5rem 0 0' }}>&#8377;{ar.room_price} <span style={{ color: '#996132', fontWeight: '300', fontSize: '1rem' }}>Per Night</span></p>
                                        <span style={{ margin: '0 5rem 0 0', color: '#996132', fontWeight: '300', fontSize: '1rem' }}>(Excluding Taxes & Fees)</span>
                                    </div>
                                    <button id="book-room-btn" disabled=
                                        {
                                            ar.type === 'd' ? (deluxeCount > 0 ? false : true) :
                                                ar.type === 'f' ? (familyCount > 0 ? false : true) : false} onClick={() => handleAddRoomToCart(ar.type === 'd' ? deluxeIddArray[deluxeIdArrayCount] : ar.type === 'f' ? familyIddArray[familyIdArrayCount] : ar.id, ar.room_name, ar.room_price, ar.isBreakfast, ar.type)} className="classicBtn" >Book Room</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div id="guest-details-input-container" style={{ display: bookingCart.length === 0 ? "none" : "flex" }}> {/* Left Dashboard - Main - 2*/}
                        <h3>Guest Details</h3>
                        <p style={{ margin: 0 }}>* Required Fields</p>
                        <div className="guest-details-input-form">
                            <input className="guest-input-item1" type="text" placeholder="Full Name *" value={inputValue1} onChange={handleChange1}></input>
                            <input className="guest-input-item-email" type="text" placeholder="Email Address *" value={inputValue2} onChange={handleChange2}></input>
                            <p style={{ margin: 0, fontSize: '0.8rem' }}>Your booking details will be sent to this Email ID.</p>
                            <input className="guest-input-item1" type="text" placeholder="Phone Number *" value={inputValue3} onChange={handleChange3}></input>
                            <textarea className="spReqInput" type="text" placeholder="Special Requests and Preferences"></textarea>
                            <div style={{ display: 'flex' }}>
                                <input style={{ display: 'inline-block' }} type="checkbox" checked={isChecked} onChange={handleChange4}></input>
                                <p style={{ display: 'inline-block', margin: 0 }}>I confirm that all information provided is accurate</p>
                            </div>
                            <p style={{ margin: 0 }}>& I agree with the booking conditions.</p>
                        </div>
                        {isValid1 && isValid2 && isValid3 && inputValue2.includes("@") && isChecked && <Link to="/review-booking" style={{ textDecoration: 'none', color: '#ffffff' }}><button id="confirm-booking-btn" onClick={() => handleConfirmBooking()} className="classicBtn">Confirm Booking</button></Link>}
                    </div>

                </div>

                <div id="room-selection-cart" style={{ overflowY: bookingCart.length > 1 ? 'scroll' : 'hidden', borderRadius: bookingCart.length > 1 ? '0.5rem 0 0 0.5rem' : '0.5rem' }}>  {/* Right Dashboard*/}
                    <h3>Your Bookings ({bookingCart.length})</h3>
                    {bookingCart.length === 0 ? (
                        <div style={{ margin: '3rem 0 0 0' }}>
                            <span style={{ fontSize: '2rem', color: '#996132' }} className="material-symbols-outlined">more_horiz</span>
                            <p>No Rooms Selected.</p>
                        </div>
                    ) :
                        bookingCart.map((item, index) => (
                            <div key={item.id} className={editIndex === index ? "editing" : "default"}>
                                <p style={{ fontWeight: 'bold' }}>{item.room_name}</p>
                                {item.isBreakfast ? <p>Breakfast Included</p> : <p>Room Only</p>}
                                <p style={{ fontStyle: 'italic' }}>{String(nightsBetween(item.checkIn, item.checkOut)) > 1 ? String(nightsBetween(item.checkIn, item.checkOut)) + " Nights" : String(nightsBetween(item.checkIn, item.checkOut)) + " Night"}</p>
                                <br></br>
                                <hr style={{ width: '3rem', border: 'solid 1px #ececec' }}></hr>
                                <p><span style={{ color: '#996132', fontWeight: 'bold', margin: '0 2.7rem 0 0' }}>Check-in</span> {formateDateStr(item.checkIn)}</p>
                                <p><span style={{ color: '#996132', fontWeight: 'bold', margin: '0 2rem 0 0' }}>Check-out</span> {formateDateStr(item.checkOut)}</p>
                                <hr style={{ width: '3rem', border: 'solid 1px #ececec' }}></hr>
                                <br></br>
                                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                    <p style={{ margin: '0 0 0 3rem' }}>Total</p>
                                    <p style={{ fontWeight: 'bold', margin: '0 3rem 0 0' }}>&#8377;{item.room_price * nightsBetween(item.checkIn, item.checkOut)}</p>
                                </div>

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
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div id="delete-booking-btn" onClick={() => handleDeleteClick(item.id, item.type)}><span className="material-symbols-outlined" style={{ margin: '0 0 0 0' }}>delete</span></div>
                                    <div id="edit-booking-btn" onClick={() => handleEditClick(index)}><span className="material-symbols-outlined" style={{ margin: '0 0.5rem 0 0', fontSize: '1rem' }}>edit_square</span>Edit</div>
                                </div>
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