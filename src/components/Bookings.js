import Footer from './Footer'
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DisplayRooms from './DisplayRooms'

const Bookings = () => {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [selectedDates, setSelectedDates] = useState([]);

    const handleStartDateChange = (date) => {
        setStartDate(date);
        // If there's an end date selected, ensure it's after the new start date
        if (endDate && date > endDate) {
            setEndDate(null);
        }
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const generateDateRange = (start, end) => {
        const dateList = [];
        let currentDate = new Date(start);

        while (currentDate <= end) {
            dateList.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dateList;
    };

    const handleGenerateDates = () => {
        if (startDate && endDate) {
            const dates = generateDateRange(startDate, endDate);
            setSelectedDates(dates);
        }
    };

    return (
        <div>
            <div id="bookingsPage">
                <div className="bookingParameters">
                    <div id="bookingCheck">
                        <div className="bookingCheck_container">
                            <div>
                                <p className="titles">CHECK IN DATE</p>
                                <DatePicker id="checkInDate" dateFormat="dd/MM/yyyy" closeOnScroll={true} minDate={new Date()} selected={startDate} onChange={(date) => handleStartDateChange(date, 'start')} />
                            </div>
                            <div>
                                <p className="titles">CHECK OUT DATE</p>
                                <DatePicker id="checkOutDate" dateFormat="dd/MM/yyyy" closeOnScroll={true} minDate={startDate} selected={endDate} onChange={(date) => handleEndDateChange(date, 'end')} />
                            </div>
                            <div>
                                <p className="titles">NO. OF GUESTS</p>
                                <select name="guests" id="numOfGuestsSelect">
                                    <option value="1">1</option>
                                    <option value="2" selected>2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                </select>
                            </div>
                            <button id="checkBookingDatesBtn_bookingPage" onClick={handleGenerateDates}>Check Availability</button>
                        </div>

                    </div>
                    <ul>
                        {selectedDates.length > 0 && (
                            <div>
                                <h3>Selected Dates:</h3>
                                <ul>
                                    {selectedDates.map((date) => (
                                        <li key={date.toISOString()}>{date.toDateString()}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </ul>
                </div>
                <div className="bookingDetails">
                    <DisplayRooms />
                    <p style={{ display: 'inline-block', margin: '15rem 0 0 0' }} >Oops! We Are All Booked!</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Bookings;