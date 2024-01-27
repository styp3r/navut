import React from 'react';
import Footer from './Footer';

const ReviewBooking = ({ bookedRooms }) => {
  return (
    <div>
      <h1>Review Booking</h1>
      {bookedRooms.length > 0 ? (
        <ul>
          {bookedRooms.map(room => (
            <li key={room.id}>{room.name}</li>
          ))}
        </ul>
      ) : (
        <p>No rooms booked yet. Go back and book some rooms!</p>
      )}
      <Footer />
    </div>
  );
};

export default ReviewBooking;
