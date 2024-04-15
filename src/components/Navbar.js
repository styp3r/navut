import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div id="navbar">
            <div className="navbarItems">
                <div className="navbarItems_container">
                    <Link style = {{textDecoration: 'none'}} to = "/"><p className="navbarLink">Home</p></Link>
                    <Link style = {{textDecoration: 'none'}} to = "bookings-landing"><p className="navbarLink">Bookings</p></Link>
                    <Link style = {{textDecoration: 'none'}} to = "about"><p className="navbarLink">About Us</p></Link>
                    <Link style = {{textDecoration: 'none'}} to = "contact"><p className="navbarLink">Contact Us</p></Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
