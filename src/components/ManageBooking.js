import Footer from './Footer'
import React, { useState } from 'react'
import { supabase } from './supabase'

const ManageBooking = () => {

    const [bookingId, setBookingId] = useState();
    const [data, setData] = useState([]);

    const handleSearchBooking = async () => {
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

    return (
        <div id="manageBookingPage">
            <div className="manage-booking-content">
                <h2 style={{ color: '#996132' }}>Manage Your Bookings</h2>
                <p>Please enter your Booking ID</p>
                <div id="input-search-booking-container">
                    <input id="search-booking-input" onChange={(event) => setBookingId(event.target.value)} type="text" placeholder="Booking ID"></input>
                    <button id="search-booking-btn" onClick={() => handleSearchBooking()} className="classicBtn">Search</button>
                </div>

                <div>
                    {data ? (
                        data.length > 0 ? (
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
                            <p>No bookings available with the entered booking ID</p>
                        )
                    ) : null}
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