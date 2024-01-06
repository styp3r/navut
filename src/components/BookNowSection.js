import Leaves from '../images/decoration/leaves.jpg'

const BookNowSection = () => {
    return (
        <div id="bookNowSection">
            <img alt = "autumn leaves" src = {Leaves} className = "leavesDecor"></img>
            <p className="bookNowText">Indulge in the perfect blend of comfort and authenticity - book your stay at our homestay for an unforgettable experience immersed in local charm and heartfelt hospitality</p>
            <button id="bookNowBtnLanding">Book Now</button>
        </div>
    );
}

export default BookNowSection;