import React from "react";
import SquareLogo from '../images/navut_logo_square.jpg'
import Home from './Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./Navbar";
import Bookings from './Bookings'
import About from './About'
import Contact from './Contact'

const LandingPage = () => {
    return (
        <Router>
        <div id='landingPage'>
            <img id="squareLogo" width="130" height="130" alt="logo" src={SquareLogo}></img>
            <Navbar />

            <Routes>
            <Route path="/" element={<Home />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </div>
        </Router>
    )
}

export default LandingPage