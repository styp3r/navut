import Footer from './Footer'
import React, { useState } from 'react'
import supabase from './supabase'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageBooking = () => {
    window.scrollTo(0, 0);

    const [bookingId, setBookingId] = useState();
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [roomNameDelete, setRoomNameDelete] = useState();
    const [checkIn, setCheckIn] = useState();
    const [checkOut, setCheckOut] = useState();
    const [uniqueId, setUniqueId] = useState();

    const handleOpenModal = (roomName, unique, checkin, checkout) => {
        setRoomNameDelete(roomName)
        setCheckIn(checkin)
        setCheckOut(checkout)
        setUniqueId(unique)
        setShowModal(true);
    };

    const handleUpdateRCM = () => {

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
        dates = generateDates(checkIn, checkOut);

        for (let i = 0; i < dates.length; i++) {
            if ((i + 1) < dates.length) {
                let upload = { today: dates[i], tomorrow: dates[i + 1], roomName: roomNameDelete }
                dateArr.push(upload)
            }
        }

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

                for (const obj1 of duplicatesArray) {
                    for (const obj2 of fetchedrcm) {
                        if (obj1.today === obj2.check_in && obj1.tomorrow === obj2.check_out && obj1.roomName === obj2.room_type) {
                            //console.log("There is an existing booking for " + obj1.roomName + " - " + obj1.today + " to " + obj1.tomorrow);
                            if (obj2.count > 1 && (obj2.count - obj1.count) >= 1) {
                                //console.log("Reduce count");
                                const { error } = await supabase
                                    .from('rcm')
                                    .update({
                                        count: obj2.count - obj1.count,
                                    })
                                    .eq('id', obj2.id);

                                if (error) {
                                    throw error
                                }
                            } else {
                                //delete entire row as count is 0
                                const { error } = await supabase
                                    .from('rcm')
                                    .delete()
                                    .eq('id', obj2.id);

                                if (!error) {
                                    //console.log('Row with :', obj2.id, ' deleted successfully!');
                                } else {
                                    console.error('Error deleting rows:', error);
                                    // Handle errors appropriately (e.g., display an error message to the user)
                                }
                            }
                        }
                    }
                }
                toast.success('Booking Deleted Successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "colored"
                });
                function myFunction() {
                    window.location.reload();
                }

                // Call the function after a set time interval (e.g., 5 seconds)
                const timeInterval = 5000; // Time interval in milliseconds (5 seconds in this example)
                setTimeout(myFunction, timeInterval);

                if (error) {
                    throw error;
                }
            } catch {
                console.log("Unable to retrieve RCM data");
            }
        }

        fetchRCMData();
    }

    const handleDelete = async () => {
        //alert('Booking deleted.' + uniqueId); // Replace with your delete logic
        setShowModal(false); // Close the modal after delete

        //delete booking with the unique id selected from server

        try {
            const { error } = await supabase
                .from('bookingData')
                .delete()
                .eq('bookings->>unique_id', uniqueId); // Filter by 'bookings.unique_id' property

            if (!error) {
                //console.log('Rows with unique_id:', uniqueId, 'deleted successfully!');
                // Update your UI to reflect the deletion
            } else {
                console.error('Error deleting rows:', error);
                // Handle errors appropriately (e.g., display an error message to the user)
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            // Handle unexpected errors
        }

        //update RCM
        handleUpdateRCM();
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

    const getFormattedDate = () => {
        const newDate = new Date();

        const year = newDate.getFullYear();
        const month = String(newDate.getMonth() + 1).padStart(2, '0'); // Pad month with leading zero (if necessary)
        const day = String(newDate.getDate()).padStart(2, '0');

        const formattedDate = year + '-' + month + '-' + day;

        return formattedDate;
    }

    return (
        <div id="manage-booking-page">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
                theme="colored"
            />
            <div className="manage-booking-content">
                <div className="manage-booking-search-container">
                    <h2 style={{ color: '#996132', fontWeight: '500' }}>Manage Your Bookings</h2>
                    <div id="input-search-booking-container">
                        <input id="search-booking-input1" onChange={(event) => setBookingId(event.target.value)} type="text" placeholder="Booking ID"></input>
                        <button id="search-booking-btn" onClick={() => handleSearchBooking()} className="classicBtn"><span className="material-symbols-outlined">search</span></button>
                    </div>
                </div>

                <div>
                    {showModal && ( // Conditionally render modal when showModal is true
                        <div className="modal">
                            <div className="modal-content">
                                <div style={{ margin: '2rem', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <span style={{ margin: '0 0.5rem 0.1rem 0', color: '#ed5e68', fontSize: '3rem' }} className="material-symbols-outlined">warning</span>
                                </div>
                                <p>Are you sure you want to delete {roomNameDelete}?</p>
                                <p>This action cannot be reversed.</p>
                                <div className="buttons">
                                    <button id="delete-btn-choice" onClick={() => handleDelete()}>Delete</button>
                                    <button id="cancel-btn-choice" style={{ width: '5rem', height: '2rem', margin: '1rem 5rem 1rem 1rem', backgroundColor: '#cecece', outline: 'none', border: 'none', color: '#5b5b5b', borderRadius: '0.5rem' }} onClick={handleCancel}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    )}
                    {data ? (
                        (bookingId && data.length > 0) ? (
                            <div>
                                {data.filter(item => item.bookings.booking_id === bookingId).map((filteredItem, index) => (
                                    <div key={index}>
                                        {index === 0 && (
                                            <div className="manage-booking-details-container">
                                                <hr style={{ width: '7rem', border: 'solid 1px #cecece' }}></hr>
                                                <p style={{ fontSize: '2rem', color: '#996132', fontWeight: '500' }}>Hello, {filteredItem.bookings.guest_name.split(' ')[0]}!</p>
                                                <p style={{ fontSize: '2rem', color: '#996132' }}>We look forward to your stay with us.</p>
                                                <div className="booking-details-header">
                                                    <div className="booking-details-header1">
                                                        <p>Booking ID: {filteredItem.bookings.booking_id}</p>
                                                        <p>Guest Email: {filteredItem.bookings.guest_email}</p>
                                                    </div>
                                                    <div className="booking-details-header2">
                                                        <p>Guest Name: {filteredItem.bookings.guest_name}</p>
                                                        <p>Guest Phone: {filteredItem.bookings.guest_phone}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <div className="manage-booking-details-container">
                                            <div className="booking-details-list">
                                                <div style={{ padding: '2rem', width: '90%' }}>
                                                    <p style={{ fontWeight: 'bold' }}>{filteredItem.bookings.room_name}</p>
                                                    <p>{filteredItem.bookings.nights > 1 ? filteredItem.bookings.nights + " Nights" : filteredItem.bookings.nights + " Night"}</p>
                                                    <p>Check-in: {formatDateStr(String(filteredItem.bookings.check_in))}</p>
                                                    <p>Check-out: {formatDateStr(String(filteredItem.bookings.check_out))}</p>
                                                    {(new Date(getFormattedDate()) > new Date(filteredItem.bookings.check_out)) ? <p style = {{color: '#ed5e68', fontWeight: '500', display: 'flex', justifyContent: 'left', alignItems: 'center'}}><span className="material-symbols-outlined" style = {{margin: '0 0.5rem 0 0'}}>fact_check</span> This booking has been closed</p>: null}
                                                    {(new Date(getFormattedDate()) > new Date(filteredItem.bookings.check_out)) ? <p style = {{color: '#ed5e68', fontWeight: '500', display: 'flex', justifyContent: 'left', alignItems: 'center'}}><span className="material-symbols-outlined" style = {{margin: '0 0.5rem 0 0'}}>fact_check</span> This booking has been closed</p>: null}
                                                    <div className="extras-roomprice-container">
                                                        <p>Extras: {filteredItem.bookings.extras}</p>
                                                        <p className="paid-icon-manage-booking">PAID &#8377; {filteredItem.bookings.room_price} <span style={{ margin: '0 0.3rem 0 0.3rem' }} className="material-symbols-outlined">check_circle</span></p>
                                                    </div>
                                                </div>
                                                <div id="manage-delete-btn" onClick={() => handleOpenModal(filteredItem.bookings.room_name, filteredItem.bookings.unique_id, filteredItem.bookings.check_in, filteredItem.bookings.check_out)}>
                                                    <span className="material-symbols-outlined">delete</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p style={{ color: '#ed5e68', fontWeight: '400', margin: '2rem 0 0 0' }}>Please enter a valid Booking ID</p>
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