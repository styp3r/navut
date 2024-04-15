import React from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BookingsPageLanding = () => {

    window.scrollTo(0, 0);

    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 7000,
        cssEase: "linear",
        fade: true,
    };

    return (
        <div id="bookingsPageLanding">
            <div id="bookings-landing-container">
                <h2 style={{ color: '#996132' }}>Bookings</h2>
                <p>Ready to embrace the wild side? Book your forest escape now or manage your existing bookings.</p>
                <div id="bookings-manage-choice">
                    <Link to="/bookings" style={{ margin: '0 2rem 0 0' }}><button className='classicBtn' style={{ width: '10rem', height: '2.5rem' }}>New Booking</button></Link>
                    <Link to="/manage-bookings"><button className='classicBtn' style={{ width: '10rem', height: '2.5rem' }}>Manage Booking</button></Link>
                </div>
                <br></br>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <span style={{ color: '#4dffb8' }} className="material-symbols-outlined">grass</span>
                </div>
                <div id="booking-landing-content">
                    <Slider {...settings}>
                        <div>
                            <p>The monsoon season transforms Coorg's forests into a wonderland of cascading waterfalls.  Abbey Falls, nestled amidst coffee estates, is a popular destination. But for the adventurous, exploring hidden gems like Iruppu Falls or Kakkabe Falls, shrouded in dense foliage, offers a refreshing escape.</p>
                        </div>
                        <div>
                            <p>The Coorg forests are a treasure trove of medicinal plants. Local communities have used these plants for generations to treat various ailments. From herbs like Feverfew and Chikoria to trees like the Arjun tree with its heart-protective properties, the forests offer a natural pharmacy.</p>
                        </div>
                        <div>
                            <p>Coorg's protected areas, including national parks and wildlife sanctuaries, shelter a wealth of endangered animals.  The elusive Indian elephant and the majestic Bengal tiger roam these forests, alongside dholes (wild dogs), gaurs (Indian bisons), and various deer species. With its diverse habitats, Coorg plays a vital role in the conservation of India's precious wildlife.</p>
                        </div>
                        <div>
                            <p>Coorg's diverse forests provide a haven for a spectacular array of birds. Birdwatchers can spot vibrant Malabar trogons with their crimson plumage, the elusive Sri Lanka Frogmouth with its incredible camouflage, or the hornbill, known for its massive casque.</p>
                        </div>
                    </Slider>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default BookingsPageLanding;