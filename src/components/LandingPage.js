import React from "react";
import Navbar from './Navbar'
import Hero from './Hero'
import Gallery from './Gallery'
import PropertyInfo from './PropertyInfo'
import TestimonialSlider from './TestimonialSlider'
import SquareLogo from '../images/navut_logo_square.jpg'
import BookNowSection from './BookNowSection'
import Map from './MapComponent'
import Footer from './Footer'

const LandingPage = () => {
    return (
        <div id='landingPage'>
            <img id="squareLogo" width="130" height="130" alt="logo" src={SquareLogo}></img>
            <Navbar />
            <Hero />
            <Gallery />
            <PropertyInfo />
            <TestimonialSlider />
            <BookNowSection />
            <Map />
            <Footer />
        </div>
    )
}

export default LandingPage