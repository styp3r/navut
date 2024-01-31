import React from 'react';
import Footer from './Footer';
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
const ReviewBooking = ({ bookedRooms }) => {

  const navigate = useNavigate();  // Add this line
  const location = useLocation();
  const receivedData = location.state?.data || [];

  let roomData = [];
  for (let i = 0; i < bookedRooms.length; i++) {
    roomData[i] = receivedData[i];
  }

  console.log(roomData)

  let totalAmtArr = [];
  for (let i = 0; i < bookedRooms.length; i++) {
    totalAmtArr[i] = bookedRooms[i].price;
  }

  let grandTotal = totalAmtArr.reduce((acc, current) => acc + current, 0);

  const handleConfirmBooking = () => {
    navigate('/paymentGateway', { state: { data: roomData } });
  };

  return (
    <div>
      <h1>Review Booking</h1>
      {bookedRooms.length > 0 ? (
        <ul>
          {bookedRooms.map(room => (
            <li key={room.id}>{room.name}</li>

          ))}
          <pre>{roomData.map((rd) => {
            return <p>{rd.name} {rd.checkInDate} {rd.checkOutDate} {rd.tax} Rs.{rd.price}</p>
          })}</pre>
          <p>Grand Total Rs.{grandTotal}</p>
        </ul>
      ) : (
        <p>No rooms booked yet. Go back and book some rooms!</p>
      )}
      <button onClick={handleConfirmBooking}>Confirm & Pay</button>
      <Footer />
    </div>
  );
};

export default ReviewBooking;
