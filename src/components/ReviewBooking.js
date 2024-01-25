import React from 'react';

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
    </div>
  );
};

export default ReviewBooking;
