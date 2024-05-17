import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import SquareLogo from '../images/navut_logo_square.jpg'
import CircleLogo from '../images/navut_logo_circle.png'

const Navbar = () => {

    const [isScrollingDown, setIsScrollingDown] = useState(false);

    let currentWindowHeight = window.innerHeight;

    useEffect(() => {
        const handleScroll = () => {
            const scrollThreshold = 100; // Adjust this threshold as needed
            const currentScrollPos = window.scrollY || document.documentElement.scrollTop;
            setIsScrollingDown(currentScrollPos > scrollThreshold);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleOpenMenu = () => {
        document.getElementById('navbar-items-container').style.display = 'flex'
        document.getElementById('navbar-items-container').classList.add('fade-in-animation')
    }

    const handleCloseMenu = () => {
        document.getElementById('navbar-items-container').style.display = 'none'
    }

    return (
        <div id="navbar">
            <div>
                <img id="square-logo" alt="logo" src={SquareLogo}></img>
                <img id="circle-logo" className={isScrollingDown ? 'scrolling-down' : 'scrolling-up'} alt="logo" style={{ width: isScrollingDown ? '4rem' : '6rem', height: isScrollingDown ? '4rem' : '6rem', margin: isScrollingDown ? '0 0 0 2rem' : '5rem 0 0 2rem' }} src={CircleLogo}></img>
            </div>
            <div className="navbar-items">
                <div id="navbar-items-container" style={{ height: currentWindowHeight }} >
                    <button id="toggleMenu-close" onClick={() => handleCloseMenu()}><span className="material-symbols-outlined">close</span></button>
                    <Link onClick={() => handleCloseMenu()} style={{ textDecoration: 'none', margin: '1rem 5rem 1rem 1rem' }} to="/"><p className="navbar-link">Home</p></Link>
                    <Link onClick={() => handleCloseMenu()} style={{ textDecoration: 'none', margin: '1rem 5rem 1rem 1rem' }} to="/bookings-landing"><p className="navbar-link">Bookings</p></Link>
                    <Link onClick={() => handleCloseMenu()} style={{ textDecoration: 'none', margin: '1rem 5rem 1rem 1rem' }} to="/about"><p className="navbar-link">About Us</p></Link>
                    <Link onClick={() => handleCloseMenu()} style={{ textDecoration: 'none', margin: '1rem 5rem 1rem 1rem' }} to="/contact"><p className="navbar-link">Contact Us</p></Link>
                    <div className="navbar-items-container-bottom">
                        <Link onClick={() => handleCloseMenu()} style={{ textDecoration: 'none'}} to = "/terms-and-conditions"><p className="navbar-items-container-bottom-terms">Terms & Conditions</p></Link>
                        <Link onClick={() => handleCloseMenu()} style={{ textDecoration: 'none'}} to = "/cancellation-policy"><p className="navbar-items-container-bottom-refund">Cancellation & Refund Policy</p></Link>
                    </div>
                </div>
                <button id="toggleMenu" onClick={() => handleOpenMenu()}><span className="material-symbols-outlined">menu</span></button>
            </div>
        </div>
    );
}

export default Navbar;
