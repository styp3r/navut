import React from "react";
import HeroImg from '../images/heroImg.jpg'
import HeroImgMobile from '../images/heroImgMobile.jpg'
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom'

const Hero = () => {

    return (
        <div id="heroSection">
            <img id="heroImg" alt="heroImage" src={HeroImg}></img>
            <img id="heroImg-mobile" alt="heroImage for mobile devices" src={HeroImgMobile}></img>
            <h3 id="heroText1">Find Your Bliss</h3>
            <h3 id="heroText2">In The Coorg Hills</h3>
            <Link to = "/bookings-landing" style = {{textDecoration: 'none', color: '#ffffff'}}><div id="checkBookingDatesBtn">Book Your Stay Now</div></Link>
            
        </div>
    );
}

export default Hero;