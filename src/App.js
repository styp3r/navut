import './App.css';
import React, { useState, useEffect } from "react";
import SquareLogo from './images/navut_logo_square.jpg'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Bookings from './components/Bookings'
import About from './components/About'
import Contact from './components/Contact'
import ReviewBooking from './components/ReviewBooking'

function App() {

  const [bookedRooms, setBookedRooms] = useState([]);

  useEffect(() => {
    // Reset bookedRooms to an empty array on page load
    setBookedRooms([]);
    // Set up the beforeunload event listener
    const beforeUnloadListener = (event) => {
        // No need to do anything here since the state has already been reset
    };
    window.addEventListener('beforeunload', beforeUnloadListener);
    // Cleanup the event listener when the component is unmounted
    return () => {
        window.removeEventListener('beforeunload', beforeUnloadListener);
    };
}, [setBookedRooms]);

  return (
    <div className="App">
      <Router scrollRestoration="auto">
        <div id='landingPage'>
          <img id="squareLogo" width="130" height="130" alt="logo" src={SquareLogo}></img>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bookings" element={<Bookings bookedRooms={bookedRooms} setBookedRooms={setBookedRooms}/>} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/reviewBooking" element={<ReviewBooking bookedRooms={bookedRooms}/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
