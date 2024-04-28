import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import useStore from './store';
import { Link, useNavigate } from 'react-router-dom';
import supabase from './supabase'
import RazorpayIcon from '../images/decoration/razorpay-icon.png'

const ReviewBooking = () => {

    const { bookingCart, guestName, guestEmail, guestPhone } = useStore();
    const [bookingID, setBookingID] = useState('');
    const navigate = useNavigate();
    const windowHeight = window.innerHeight;
    let total = 0;

    function nightsBetween(startDate, endDate) {
        // Ensure valid Date objects
        startDate = new Date(startDate);
        endDate = new Date(endDate);

        // Get the time difference in milliseconds
        const timeDiff = Math.abs(endDate - startDate);

        // Convert to days and round up to include the last night
        const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        // Subtract 1 to exclude the check-in day
        return days;
    }

    // This is to calculate the grand total for all the selected rooms in cart
    for (let i = 0; i < bookingCart.length; i++) {
        total = total + (bookingCart[i].room_price * nightsBetween(bookingCart[i].checkIn, bookingCart[i].checkOut));
    }

    function generateBookingId(length) {
        // Define the character set for alphanumeric characters
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        // Create an empty string to store the booking ID
        let bookingId = "";

        // Loop for the desired length of the booking ID
        for (let i = 0; i < length; i++) {
            // Get a random index from the character set
            const randomIndex = Math.floor(Math.random() * chars.length);

            // Extract the character at the random index and append it to the booking ID
            bookingId += chars.charAt(randomIndex);
        }

        // Return the generated booking ID
        setBookingID(bookingId.toUpperCase());
    }

    function generateUniqueId(length) {
        // Define the character set for alphanumeric characters
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        // Create an empty string to store the unique ID
        let uniqueId = "";

        // Loop for the desired length of the unique ID
        for (let i = 0; i < length; i++) {
            // Get a random index from the character set
            const randomIndex = Math.floor(Math.random() * chars.length);

            // Extract the character at the random index and append it to the unique ID
            uniqueId += chars.charAt(randomIndex);
        }

        // Return the generated unique ID
        return uniqueId;
    }

    useEffect(() => {
        // Your side effect logic here
        generateBookingId(10);
    }, []);

    const updateRCM = async (roomType, checkIn, checkOut) => {
        try {
            const { data: fetchedrcm, error } = await supabase
                .from('rcm')
                .select('*');

            // Iterate over fetchedrcm array to check if any row matches the given criteria
            let found = false;
            for (const row of fetchedrcm) {
                if (row.room_type === roomType && row.check_in === checkIn && row.check_out === checkOut) {
                    found = true;
                    const { error } = await supabase
                        .from('rcm')
                        .update({ count: row.count + 1 })
                        .eq('id', row.id);

                    if (error) {
                        throw error;
                    }
                    break; // Exit the loop once a matching row is found and updated
                }
            }

            // If no matching row is found, insert a new row
            if (!found) {
                const { error } = await supabase
                    .from('rcm')
                    .insert({ room_type: roomType, check_in: checkIn, check_out: checkOut, count: 1 });

                if (error) {
                    throw error;
                }
            }

            // Handle any error occurred during the operations
            if (error) {
                throw error;
            }

            navigate("/booking-confirmed")
            window.location.reload();
            //return fetchedrcm;
        } catch (error) {
            console.error('Error fetching bookings:', error.message);
            // Handle errors (display message, retry logic)
        }
    };



    const handleUploadData = async () => {

        try {
            let createdNow = String(new Date());

            for (const item of bookingCart) {
                const bookingObject = {
                    "unique_id": generateUniqueId(5),
                    "booking_id": bookingID,
                    "guest_name": guestName,
                    "guest_email": guestEmail,
                    "guest_phone": guestPhone,
                    "room_name": item.room_name,
                    "room_price": item.room_price,
                    "isConflict": item.isConflict,
                    "check_in": item.checkIn,
                    "check_out": item.checkOut,
                    "adult_count": item.adultCount,
                    "child_count": item.childCount,
                    "nights": nightsBetween(item.checkIn, item.checkOut),
                    "extras": item.isBreakfast ? "Breakfast Included" : "Breakfast Not Included",
                    created_at: createdNow
                };

                // Insert each booking object individually
                const { error } = await supabase
                    .from('bookingData')
                    .insert({
                        created_at: String(new Date()),
                        bookings: bookingObject,
                    });

                if (error) {
                    throw error;
                }
            }

            console.log('Booking Data uploaded successfully');
            document.getElementById('error-booking-upload').style.display = 'none';
        } catch (error) {
            document.getElementById('error-booking-upload').style.display = 'flex';
            console.error('Error uploading data:', error.message);
        }

        // Update rcm
        for (const item of bookingCart) {
            updateRCM(item.room_name, item.checkIn, item.checkOut);
        }
    };

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
        <div id="review-booking-page">
            <p style={{ margin: '12rem 0 2rem 0', fontSize: '2rem', color: '#996132' }}>Review Booking</p>
            <p id="error-booking-upload"><span className="material-symbols-outlined">warning</span>Internal Server Error. Please Try Again Later.</p>
            {bookingCart.length === 0 ? (
                <div style={{ width: '100%', height: windowHeight, margin: '5rem 0 0 0' }}>
                    <span style={{ fontSize: '3rem', color: '#996132' }} className="material-symbols-outlined">error</span>
                    <p>Looks like you haven't made any Bookings.</p>
                    <p>Please book your stay from our <Link to="/bookings" style={{ textDecoration: 'none', color: '#996132', fontWeight: 'bold' }}>Bookings Page</Link></p>
                </div>
            ) : (
                <div id="display-final-booking-container">
                    <div id="display-booking-details-container">
                        <p className="guest-details-title">Guest Details</p>
                        <div id="display-guest-details">
                            <div className="guest-name-container">
                                <p>Guest Name: {guestName}</p>
                                <p>Email Address: {guestEmail}</p>
                            </div>
                            <div className="guest-phone-container">
                                <p>Phone: {guestPhone}</p>
                            </div>
                        </div>
                        <p className="your-stay-title">Your Stay</p>
                        {bookingCart.map((item) => (
                            <div id="display-booking-details" key={item.id}>
                                <div style={{ width: '20rem', margin: '1rem 40rem 0 3.1rem', textAlign: 'left' }}>
                                    <p style={{ fontWeight: 'bold', fontSize: '1.3rem', color: '#996132' }}>{item.room_name}</p>
                                    <p>{String(nightsBetween(item.checkIn, item.checkOut)) > 1 ? String(nightsBetween(item.checkIn, item.checkOut)) + " Nights, \u20B9" + item.room_price + " per night" : String(nightsBetween(item.checkIn, item.checkOut)) + " Night, \u20B9" + item.room_price + " per night"}</p>
                                </div>
                                <p>Adults: {item.adultCount}</p>
                                <p>Children: {item.childCount}</p>
                                <div id="review-dates">
                                    <p id="review-checkin-date">{"Check-in: "}<strong>{formatDateStr(String(item.checkIn))}</strong></p>
                                    <p>{"Check-out: "}<strong>{formatDateStr(String(item.checkOut))}</strong></p>
                                </div>
                                    <p>{item.isBreakfast ? "Extras: Breakfast Included" : "Extras: N/A"}</p>
                                    <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{"\u20B9 " + item.room_price * nightsBetween(item.checkIn, item.checkOut)}</p>
                                
                            </div>
                        ))}
                    </div>
                    <div id="display-payment-details-container">
                        <p style={{ fontWeight: 'bold', margin: '1rem 1rem 2rem 1rem' }}>Payment Summary</p>
                        <div style={{ width: '80%', display: 'flex', justifyContent: 'space-between' }}>
                            <p>Total</p>
                            <p>&#8377; {total}</p>
                        </div>
                        <div style={{ width: '80%', display: 'flex', justifyContent: 'space-between' }}>
                            <p>Taxes & Fees (18%)</p>
                            <p>&#8377; {total * 0.18}</p>
                        </div>
                        <p style={{ margin: 0, color: '#cecece' }}>---------------------------------</p>
                        <div style={{ width: '80%', display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Grand Total</h3>
                            <h3>&#8377; {total + (total * 0.18)}</h3>
                        </div>
                        <button id="pay-now-btn" onClick={() => handleUploadData()}><span className="material-symbols-outlined" style={{ margin: '0 0.5rem 0 0' }}>encrypted</span>Pay Now</button>
                        <img alt='payment partner icon' src={RazorpayIcon} width='90' height='20' style={{ margin: '1rem' }} ></img>
                    </div>
                </div>

            )}
            <Footer />
        </div>
    );
};

export default ReviewBooking;
