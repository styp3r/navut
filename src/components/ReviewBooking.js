import React from 'react'
import Footer from './Footer'
import useStore from './store'
import { Link } from 'react-router-dom'

const ReviewBooking = () => {

    const { bookingCart, guestName, guestEmail, guestPhone } = useStore();
    const windowHeight = window.innerHeight;
    let total = 0;

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

    // This is to calculate the grand total for all the selected rooms in cart
    for (let i = 0; i < bookingCart.length; i++) {
        total = total + (bookingCart[i].room_price * nightsBetween(bookingCart[i].checkIn, bookingCart[i].checkOut));
    }

    return (
        <div id="review-booking-page">
            <h3 style={{ margin: '7rem 0 0 0' }}>Review Bookings</h3>
            <div id="display-final-booking-container">
                <div id="display-booking-details-container">
                    <div id = "display-guest-details">
                        <p>{guestName}</p>
                        <p>{guestEmail}</p>
                        <p>{guestPhone}</p>
                    </div>

                    <div id="display-booking-details">
                        {bookingCart.length === 0 ? (
                            <div style={{ width: '100%', height: windowHeight, margin: '5rem 0 0 0' }}>
                                <span style={{ fontSize: '3rem', color: '#996132' }} className="material-symbols-outlined">error</span>
                                <p>Looks like you haven't made any Bookings.</p>
                                <p>Please book your stay from our <Link to="/bookings" style={{ textDecoration: 'none', color: '#996132', fontWeight: 'bold' }}>Bookings Page</Link></p>
                            </div>
                        ) : bookingCart.map((item) => (
                            <div key={item.id}>
                                <p>{item.room_name}</p>
                                <p>{item.room_price * nightsBetween(item.checkIn, item.checkOut)}</p>
                                <p>{formateDateStr(item.checkIn)}</p>
                                <p>{formateDateStr(item.checkOut)}</p>
                                <p>{String(nightsBetween(item.checkIn, item.checkOut)) > 1 ? String(nightsBetween(item.checkIn, item.checkOut)) + " Nights" : String(nightsBetween(item.checkIn, item.checkOut)) + "Night"}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div id = "display-payment-details-container">
                    <p>Payment Details</p>
                    <p>Grand Total {total}</p>
                </div>

            </div>
            <Footer />
        </div>
    );
}

export default ReviewBooking;