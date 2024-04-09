import gal from '../images/gallery/gal1.jpeg'
import useStore from './store'
import React from 'react'

const RoomDetailsContainer = (props) => {

    const { addRoom } = useStore();

    const formatDate = (date) => {
        const dd = String(date.getDate()).padStart(2, '0'); // Day with leading zero
        const mm = String(date.getMonth() + 1).padStart(2, '0'); // Month with leading zero (January is 0!)
        const yyyy = date.getFullYear();
        let formattedDate = String(yyyy + '-' + mm + '-' + dd)

        return formattedDate;
    }

    let newBooking = {
        id: props.id,
        room_name: props.roomName,
        room_price: props.roomPrice,
        count: props.count,
        checkIn: formatDate(new Date()),
        checkOut: formatDate(new Date()),
    }

    const handleAddRoom = (newRoom) => {
        window.scrollTo(0, 0);
        document.getElementById('room-selection-list-container').style.display = "none";
        document.getElementById('guest-details-input-container').style.display = "flex";
        addRoom(newRoom)
    }

    return (
        <div id="room-details-container">
            <div className="room-details-content">
                <img alt='bedroom shot' src={gal} width='270' height='200'></img>
                <p>{props.id}</p>
                <p>{props.roomName}</p>
                <p>{props.roomPrice}</p>
            </div>
            <button id="book-room-btn" onClick={() => { handleAddRoom(newBooking) }} className="classicBtn" >Book Room</button>
        </div>
    );
}

export default RoomDetailsContainer;