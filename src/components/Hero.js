import React, { useState } from "react";
import HeroImg from '../images/heroImg.jpg'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom'

const Hero = () => {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    return (
        <div id="heroSection">
            <img id="heroImg" alt="heroImage" src={HeroImg}></img>
            <h3 id="heroText1">Find Your Bliss</h3>
            <h3 id="heroText2">In The Coorg Hills</h3>
            <h5 id="heroSubText">Book Your Stay Now</h5>
            <div id="bookingCheck_landing">
                <div className="bookingCheck_landing_container">
                    <p className="bookingCheck_titles">CHECK IN <DatePicker id="checkInDate_landing" dateFormat="dd/MM/yyyy" closeOnScroll={true} selected={startDate} onChange={(date) => setStartDate(date)} /></p>
                    <p className="bookingCheck_titles">CHECK OUT <DatePicker id="checkOutDate_landing" dateFormat="dd/MM/yyyy" closeOnScroll={true} selected={endDate} onChange={(date) => setEndDate(date)} /></p>
                    <p className="bookingCheck_titles">ROOMS
                        <select name="guests" id="numOfGuestsSelect_landing">
                            <option value="1" selected>1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
                    </p>
                </div>
                <Link to = "/bookings"><div id="checkBookingDatesBtn"><span style={{ color: "#ffffff" }} class="material-symbols-outlined">arrow_forward</span></div></Link>
            </div>
        </div>
    );
}

export default Hero;