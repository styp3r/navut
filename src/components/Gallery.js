import One from '../images/gallery/gal1.jpeg'
import Two from '../images/gallery/gal2.jpeg'
import Three from '../images/gallery/gal3.jpeg'
import Four from '../images/gallery/gal4.jpg'
import Five from '../images/gallery/gal5.jpg'
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
                        <img src={One} />
                    </div>
                    <div className="carousel-item">
                        <img src={Two} />
                    </div>
                    <div className="carousel-item">
                        <img src={Three} />
                    </div>
                    <div className="carousel-item">
                        <img src={Four} />
                    </div>
                    <div className="carousel-item">
                        <img src={Five} />
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