import './App.css';
import React from 'react';
import SquareLogo from './images/navut_logo_square.jpg'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Bookings from './components/Bookings'
import About from './components/About'
import Contact from './components/Contact'
import ReviewBooking from './components/ReviewBooking';
import BookingsPageLanding from './components/BookingsPageLanding';
import ManageBooking from './components/ManageBooking'

function App() {

  return (
    <div className="App">
      <Router scrollRestoration="auto">
        <div id='landingPage'>
          <img id="squareLogo" width="130" height="130" alt="logo" src={SquareLogo}></img>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bookings-landing" element={<BookingsPageLanding />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/manage-bookings" element={<ManageBooking />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/review-booking" element={<ReviewBooking />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
