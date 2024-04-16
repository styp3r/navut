import Footer from './Footer'
import React, { useState } from 'react'
import { supabase } from './supabase'

const ManageBooking = () => {

    const [bookingId, setBookingId] = useState();
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [uniqueId, setUniqueId] = useState();

    const handleOpenModal = (unique) => {
        setUniqueId(unique)
        setShowModal(true);
    };

    const handleDelete = () => {
        alert('Booking deleted.'); // Replace with your delete logic
        setShowModal(false); // Close the modal after delete
    };

    const handleCancel = () => {
        setShowModal(false);
    };

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
                <div className="manage-booking-search-container">
                    <h2 style={{ color: '#996132' }}>Manage Your Bookings</h2>
                    <div id="input-search-booking-container">
                        <input id="search-booking-input" onChange={(event) => setBookingId(event.target.value)} type="text" placeholder="Booking ID"></input>
                        <button id="search-booking-btn" onClick={() => handleSearchBooking()} className="classicBtn">Search</button>
                    </div>
                </div>

                <div>
                    {showModal && ( // Conditionally render modal when showModal is true
                        <div className="modal">
                            <div className="modal-content">
                                <div style={{ margin: '2rem', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <span style={{ margin: '0 0.5rem 0.1rem 0', color: '#ed5e68', fontSize: '3rem' }} className="material-symbols-outlined">warning</span>
                                </div>
                                <p>Are you sure you want to delete {uniqueId}?</p>
                                <p>This action cannot be reversed.</p>
                                <div className="buttons">
                                    <button id="delete-btn-choice" onClick={handleDelete}>Delete</button>
                                    <button id="cancel-btn-choice" style={{ width: '5rem', height: '2rem', margin: '1rem 5rem 1rem 1rem', backgroundColor: '#cecece', outline: 'none', border: 'none', color: '#5b5b5b', borderRadius: '0.5rem' }} onClick={handleCancel}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    )}
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
                                        <div id="manage-delete-btn" onClick={() => handleOpenModal(item.bookings.room_name)}>
                                            <span style={{ color: '#ffffff' }} className="material-symbols-outlined">delete</span>
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