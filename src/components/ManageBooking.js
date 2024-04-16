import Footer from './Footer'
import React, { useState, useEffect } from 'react'
import { supabase } from './supabase'

const ManageBooking = () => {

    const [bookingId, setBookingId] = useState();
    const [data, setData] = useState([]);
    const [notFoundMessage, setNotFoundMessage] = useState(false);

    const handleSearchBooking = async () => {
        setNotFoundMessage(true)
        console.log('catch')
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
                <h2 style={{ color: '#996132' }}>Manage Your Bookings</h2>
                <p>Please enter the Booking ID received at the time of booking.</p>
                <div id="input-search-booking-container">
                    <input id="search-booking-input" onChange={(event) => setBookingId(event.target.value)} type="text" placeholder="Booking ID"></input>
                    <button id="search-booking-btn" onClick={() => handleSearchBooking()} className="classicBtn">Search</button>
                </div>

                <div>
                    {data ? (
                        (bookingId && data.length > 0 && data[0].bookings.booking_id === bookingId) ? (
                            // Render booking data
                            <div>
                                <p>Booking ID: {data[0].bookings.booking_id}</p>
                                <p>Guest Name: {data[0].bookings.guest_name}</p>
                                <p>Guest Email: {data[0].bookings.guest_email}</p>
                                <p>Guest Phone: {data[0].bookings.guest_phone}</p>
                                {data.map((item, index) => (
                                    <div key={index}>
                                        <p>{item.bookings.room_name}</p>
                                        <p>{item.bookings.room_price}</p>
                                        <p>{item.bookings.nights}</p>
                                        <p>{item.bookings.extras}</p>
                                        <p>{item.bookings.check_in}</p>
                                        <p>{item.bookings.check_out}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            // No bookings found
                            notFoundMessage ? (bookingId ? <p style={{ color: '#ed5e68', fontWeight: 'bold' }}>Invalid Booking ID!</p> : null) : null
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