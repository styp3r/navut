import React from "react";
import HeroImg from '../images/heroImg.jpg'
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom'

const Hero = () => {

    return (
        <div id="hero-section">
            <img id="hero-img" alt="landscape in coorg" src={HeroImg}></img>
            <h3 id="hero-text-1">Find Your Bliss,</h3>
            <h3 id="hero-text-2">In The Coorg Hills</h3>
            <Link to = "/bookings-landing" style = {{textDecoration: 'none', color: '#ffffff'}}><div id="go-to-booking-landing-btn">Book Your Stay Now</div></Link>
            
        </div>
    );
}

export default Hero;