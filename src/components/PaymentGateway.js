import React from 'react';
import { useLocation } from 'react-router-dom';

const PaymentGateway = ({ bookedRooms }) => {
    const location = useLocation();
    const receivedData = location.state?.data || [];

    /*let roomData = [];
    for (let i = 0; i < bookedRooms.length; i++) {
        roomData[i] = receivedData[i];
    }*/

    console.log(receivedData)

    return (
        <div>
            <p>Payment Gateway</p>
            {/* Updated roomData.map function */}
            {receivedData.map(rd => (
                <p key={rd.id}>
                    {rd.name} {rd.checkInDate} {rd.checkOutDate} {rd.tax} Rs.{rd.price}
                </p>
            ))}
        </div>
    );
};

export default PaymentGateway;
