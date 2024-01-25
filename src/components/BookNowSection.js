import Leaves from '../images/decoration/leaves.jpg'
import { Link } from 'react-router-dom'

const BookNowSection = () => {
    return (
        <div id="bookNowSection">
            <img alt = "autumn leaves" src = {Leaves} className = "leavesDecor"></img>
            <p className="bookNowText">Indulge in the perfect blend of comfort and authenticity - book your stay at our homestay for an unforgettable experience immersed in local charm and heartfelt hospitality</p>
            <Link to = "/bookings" className="bookNowBtnLanding"><div>Book Now</div></Link>
        </div>
    );
}

export default BookNowSection;