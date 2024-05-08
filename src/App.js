import './App.css';
import React from 'react';
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


  return (<div className="App">
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