import Footer from './Footer'

const ManageBooking = () => {
    return (
        <div id="manageBookingPage">
            <div className="manage-booking-content">
                <h2 style={{ color: '#996132' }}>Manage Your Bookings</h2>
                <p>Please enter your Booking ID</p>
                <div id="input-search-booking-container">
                    <input id="search-booking-input" type="text" placeholder="Booking ID"></input>
                    <button id="search-booking-btn" className="classicBtn">Search</button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ManageBooking;