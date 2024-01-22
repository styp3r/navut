import BookNowSection from './BookNowSection'
import Map from './MapComponent'
import Footer from './Footer'
import Hero from './Hero'
import Gallery from './Gallery'
import PropertyInfo from './PropertyInfo'
import TestimonialSlider from './TestimonialSlider'

const Home = () => {
    return (
        <div>
            <Hero />
            <Gallery />
            <PropertyInfo />
            <TestimonialSlider />
            <BookNowSection />
            <Map />
            <Footer />
        </div>
    );
}

export default Home;