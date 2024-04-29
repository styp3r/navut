import Leaves from '../images/decoration/leaves.jpg'
import { Link } from 'react-router-dom'

const BookNowSection = () => {
    return (
        <div id="book-now-section">
            <img alt = "autumn leaves" src = {Leaves} className = "leavesDecor"></img>
            <p className="book-now-text">Indulge in the perfect blend of comfort and authenticity - book your stay at our homestay for an unforgettable experience immersed in local charm and heartfelt hospitality</p>
            <Link to = "/bookings-landing" className="book-now-go-to-bookings-landing">Book Now</Link>
        </div>
    );
}

export default BookNowSection;