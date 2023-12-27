import React from "react";
import Navbar from './Navbar'
import Hero from './Hero'
import Gallery from './Gallery'
import PropertyInfo from './PropertyInfo'
import TestimonialSlider from './TestimonialSlider'
import SquareLogo from '../images/navut_logo_square.jpg'

const LandingPage = () => {
    return (
        <div id='landingPage'>
            <img id="squareLogo" width="130" height="130" alt="logo" src={SquareLogo}></img>
            <Navbar />
            <Hero />
            <Gallery />
            <PropertyInfo />
            <TestimonialSlider />
        </div>
    )
}

export default LandingPage