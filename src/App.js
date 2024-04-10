import './App.css';
import React from "react";
import SquareLogo from './images/navut_logo_square.jpg'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Bookings from './components/Bookings'
import About from './components/About'
import Contact from './components/Contact'
import ReviewBooking from './components/ReviewBooking';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://tbfhmugkjiiwrlavunae.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRiZmhtdWdramlpd3JsYXZ1bmFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYwOTcyMTUsImV4cCI6MjAyMTY3MzIxNX0.I6jAJI-1M_VUpbvcVhOxiWA4_gVuTvIdg4KMT8yn3MU');
// Pass the instance down using React context
export const SupabaseContext = React.createContext();

function App() {

  return (
    <SupabaseContext.Provider value={supabase}>
      <div className="App">
        <Router scrollRestoration="auto">
          <div id='landingPage'>
            <img id="squareLogo" width="130" height="130" alt="logo" src={SquareLogo}></img>
            <Navbar />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/review-booking" element={<ReviewBooking />} />
            </Routes>
          </div>
        </Router>
      </div>
    </SupabaseContext.Provider>
  );
}

export default App;
