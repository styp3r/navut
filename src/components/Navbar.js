import React from 'react'
import { Link } from 'react-router-dom';

import SquareLogo from '../images/navut_logo_square.jpg'
import CircleLogo from '../images/navut_logo_circle.png'

const Navbar = () => {
    return (
        <div id="navbar">
            <div>
                <img id="square-logo" alt="logo" src={SquareLogo}></img>
                <img id="circle-logo" alt="logo" src={CircleLogo}></img>
            </div>
            <div className="navbar-items">
                <div className="navbar-items-container">
                    <Link style={{ textDecoration: 'none', margin: '1rem' }} to="/"><p className="navbar-link">Home</p></Link>
                    <Link style={{ textDecoration: 'none', margin: '1rem' }} to="bookings-landing"><p className="navbar-link">Bookings</p></Link>
                    <Link style={{ textDecoration: 'none', margin: '1rem' }} to="about"><p className="navbar-link">About Us</p></Link>
                    <Link style={{ textDecoration: 'none', margin: '1rem' }} to="contact"><p className="navbar-link">Contact Us</p></Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
