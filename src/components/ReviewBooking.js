import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavutLogo from '../images/navut_logo_minimal.jpg'
import Footer from './Footer';
import Axios from "axios";

const ReviewBooking = ({ bookedRooms }) => {

  window.scrollTo(0, 0);

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

  const paymentHandler = async (e) => {
    const API_URL = 'http://localhost:8000/'
    e.preventDefault();
    const orderUrl = `${API_URL}order`;
    const response = await Axios.get(orderUrl);
    const { data } = response;
    const options = {
      key: process.env.RAZOR_PAY_KEY_ID,
      name: "Navut Hotels",
      description: "Test Booking",
      order_id: data.id,
      handler: async (response) => {
        try {
         const paymentId = response.razorpay_payment_id;
         const url = `${API_URL}capture/${paymentId}`;
         const captureResponse = await Axios.post(url, {})
         console.log(captureResponse.data);
        } catch (err) {
          console.log(err);
        }
      },
      theme: {
        color: "#686CFD",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
    };

  return (
    <div id="reviewBookingPage">
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

        <div id="reviewBookingSection">
          <div style={{ display: 'flex' }}>
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
          </div>

          <div>
            <button onClick={paymentHandler} className="buy_btn">Confirm & Pay</button>
          </div>

        </div>
      </div>



      <Footer />
    </div>
  );
};

export default ReviewBooking;
