import React from 'react';
import Footer from './Footer';
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
const ReviewBooking = ({ bookedRooms }) => {

  window.scrollTo(0, 0);

  const navigate = useNavigate();
  const location = useLocation();
  const receivedData = location.state?.data || [];

  let roomData = [];
  for (let i = 0; i < bookedRooms.length; i++) {
    roomData[i] = receivedData[i];
  }

  let totalAmtArr = [];
  for (let i = 0; i < bookedRooms.length; i++) {
    totalAmtArr[i] = bookedRooms[i].price;
  }

  let grandTotal = totalAmtArr.reduce((acc, current) => acc + current, 0);

  const handleConfirmBooking = () => {
    navigate('/paymentGateway', { state: { data: roomData } });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <h1>Review Booking</h1>
      {bookedRooms.length > 0 ? (
        <div className="yourStayDetails">
          <h3 style = {{fontFamily: '"Caveat", cursive', fontSize:"2rem"}}>Your Stay</h3>
          <div style={{ display: 'flex' }}>
            <div style={{ margin: '0 1rem 0 1rem', textAlign: 'center' }}>
              <p style={{ fontWeight: 'bold' }}>Check-In</p>
              <p>{bookedRooms[0].bookings[0].startDate}</p>
              <p>After 3PM</p>
            </div>
            <div style={{ margin: '0 1rem 0 1rem', textAlign: 'center' }}>
              <p style={{ fontWeight: 'bold' }}>Check-Out</p>
              <p>{bookedRooms[0].bookings[0].endDate}</p>
              <p>Before 11AM</p>
            </div>
          </div>
          <hr style={{ width: '10rem', margin: '1rem 0 3rem 0' }}></hr>
          {roomData.map((rd) => {
            return (
              <div>
                <div className="roomRow">
                  <p key={rd.id}>{rd.name}</p>
                  <p>&#8377;{rd.price}</p>
                </div>
                <div className="roomRowGST">
                  <p>Goods & Services Tax - 18%</p>
                  <p >&#8377;{(rd.price * 0.18)}</p>
                </div>
                <hr></hr>
              </div>
            );
          })}
          <div style={{ width: '24rem', display: 'flex', justifyContent: 'space-between'}}>
            <p style={{ margin: '0', fontSize: '1.5rem'}}>Grand Total</p>
            <p style={{ fontWeight: 'bold', margin: '0', fontSize: '1.5rem'}}>&#8377;{grandTotal + (grandTotal * 0.18)}</p>
          </div>
          <p style={{ color: '#9a9a9a', fontWeight: '350', fontSize: '1rem', margin: '0 0 0 18rem' }}>(INR Tax Included)</p>
          <button className = "confirmBookingBtn" onClick={handleConfirmBooking}>Confirm Booking</button>
        </div>
      ) : (
        <p>No rooms booked yet. Go back and book some rooms!</p>
      )}
      <Footer />
    </div>
  );
};

export default ReviewBooking;
