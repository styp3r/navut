import One from '../images/property/gal1.jpg'
import Two from '../images/property/gal2.jpg'
import Three from '../images/property/gal6.jpg'
import Four from '../images/property/gal4.jpg'
import Five from '../images/property/gal5.jpg'
import Six from '../images/property/gal6.jpg'
import Seven from '../images/property/gal7.jpg'
import Eight from '../images/property/gal8.jpg'
import Slider from 'react-slick';


const Gallery = () => {

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 500,
        fade: true,
        waitForAnimate: false
    };

    return (
        <div id="gallery-section">
            <div className="carousel-container">
                <Slider {...settings}>
                    <div className="carousel-item">
                        <img style = {{objectFit: 'contain'}} alt = "" src={One} />
                    </div>
                    <div className="carousel-item">
                        <img style = {{objectFit: 'contain'}} alt = "" src={Two} />
                    </div>
                    <div className="carousel-item">
                        <img style = {{objectFit: 'contain'}} alt = "" src={Three} />
                    </div>
                    <div className="carousel-item">
                        <img style = {{objectFit: 'contain'}} alt = "" src={Four} />
                    </div>
                    <div className="carousel-item">
                        <img style = {{objectFit: 'contain'}} alt = "" src={Five} />
                    </div>
                    <div className="carousel-item">
                        <img style = {{objectFit: 'contain'}} alt = "" src={Six} />
                    </div>
                    <div className="carousel-item">
                        <img style = {{objectFit: 'contain'}} alt = "" src={Seven} />
                    </div>
                    <div className="carousel-item">
                        <img style = {{objectFit: 'contain'}} alt = "" src={Eight} />
                    </div>
                </Slider>
            </div>
            <div className = "gallery-content">
                <p className = "gallery-content-title"><span className="material-symbols-outlined">psychiatry</span> Unwind in Spacious Rooms</p>
                <p className = "gallery-content-right">Step into a world of tranquility and discover the charm of Navut. Immerse yourself in our luxurious accommodations, featuring spacious rooms, modern amenities, and breathtaking views. Unwind by our coffee plantation, indulge in delectable local cuisine at our on-site restaurant, and explore the endless possibilities that await you beyond our doors. Whether you seek a romantic getaway, a fun-filled family vacation, or a rejuvenating solo retreat, Navut provides the perfect setting to create lasting memories.</p>
            </div>
        </div>
    );
}

export default Gallery;