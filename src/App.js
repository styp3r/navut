import './App.css';
import React, { useState, useEffect } from 'react';
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
import LoadingScreen from './components/LoadingScreen'

function App() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };

    window.addEventListener('load', handleLoad);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);



  /*useEffect(() => {
    // Simulate a delay to mimic loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  
  */

  return (isLoading ? <LoadingScreen /> :
    <div className="App">
      <Router scrollRestoration="auto">
        <div id='landingPage'>
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