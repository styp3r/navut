import React, { useState } from "react";
import Navbar from './Navbar'
import SquareLogo from '../images/navut_logo_square.jpg'
import HeroImg from '../images/heroImg.jpg'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const LandingPage = () => {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    return (
        <div id='landingPage'>
            <img id="squareLogo" width="130" height="130" alt="logo" src={SquareLogo}></img>
            <Navbar />
            <div className="heroSection">
                <img id="heroImg" alt="heroImage" src={HeroImg}></img>
                <h3 id = "heroText1">Find Your Bliss</h3>
                <h3 id = "heroText2">In The Coorg Hills</h3>
                <h5 id = "heroSubText">Book Your Stay Now</h5>
                <div id="bookingCheck_landing">
                    <div className="bookingCheck_landing_container">
                        <p className="bookingCheck_titles">CHECK IN <DatePicker id="checkInDate_landing" dateFormat="dd/MM/yyyy" closeOnScroll={true} selected={startDate} onChange={(date) => setStartDate(date)} /></p>
                        <p className="bookingCheck_titles">CHECK OUT <DatePicker id="checkOutDate_landing" dateFormat="dd/MM/yyyy" closeOnScroll={true} selected={endDate} onChange={(date) => setEndDate(date)} /></p>
                        <p className="bookingCheck_titles">GUESTS
                            <select name="guests" id="numOfGuestsSelect_landing">
                                <option value="1">1</option>
                                <option value = "2" selected>2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                            </select>
                        </p>
                    </div>
                    <button id="checkBookingDatesBtn"><span style={{ color: "#ffffff" }} class="material-symbols-outlined">arrow_forward</span></button>
                </div>
            </div>
        </div>
    )
}

export default LandingPage