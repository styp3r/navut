import Footer from './Footer'
import React, { useState, useEffect } from 'react'
import { supabase } from './supabase'

const ManageBooking = () => {

    const [bookingId, setBookingId] = useState();
    const [data, setData] = useState([]);
    const [notFoundMessage, setNotFoundMessage] = useState(false);

    const handleSearchBooking = async () => {
        setNotFoundMessage(true)
        try {
            const { data: fetchedData, error } = await supabase
                .from('bookingData')
                .select('bookings')

            if (error) {
                throw error;
            }

            // Update state with fetched data
            setData(fetchedData);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    useEffect(() => {
        // Call setNotFoundMessageFalse only if data exists and booking data is rendered
        if (data && bookingId && data.length > 0 && data[0].bookings.booking_id === bookingId) {
            setNotFoundMessage(false);
        }
    }, [data, bookingId]);

    return (
        <div id="manageBookingPage">
            <div className="manage-booking-content">
                <div className="manage-booking-search-container">
                    <h2 style={{ color: '#996132' }}>Manage Your Bookings</h2>
                    <div id="input-search-booking-container">
                        <input id="search-booking-input" onChange={(event) => setBookingId(event.target.value)} type="text" placeholder="Booking ID"></input>
                        <button id="search-booking-btn" onClick={() => handleSearchBooking()} className="classicBtn">Search</button>
                    </div>
                </div>

                <div>
                    {data ? (
                        (bookingId && data.length > 0 && data[0].bookings.booking_id === bookingId) ? (
                            // Render booking data
                            <div className="manage-booking-details-container">
                                <hr style={{ width: '7rem', border: 'solid 1px #cecece' }}></hr>
                                <p style={{ fontSize: '2rem', color: '#996132' }}>Hello, {((data[0].bookings.guest_name).split(' '))[0]}! We look forward to your stay with us.</p>
                                <div className="booking-details-header">
                                    <div className="booking-details-header1">
                                        <p>Booking ID: {data[0].bookings.booking_id}</p>
                                        <p>Guest Email: {data[0].bookings.guest_email}</p>
                                    </div>
                                    <div className="booking-details-header2">
                                        <p>Guest Name: {data[0].bookings.guest_name}</p>
                                        <p>Guest Phone: {data[0].bookings.guest_phone}</p>
                                    </div>
                                </div>

                                {data.map((item, index) => (
                                    <div key={index} className="booking-details-list">
                                        <div style={{ padding: '2rem', width: '90%' }}>
                                            <p style={{ fontWeight: 'bold' }}>{item.bookings.room_name}</p>
                                            <p>{item.bookings.nights}</p>
                                            <p>Check-in: {item.bookings.check_in}</p>
                                            <p>Check-out: {item.bookings.check_out}</p>
                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <p>Extras: {item.bookings.extras}</p>
                                                <p>&#8377; {item.bookings.room_price}</p>
                                            </div>
                                        </div>
                                        <div id = "manage-delete-btn">
                                            <span style = {{color: '#ffffff'}} className="material-symbols-outlined">delete</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            // No bookings found
                            <p style={{ color: '#ed5e68', fontWeight: 'bold' }}>Please enter a valid Booking ID</p>
                        )
                    ) :
                        null}
                </div>

            </div>
            <Footer />
        </div>
    );
}

export default ManageBooking;

/*
<div>
                                <p>{item.bookings.guest_name}</p>
                                <p>{item.bookings.guest_email}</p>
                                <p>{item.bookings.guest_phone}</p>
                                <p>{item.bookings.room_name}</p>
                                <p>{item.bookings.room_price}</p>
                                <p>{item.bookings.nights}</p>
                                <p>{item.bookings.extras}</p>
                                <p>{item.bookings.check_in}</p>
                                <p>{item.bookings.check_out}</p>
                            </div>*/