import React from 'react'
import { Link } from 'react-router-dom';

import SquareLogo from '../images/navut_logo_square.jpg'
import CircleLogo from '../images/navut_logo_circle.png'

const Navbar = () => {

    const handleOpenMenu = () =>{
        document.getElementById('navbar-items-container').style.display = 'flex'
        document.getElementById('navbar-items-container').classList.add('fade-in-animation')
    }

    const handleCloseMenu = () =>{
        document.getElementById('navbar-items-container').style.display = 'none'
    }


    return (
        <div id="navbar">
            <div>
                <img id="square-logo" alt="logo" src={SquareLogo}></img>
                <img id="circle-logo" alt="logo" src={CircleLogo}></img>
            </div>
            <div className="navbar-items">
                <div id="navbar-items-container">
                    <button id = "toggleMenu-close" onClick = {() => handleCloseMenu()}><span className="material-symbols-outlined">close</span></button>
                    <Link onClick = {() => handleCloseMenu()} style={{ textDecoration: 'none', margin: '1rem 5rem 1rem 1rem' }} to="/"><p className="navbar-link">Home</p></Link>
                    <Link onClick = {() => handleCloseMenu()} style={{ textDecoration: 'none', margin: '1rem 5rem 1rem 1rem' }} to="bookings-landing"><p className="navbar-link">Bookings</p></Link>
                    <Link onClick = {() => handleCloseMenu()} style={{ textDecoration: 'none', margin: '1rem 5rem 1rem 1rem' }} to="about"><p className="navbar-link">About Us</p></Link>
                    <Link onClick = {() => handleCloseMenu()} style={{ textDecoration: 'none', margin: '1rem 5rem 1rem 1rem' }} to="contact"><p className="navbar-link">Contact Us</p></Link>
                    <hr style = {{width: '70%', borderTop: 'solid 1px #996132'}}></hr>
                </div>
                <button id="toggleMenu" onClick = {() => handleOpenMenu()}><span className="material-symbols-outlined">menu</span></button>
            </div>
        </div>
    );
}

export default Navbar;
