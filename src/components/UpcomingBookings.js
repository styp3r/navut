import React, { useState, useEffect } from 'react'
import supabase from './supabase'

const UpcomingBookings = () => {

    const [data, setData] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const { data: fetchedBookings, error } = await supabase
                    .from('bookingData')
                    .select('bookings');

                if (error) {
                    throw error;
                }

                return fetchedBookings;
            } catch (error) {
                console.error('Error fetching bookings:', error.message);
                // Handle errors (display message, retry logic)
            }
        };

        const updateState = async () => {
            const bookings = await fetchData();

            if (bookings) {
                setData(bookings);
            }
        };
        updateState();
    }, []);


    const formatDateStr = (dateString) => {
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
        <div id="upcoming-bookings-page">
            <h3 style={{ padding: '10rem 0 0 0' }}>Upcoming Bookings</h3>

            {data.length > 0 ? (
                data.map((filteredItem, index) => {
                    const isFirstBooking = index === 0 || filteredItem.bookings.guest_name !== data[index - 1].bookings.guest_name; // Check if it's the first booking or a new guest

                    return (
                        <div key={index} className="upcoming-bookings-list">
                            {isFirstBooking && (
                                <div className="manage-booking-details-container-upcoming">
                                    <hr style={{ width: '100%', border: 'solid 1px #f2f2f2', margin: '0 0 3rem 0' }} />
                                    <div className="booking-details-header-upcoming">
                                        <div className="booking-details-header1">
                                            <p>Guest Name: <span style={{ fontWeight: 'bold', color: '#996132' }}>{(filteredItem.bookings.guest_name).toUpperCase()}</span></p>
                                            <p>Booking ID: {filteredItem.bookings.booking_id}</p>
                                        </div>
                                        <div className="booking-details-header2">
                                            <p>Guest Phone: {filteredItem.bookings.guest_phone}</p>
                                        </div>
                                    </div>
                                    <p className="paid-icon">PAID <span style={{ margin: '0 0 0 0.3rem' }} className="material-symbols-outlined">check_circle</span></p>
                                </div>
                            )}

                            <div className="manage-booking-details-container">
                                <div className="booking-details-list">
                                    <div style={{ padding: '2rem', width: '90%' }}>
                                        <p style={{ fontWeight: 'bold' }}>{filteredItem.bookings.room_name}</p>
                                        <p>{filteredItem.bookings.nights > 1 ? filteredItem.bookings.nights + " Nights" : filteredItem.bookings.nights + " Night"}</p>
                                        <p>Check-in: {formatDateStr(String(filteredItem.bookings.check_in))}</p>
                                        <p>Check-out: {formatDateStr(String(filteredItem.bookings.check_out))}</p>
                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <p>Extras: {filteredItem.bookings.extras}</p>
                                            <p>&#8377; {filteredItem.bookings.room_price}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <p>No Upcoming Bookings!</p>
            )}

        </div>
    );
}

export default UpcomingBookings;