import { Link } from 'react-router-dom'
import Footer from './Footer'

const BookingsPageLanding = () => {
    return (
        <div id="bookingsPageLanding">
            <div id="bookings-landing-container">
                <h2 style = {{color: '#996132'}}>Bookings</h2>
                <p>Booking Page Content</p>
                <div id = "bookings-manage-choice">
                    <Link to="/bookings" style = {{margin: '0 2rem 0 0'}}><button className = 'classicBtn' style = {{width: '10rem', height: '2.5rem'}}>New Booking</button></Link>
                    <Link to = "/manage-bookings"><button className = 'classicBtn' style = {{width: '10rem', height: '2.5rem'}}>Manage Booking</button></Link>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default BookingsPageLanding;