import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavutLogo from '../images/navut_logo_minimal.jpg'
import Footer from './Footer';

const ReviewBooking = ({ bookedRooms }) => {

  const location = useLocation();
  const receivedData = location.state?.data || [];
  const [email, setEmail] = useState("");
  const [phNo, setPhNo] = useState("");
  const [name, setName] = useState("");
  const [spReq, setSpReq] = useState("");

  let roomData = [];
  for (let i = 0; i < bookedRooms.length; i++) {
    roomData[i] = receivedData[i];
  }

  let totalAmtArr = [];
  for (let i = 0; i < bookedRooms.length; i++) {
    totalAmtArr[i] = bookedRooms[i].price;
  }

  let noOfDays = roomData[0].noOfDays;
  let grandTotal = totalAmtArr.reduce((acc, current) => acc + current, 0);
  grandTotal = grandTotal * noOfDays;

  const amount = (grandTotal + (grandTotal * 0.18)) * 100;
  const currency = "INR";
  const receiptID = "NAVUTNEWBOOKING";

  
  return (
    <div id="reviewBookingPage">
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

        <div id="reviewBookingSection">
            {bookedRooms.length > 0 ? (
              <div className="yourStayDetails">
                <h3 style={{ fontFamily: '"Caveat", cursive', fontSize: "3rem", margin: '1rem 0 2rem 0' }}>Your Stay</h3>
                <div style={{ display: 'flex' }}>
                  <div style={{ margin: '0 1rem 0 1rem', textAlign: 'center' }}>
                    <p style={{ fontWeight: 'bold' }}>Check-In</p>
                    <p>{roomData[0].checkInDate}</p>
                    <p>After 3PM</p>
                  </div>
                  <div style={{ margin: '0 1rem 0 1rem', textAlign: 'center' }}>
                    <p style={{ fontWeight: 'bold' }}>Check-Out</p>
                    <p>{roomData[0].checkOutDate}</p>
                    <p>Before 11AM</p>
                  </div>
                </div>
                <br></br>
                <br></br>
                {roomData.map((rd) => {
                  return (
                    <div>
                      <div className="roomRow">
                        <p key={rd.id}>{rd.name} - {noOfDays + " Nights"}</p>
                        <p>&#8377;{rd.price * noOfDays}</p>
                      </div>
                      <div className="roomRowGST">
                        <p>Goods & Services Tax - 18%</p>
                        <p >&#8377;{((rd.price * noOfDays) * 0.18)}</p>
                      </div>
                      <p>------------------------------------------------------------</p>
                    </div>
                  );
                })}
                <div style={{ width: '24rem', display: 'flex', justifyContent: 'space-between' }}>
                  <p style={{ margin: '0', fontSize: '1.5rem' }}>Grand Total</p>
                  <p style={{ fontWeight: 'bold', margin: '0', fontSize: '1.5rem' }}>&#8377;{(grandTotal) + ((grandTotal) * 0.18)}</p>
                </div>
                <p style={{ color: '#9a9a9a', fontWeight: '350', fontSize: '1rem', margin: '0 0 0 15rem' }}>(INR Tax Included)</p>
              </div>
            ) : (
              <p>No rooms booked yet. Go back and book some rooms!</p>
            )}

            <hr className = "divider" style = {{width: "40rem", margin: "3rem 0 3rem 0"}}></hr>

            <div id="paymentGateway">
              <div className="yourDetails">
                <h3 style={{ fontFamily: '"Caveat", cursive', fontSize: "3rem", margin: '1rem 0 2rem 0' }}>Your Details</h3>
                <div className="getGuestDetails">
                  <input style={{ border: 'solid 1px #bfbfbf', width: '20rem', height: '2rem', borderRadius: '0.5rem', margin: '1rem 0 1rem 0', padding: '0.5rem' }} placeholder="First and Last Name" type="text" id="guestName" required onChange={(e) => setName(e.target.value)} />
                  <input style={{ border: 'solid 1px #bfbfbf', width: '20rem', height: '2rem', borderRadius: '0.5rem', margin: '1rem 0 1rem 0', padding: '0.5rem' }} placeholder="Phone Number" type="text" id="guestPhNo" required onChange={(e) => setPhNo(e.target.value)} />
                  <input style={{ border: 'solid 1px #bfbfbf', width: '20rem', height: '2rem', borderRadius: '0.5rem', margin: '1rem 0 1rem 0', padding: '0.5rem' }} placeholder="Email (Optional)" type="text" id="guestEmail" onChange={(e) => setEmail(e.target.value)} />
                  <textArea style={{ resize: 'none', border: 'solid 1px #bfbfbf', width: '20rem', height: '5rem', borderRadius: '0.5rem', margin: '1rem 0 1rem 0', padding: '0.5rem', fontFamily: "'Montserrat', sans-serif" }} placeholder="Special Requests" type="text" id="guestSR" required onChange={(e) => setSpReq(e.target.value)}></textArea>
                </div>
              </div>
            </div>

          <div>
            <button className="confirmBtn">Confirm & Pay</button>
          </div>

        </div>
      </div>



      <Footer />
    </div>
  );
};

export default ReviewBooking;
