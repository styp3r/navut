import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {

    const handleOpenMenu = () => {
        //document.getElementById('navbarItems-mobile').style.display = "flex";
        document.querySelector('.navbarItems_mobile_container').classList.add('fade-in');
        document.querySelector('.navbarItems_mobile_container').classList.remove('fade-out');
        document.getElementById('navbar').style.zIndex = "5002";
        document.getElementById('navbar').style.transitionDuration = '1s';
    }

    const handleCloseMenu = () => {
        document.querySelector('.navbarItems_mobile_container').classList.remove('fade-in');
        document.querySelector('.navbarItems_mobile_container').classList.add('fade-out');
        //document.getElementById('navbarItems-mobile').style.display = "none";
        document.getElementById('navbar').style.zIndex = "5000";
        document.getElementById('navbar').style.transitionDuration = '1s';

    }
    return (
        <div id="navbar">
            <div className="navbarItems">
                <div className="navbarItems_container">
                    <Link style={{ textDecoration: 'none' }} to="/"><p className="navbarLink">Home</p></Link>
                    <Link style={{ textDecoration: 'none' }} to="bookings-landing"><p className="navbarLink">Bookings</p></Link>
                    <Link style={{ textDecoration: 'none' }} to="about"><p className="navbarLink">About Us</p></Link>
                    <Link style={{ textDecoration: 'none' }} to="contact"><p className="navbarLink">Contact Us</p></Link>
                </div>
            </div>
            <div id="navbarItems-mobile">
                <div className="navbarItems_mobile_container">
                    <span id="close-menu" onClick={() => handleCloseMenu()} className="material-symbols-outlined">close</span>
                    <Link style={{ textDecoration: 'none', margin: '1rem 2rem 1rem 2rem' }} to="/"><p className="navbarLink-mobile"><span className="material-symbols-outlined">home</span> Home</p></Link>
                    <Link style={{ textDecoration: 'none', margin: '1rem 2rem 1rem 2rem' }} to="bookings-landing"><p className="navbarLink-mobile"><span className="material-symbols-outlined">calendar_clock</span> Bookings</p></Link>
                    <Link style={{ textDecoration: 'none', margin: '1rem 2rem 1rem 2rem' }} to="about"><p className="navbarLink-mobile"><span className="material-symbols-outlined">info</span> About Us</p></Link>
                    <Link style={{ textDecoration: 'none', margin: '1rem 2rem 1rem 2rem' }} to="contact"><p className="navbarLink-mobile"><span className="material-symbols-outlined">perm_phone_msg</span> Contact Us</p></Link>
                </div>
            </div>
            <div id="burger-menu-icon" onClick={() => handleOpenMenu()}><span style={{ margin: 0, zIndex: '2' }} className="material-symbols-outlined">menu</span></div>
        </div>
    );
}

export default Navbar;
