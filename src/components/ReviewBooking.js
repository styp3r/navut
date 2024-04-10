import Footer from './Footer'
import useStore from './store'
import { Link } from 'react-router-dom'

const ReviewBooking = () => {

    const { bookingCart, guestName, guestEmail, guestPhone } = useStore();
    const windowHeight = window.innerHeight;

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

    return (
        <div id="review-booking-page">
            <h3 style={{ margin: '7rem 0 0 0' }}>Review Bookings</h3>
            <p>{guestName}</p>
            <p>{guestEmail}</p>
            <p>{guestPhone}</p>
            <div id="display-final-booking-container">
                {bookingCart.length === 0 ? (
                    <div style={{ width: '100%', height: windowHeight, margin: '5rem 0 0 0' }}>
                        <span style={{ fontSize: '3rem', color: '#996132' }} className="material-symbols-outlined">error</span>
                        <p>Looks like you haven't made any Bookings.</p>
                        <p>Please book your stay from our <Link to="/bookings" style={{ textDecoration: 'none', color: '#996132', fontWeight: 'bold' }}>Bookings Page</Link></p>
                    </div>
                ) : bookingCart.map((item) => (
                    <div key={item.id}>
                        <p>{item.id}</p>
                        <p>{item.room_name} x {item.count}</p>
                        <p>{item.room_price}</p>
                        <p>{formateDateStr(item.checkIn)} | {formateDateStr(item.checkOut)}</p>
                        <p>{item.nights}</p>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default ReviewBooking;