import './App.css';
import React, { useState } from "react";
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

  return (
    <div className="App">
      <Router>
        <div id='landingPage'>
          <img id="squareLogo" width="130" height="130" alt="logo" src={SquareLogo}></img>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/about" element={<About bookedRooms={bookedRooms} setBookedRooms={setBookedRooms}/>} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/reviewBooking" element={<ReviewBooking bookedRooms={bookedRooms}/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
