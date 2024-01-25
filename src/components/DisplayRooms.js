import React from 'react'
import Rooms from './Rooms'

const DisplayRooms = () => {

    const roomList = Rooms.map((r) => {
        if (r.isAvailable === false) {
            return (
                <div className="roomDetailsContainer">
                    <div className="roomDetails">
                        <p>{r.id}</p>
                        <p>{r.name}</p>
                        <p>{r.price}</p>
                        <button disabled>Book Now</button>
                        <p style = {{color: 'red'}}>Sold Out!</p>
                    </div>
                </div>
            );
        }
        else{
            return(
                <div className="roomDetailsContainer">
                    <div className="roomDetails">
                        <p>{r.id}</p>
                        <p>{r.name}</p>
                        <p>{r.price}</p>
                        <button>Book Now</button>
                    </div>
                </div>
            );
        }
    });

    return (
        <div>
            {roomList}
        </div>
    );
}

export default DisplayRooms;