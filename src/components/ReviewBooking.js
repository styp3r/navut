import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import useStore from './store';
import { Link, useNavigate } from 'react-router-dom';
import supabase from './supabase'
import RazorpayIcon from '../images/decoration/razorpay-icon.png'
import emailjs from '@emailjs/browser';

const ReviewBooking = () => {

    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Optional smooth scrolling behavior
    });

    const { bookingCart, guestName, guestEmail, guestPhone, guestCountry } = useStore();
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


    const handleUpdateRCM = () => { // BUG

        function generateDates(checkin, checkout) {
            let startDate = new Date(checkin);
            let endDate = new Date(checkout);
            let datesBetween = [];

            while (startDate <= endDate) {
                datesBetween.push(startDate.toISOString().split('T')[0]);
                startDate.setDate(startDate.getDate() + 1);
            }

            return datesBetween;
        }

        let dates = [];
        let dateArr = [];

        bookingCart.forEach(booking => {
            dates = generateDates(booking.checkIn, booking.checkOut);

            for (let i = 0; i < dates.length; i++) {
                if ((i + 1) < dates.length) {
                    let upload = { today: dates[i], tomorrow: dates[i + 1], roomName: booking.room_name }
                    dateArr.push(upload)
                }
            }
        });

        const duplicatesArray = [];

        dateArr.forEach(obj => {
            const foundIndex = duplicatesArray.findIndex(item =>
                item.roomName === obj.roomName &&
                item.today === obj.today &&
                item.tomorrow === obj.tomorrow
            );

            if (foundIndex !== -1) {
                // If duplicate found, increment count
                duplicatesArray[foundIndex].count++;
            } else {
                // If no duplicate found, add with count 1
                duplicatesArray.push({ ...obj, count: 1 });
            }
        });

        //console.log(duplicatesArray)

        //compare dateArr with rcm
        const fetchRCMData = async () => {
            try {
                const { data: fetchedrcm, error } = await supabase
                    .from('rcm')
                    .select('*');

                if (error) {
                    throw error;
                }

                let flag = 0;
                let isSoldOut = 0;

                if (fetchedrcm.length === 0) {
                    //console.log("Database empty. Insert duplicatesArray entirely.") // database empty
                    flag = 0;
                    isSoldOut = 0;
                    for (const obj of duplicatesArray) {
                        const { error1 } = await supabase
                            .from('rcm')
                            .insert({ room_type: obj.roomName, check_in: obj.today, check_out: obj.tomorrow, count: obj.count, limit: obj.roomName === "Deluxe Room" ? 4 : 2 });

                        if (error1) {
                            throw error1;
                        }
                    }

                    //console.log("Successful Booking. Go to booking confirmed page.")
                } else {

                    //database is not empty
                    for (const obj1 of duplicatesArray) {
                        let conditionSatisfied = false; // Flag to check if any matching condition is satisfied
                        for (const obj2 of fetchedrcm) {
                            if (obj1.today === obj2.check_in && obj1.tomorrow === obj2.check_out && obj1.roomName === obj2.room_type) {
                                //console.log("There is an existing booking for " + obj1.roomName + " - " + obj1.today + " to " + obj1.tomorrow);
                                if (obj2.count < obj2.limit && (obj1.count + obj2.count) <= obj2.limit) {
                                    //console.log("Rooms are available! Update count");
                                    conditionSatisfied = true; // Set flag to true if condition satisfied
                                    const { error } = await supabase
                                        .from('rcm')
                                        .update({
                                            count: obj2.count + obj1.count,
                                        })
                                        .eq('id', obj2.id);

                                    if (error) {
                                        throw error
                                    }
                                }
                            }
                        }

                        if (!conditionSatisfied) {
                            // If no matching condition is satisfied, insert a new row
                            //console.log("No existing booking found. Insert new row.");
                            // Your insertion code here
                            const { error1 } = await supabase
                                .from('rcm')
                                .insert({ room_type: obj1.roomName, check_in: obj1.today, check_out: obj1.tomorrow, count: 1, limit: obj1.roomName === 'Deluxe Room' ? 4 : 2 });

                            if (error1) {
                                throw error1;
                            }
                        }
                    }

                }

                if (flag === 0 && isSoldOut === 0) {
                    navigate("/booking-confirmed")
                    return true;
                } else {
                    return null;
                }

            } catch (error) {
                console.error('Error fetching rcm data:', error.message);
                // Handle errors (display message, retry logic)
            }
        };

        fetchRCMData();

    }


    const handleUploadData = async () => {

        try {
            for (const item of bookingCart) {
                const bookingObject = {
                    "unique_id": generateUniqueId(5),
                    "booking_id": bookingID,
                    "guest_name": guestName,
                    "guest_email": guestEmail,
                    "guest_phone": guestPhone,
                    "guest_country": guestCountry,
                    "room_name": item.room_name,
                    "room_price": item.room_price,
                    "isConflict": item.isConflict,
                    "check_in": item.checkIn,
                    "check_out": item.checkOut,
                    "adult_count": item.adultCount,
                    "child_count": item.childCount,
                    "nights": nightsBetween(item.checkIn, item.checkOut),
                    "extras": item.isBreakfast ? "Breakfast Included" : "Breakfast Not Included",
                };

                // Insert each booking object individually
                const { error } = await supabase
                    .from('bookingData')
                    .insert({
                        created_at: String(new Date()),
                        room_type: item.room_name,
                        checkin_date: item.checkIn,
                        checkout_date: item.checkOut,
                        bookings: bookingObject,
                    });

                if (error) {
                    throw error;
                }
            }

            // Send confirmation email to guest
            emailjs.send('service_jx4464p', 'template_dkq2u9i', {
                booking_id: bookingID,
                guest_email: guestEmail,
                from_name: guestName,
            }, '7PzgVLJyaETaq4eQh')
                .then((result) => {
                    console.log('Email sent successfully:', result.text);
                }, (error) => {
                    console.log('Error sending email:', error.text);
                });

            // Update rcm
            handleUpdateRCM();
            //console.log('Booking Data uploaded successfully');
            document.getElementById('error-booking-upload').style.display = 'none';
        } catch (error) {
            document.getElementById('error-booking-upload').style.display = 'flex';
            console.error('Error uploading data:', error.message);
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

            <div className="progress-bar">
                <div style={{ display: 'flex' }}>
                    <span class="material-symbols-outlined">line_start</span>
                </div>
                <div className="progress-divider">
                    <hr style={{ width: '100%', height: '0', border: 'solid 1px #996132', opacity: '1' }}></hr>
                </div>
                <div style={{ opacity: '1' }}>
                    <span class="material-symbols-outlined">radio_button_checked</span>
                </div>
                <div className="progress-divider">
                    <hr style={{ width: '100%', height: '0', border: 'solid 1px #996132', opacity: '1' }}></hr>
                </div>
                <div style={{ display: 'flex', opacity: '0.2' }}>
                    <span class="material-symbols-outlined">line_end_circle</span>
                </div>
            </div>

            <div className="go-back-btn-container">
                <Link to="/bookings"><span className="material-symbols-outlined go-back-btn">arrow_circle_left</span></Link>
                <p style={{ margin: '0 0 0 0.5rem', color: '#996132', fontWeight: '500' }}>Go Back</p>
            </div>
            <p className="review-booking-page-title">Review Your Booking</p>
            <p id="error-booking-upload"><span className="material-symbols-outlined">warning</span>Internal Server Error. Please Try Again Later.</p>
            {bookingCart.length === 0 ? (
                <div style={{ width: '100%', height: windowHeight, margin: '5rem 0 0 0' }}>
                    <span style={{ fontSize: '3rem', color: '#996132' }} className="material-symbols-outlined">error</span>
                    <p>Looks like you haven't made any Bookings.</p>
                    <p>Please book your stay from our <Link to="/bookings" style={{ textDecoration: 'none', color: '#996132', fontWeight: 'bold' }}>Bookings Page</Link></p>
                </div>
            ) : (
                <div id="display-final-booking-container">

                    <div className="review-booking-left">
                        <p className="your-stay-title">Your Stay</p>
                        {bookingCart.map((item) => (
                            <div id="display-booking-details" key={item.id}>
                                <div style={{ width: '100%', textAlign: 'left', margin: '0 0 0 2rem' }}>
                                    <p style={{ fontWeight: '500', fontSize: '1.3rem', color: '#996132' }}>{item.room_name}</p>
                                    <p>{String(nightsBetween(item.checkIn, item.checkOut)) > 1 ? String(nightsBetween(item.checkIn, item.checkOut)) + " Nights, \u20B9" + item.room_price + " per night" : String(nightsBetween(item.checkIn, item.checkOut)) + " Night, \u20B9" + item.room_price + " per night"}</p>
                                </div>
                                <p style={{ width: '100%', display: 'flex', margin: '0 0 0 2rem' }}>{parseInt(item.adultCount) > 1 ? item.adultCount + " Adults" : item.adultCount + " Adult"}, {parseInt(item.childCount) !== 1 ? item.childCount + " Children" : item.childCount + " Child"}</p>
                                <div id="review-dates">
                                    <p id="review-checkin-date">{"Check-in: "}<strong>{formatDateStr(String(item.checkIn))}</strong></p>
                                    <p>{"Check-out: "}<strong>{formatDateStr(String(item.checkOut))}</strong></p>
                                </div>
                                <div className="display-booking-details-bottom">
                                    <p style={{ margin: '2rem' }}>{item.isBreakfast ? "Extras: Breakfast Included" : "Extras: N/A"}</p>
                                    <p style={{ fontWeight: '600', fontSize: '1.1rem', margin: '2rem' }}>{"\u20B9 " + item.room_price * nightsBetween(item.checkIn, item.checkOut)}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="review-booking-right">
                        <p className="guest-details-title">Guest Details</p>
                        <div id="display-guest-details">
                            <p className="display-guest-details-item"><span style={{ fontWeight: '500', color: '#996132' }}>Guest Name:</span> {guestName}</p>
                            <p className="display-guest-details-item"><span style={{ fontWeight: '500', color: '#996132' }}>Email Address:</span> {guestEmail}</p>
                            <p className="display-guest-details-item"><span style={{ fontWeight: '500', color: '#996132' }}>Country:</span> {guestCountry}</p>
                            <p className="display-guest-details-item"><span style={{ fontWeight: '500', color: '#996132' }}>Phone:</span> {guestPhone}</p>

                        </div>
                        <div id="display-payment-details-container">
                            <p style={{ fontWeight: '500', margin: '1rem 1rem 2rem 1rem' }}>Payment Summary</p>
                            <div style={{ width: '80%', display: 'flex', justifyContent: 'space-between' }}>
                                <p>Total</p>
                                <p>&#8377; {total}</p>
                            </div>
                            <div style={{ width: '80%', display: 'flex', justifyContent: 'space-between' }}>
                                <p>Taxes & Fees - 18%</p>
                                <p>&#8377; {(total * 0.18).toFixed(2)}</p>
                            </div>
                            <div className="grand-total-container">
                                <p style={{ color: '#996132' }}>Grand Total</p>
                                <p style={{ color: '#996132' }}>&#8377; {(total + (total * 0.18)).toFixed(2)}</p>
                            </div>
                            <button id="pay-now-btn" disabled onClick={() => handleUploadData()}>Pay Now <span className="material-symbols-outlined" style={{ margin: '0 0 0 0.5rem' }}>encrypted</span></button>
                            <p style={{ width: '80%', backgroundColor: '#ff8c66', borderRadius: '0.5rem', padding: '0.5rem', color: '#ffffff' }}>We are currently not accepting new bookings!</p>
                            <div style={{ width: '80%', display: 'flex', justifyContent: 'center' }}>
                                <img alt='payment partner icon' src={RazorpayIcon} width='90' height='20' style={{ margin: '1rem' }} ></img>
                            </div>
                        </div>
                    </div>

                </div>

            )}
            <Footer />
        </div>
    );
};

export default ReviewBooking;

/* 

for (const obj1 of dateArr) {
                    for (const obj2 of fetchedrcm) {
                        if (obj1.today === obj2.check_in && obj1.tomorrow === obj2.check_out && obj1.roomName === obj2.room_type) {
                            console.log("There is an existing booking for " + obj1.roomName + " - " + obj1.today + " to " + obj1.tomorrow);
                            if (obj2.count < obj2.limit) {
                                console.log("Rooms are available!");
                            } else {
                                flag = 1;
                                console.log("Rooms are sold out! :(")
                                document.getElementById("conflict-message").style.display = "flex";
                                document.getElementById("conflict-message").textContent = "There are no vacancies for " + obj1.roomName + " for the following dates: " + formatDateStr(String(obj1.today)) + " and " + formatDateStr(String(obj1.tomorrow));
                                break;
                            }
                        } else if (obj1.roomName === obj2.room_type) {
                            console.log("There are no existing bookings for " + obj1.roomName + " - " + obj1.today + " to " + obj1.tomorrow + ". Create a new booking.")
                        }
                    }
                }

                */

/* Old Code

 
const updateRCM = async (roomType, checkIn, checkOut) => {

function generateDates(checkin, checkout) {
let startDate = new Date(checkin);
let endDate = new Date(checkout);
let datesBetween = [];

while (startDate <= endDate) {
datesBetween.push(startDate.toISOString().split('T')[0]);
startDate.setDate(startDate.getDate() + 1);
}

return datesBetween;
}

let dates = [];
let dateArr = [];

bookingCart.forEach(booking => {
dates = generateDates(booking.checkIn, booking.checkOut);

for (let i = 0; i < dates.length; i++) {
if ((i + 1) < dates.length) {
    let upload = { today: dates[i], tomorrow: dates[i + 1], roomName: booking.room_name }
    dateArr.push(upload)
}
}
});


//updating rcm
try {
const { data: fetchedrcm, error } = await supabase
.from('rcm')
.select('*');

// Iterate over fetchedrcm array to check if any row matches the given criteria
let found = false;
for (const row of fetchedrcm) {
if (row.room_type === roomType && checkIn < row.check_out && checkOut > row.check_in) {
    found = true;
        const { error } = await supabase
            .from('rcm')
            .update({ isConflictCount: row.isConflictCount + 1 })
            .eq('id', row.id);

        const { error1 } = await supabase
            .from('rcm')
            .insert({ room_type: roomType, check_in: checkIn, check_out: checkOut, isConflictCount: row.isConflictCount + 1 });

        if (error1) {
            throw error1;
        }


        if (error) {
            throw error;
        }
        //break; // Exit the loop once a matching row is found and updated
}
}

// If no matching row is found, insert a new row
if (!found) {
const { error } = await supabase
    .from('rcm')
    .insert({ room_type: roomType, check_in: checkIn, check_out: checkOut, isConflictCount: 1 });

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

*/