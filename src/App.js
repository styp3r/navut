import './App.css';
import React from 'react';
import SquareLogo from './images/navut_logo_square.jpg'
import CircleLogo from './images/navut_logo_circle.png'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Bookings from './components/Bookings'
import About from './components/About'
import Contact from './components/Contact'
import ReviewBooking from './components/ReviewBooking';
import BookingsPageLanding from './components/BookingsPageLanding';
import ManageBooking from './components/ManageBooking'
import BookingConfirmed from './components/BookingConfirmed';
import UpcomingBookings from './components/UpcomingBookings'
import NotFound from './components/NotFound'

function App() {

  return (
    <div className="App">
      <Router scrollRestoration="auto">
        <div id='landingPage'>
          <img id="squareLogo" alt="logo" src={SquareLogo}></img>
          <img id="circleLogo" alt="logo" src={CircleLogo}></img>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bookings-landing" element={<BookingsPageLanding />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/manage-bookings" element={<ManageBooking />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/review-booking" element={<ReviewBooking />} />
            <Route path="/booking-confirmed" element={<BookingConfirmed />} />
            <Route path="/upcoming" element={<UpcomingBookings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

/*
<h1>Uh oh! Looks like we've lost our way.</h1>
<p>The page you requested seems to be hiding. Maybe it went on an adventure? ️  No worries, you can try going back to the homepage or searching for what you need.</p>
<a href="/">Go to Homepage</a> */