import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavutLogo from '../images/navut_logo_minimal.jpg'
import Footer from './Footer';

const ReviewBooking = ({ bookedRooms }) => {

  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if (isFirstLoad) {
      window.scrollTo(0, 0);
      console.log('page load');
      setIsFirstLoad(false); // Mark initial load complete
    } else{
      console.log('page has loaded more than once!');
    }
  }, [isFirstLoad]);

  const location = useLocation();
  const receivedData = location.state?.data || [];
  const [email, setEmail] = useState(null);
  const [phNo, setPhNo] = useState(null);
  const [name, setName] = useState(null);
  const [spReq, setSpReq] = useState(null);
  let serverUploadData = [];

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

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    // Pad the day and month with leading zeros if necessary
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;

    return formattedDay + '-' + formattedMonth + '-' + year;
  }

  function getDayOfWeek(dateString) {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date(dateString);
    const dayOfWeekIndex = date.getDay();
    return daysOfWeek[dayOfWeekIndex];
  }

  function handleCheckboxChange(event) {
    const button = document.getElementById('confirmBtn');
    button.disabled = !event.target.checked;
  }

  const handleOnConfirmClick = () => {
    console.log('Clicked!');
    serverUploadData.push(name, email, phNo, spReq);
    let successMsg = "";
    console.log(serverUploadData.length);
    if (serverUploadData.length < 12 || name === "" || email === "" || phNo === "" || name === null || email === null || phNo === null) {
      document.getElementById("errorModal").style.display = "flex";
    } else {
      for (let i = 0; i < serverUploadData.length; i++) {
        successMsg = successMsg + " @ " + serverUploadData[i] + "\n";
      }
      alert(successMsg);
    }
  }

  const handleModalClose = () => {
    document.getElementById("errorModal").style.display = "none";
  }


  return (
    <div id="reviewBookingPage">
      <div id="errorModal">
        <p>Please fill in the required Guest Details!</p>
        <button id="modalClose" onClick={handleModalClose}>Okay</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

        <div id="reviewBookingSection">
          {bookedRooms.length > 0 ? (
            <div className="yourStayDetails">
              <h3 style={{ fontFamily: '"Caveat", cursive', fontSize: "3rem", margin: '1rem 0 2rem 0' }}>Your Stay</h3>
              <div style={{ display: 'flex' }}>
                <div style={{ margin: '0 1rem 0 1rem', textAlign: 'center' }}>
                  <p style={{ fontWeight: 'bold' }}>Check-In</p>
                  <p>{getDayOfWeek(roomData[0].checkInDate) + ", " + formatDate(roomData[0].checkInDate)}</p>
                  {serverUploadData.push(roomData[0].checkInDate)}
                  <p>After 3PM</p>
                </div>
                <div style={{ margin: '0 1rem 0 1rem', textAlign: 'center' }}>
                  <p style={{ fontWeight: 'bold' }}>Check-Out</p>
                  <p>{getDayOfWeek(roomData[0].checkOutDate) + ", " + formatDate(roomData[0].checkOutDate)}</p>
                  {serverUploadData.push(roomData[0].checkOutDate)}
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
                      {serverUploadData.push(rd.id, rd.name, noOfDays, (rd.price * noOfDays))}
                    </div>
                    <div className="roomRowGST">
                      <p>Taxes & Fees (GST) - 18%</p>
                      <p >&#8377;{((rd.price * noOfDays) * 0.18)}</p>
                      {serverUploadData.push(((rd.price * noOfDays) * 0.18))}
                    </div>
                    <p>------------------------------------------------------------</p>
                  </div>
                );
              })}
              <div style={{ width: '24rem', display: 'flex', justifyContent: 'space-between' }}>
                <p style={{ margin: '0', fontSize: '1.5rem' }}>Grand Total</p>
                <p style={{ fontWeight: 'bold', margin: '0', fontSize: '1.5rem' }}>&#8377;{(grandTotal) + ((grandTotal) * 0.18)}</p>
                {serverUploadData.push(((grandTotal) + ((grandTotal) * 0.18)))}
              </div>
              <p style={{ color: '#9a9a9a', fontWeight: '350', fontSize: '1rem', margin: '0 0 0 15rem' }}>(INR Tax Included)</p>
              <p>------------------------------------------------------------</p>
            </div>
          ) : (
            <p>Oops! Cannot Find Any Booked Rooms!</p>
          )}

          <hr className="divider" style={{ width: "40rem", margin: "3rem 0 3rem 0" }}></hr>

          <div id="paymentGateway">
            <div className="yourDetails">
              <h3 style={{ fontFamily: '"Caveat", cursive', fontSize: "3rem", margin: '1rem 0 2rem 0' }}>Guest Details</h3>
              <form className="getGuestDetails">
                <input style={{ border: 'solid 1px #bfbfbf', width: '20rem', height: '2rem', borderRadius: '0.5rem', margin: '1rem 0 1rem 0', padding: '0.5rem' }} placeholder="First and Last Name" type="text" id="guestName" required onChange={(e) => setName(e.target.value)} />
                <input style={{ border: 'solid 1px #bfbfbf', width: '20rem', height: '2rem', borderRadius: '0.5rem', margin: '1rem 0 1rem 0', padding: '0.5rem' }} placeholder="Phone Number" type="text" id="guestPhNo" required onChange={(e) => setPhNo(e.target.value)} />
                <input style={{ border: 'solid 1px #bfbfbf', width: '20rem', height: '2rem', borderRadius: '0.5rem', margin: '1rem 0 1rem 0', padding: '0.5rem' }} placeholder="Email" type="text" id="guestEmail" onChange={(e) => setEmail(e.target.value)} />
                <textarea style={{ resize: 'none', border: 'solid 1px #bfbfbf', width: '20rem', height: '5rem', borderRadius: '0.5rem', margin: '1rem 0 1rem 0', padding: '0.5rem', fontFamily: "'Montserrat', sans-serif" }} placeholder="Special Requests (Optional)" type="text" id="guestSR" onChange={(e) => setSpReq(e.target.value)}></textarea>
              </form>
            </div>
          </div>

          <hr className="divider" style={{ width: "40rem", margin: "3rem 0 3rem 0" }}></hr>

          <div>
            <div className="acknowledegment">
              <div>
                <input type="checkbox" onChange={handleCheckboxChange} />
                <label>I agree with the Privacy Terms and Booking Conditions.</label>
              </div>
            </div>
            <button id="confirmBtn" onClick={handleOnConfirmClick}>Confirm & Pay</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReviewBooking;


/*
-Data To Be Uploaded To Server After Successful Payment-

1. checkInDate - roomData[0].checkInDate
2. checkOutDate - roomData[0].checkOutDate
3. roomType - rd.name
4. priceWOtax - rd.price * noOfDays
5. priceWithTax - (rd.price * noOfDays)* 0.18
6. grandTotal - (grandTotal) + ((grandTotal) * 0.18)
7. guestEmail - email
8. guestPhone - phNo
9. guestName - name
10. specialReq- spReq
11. roomId - rd.id
12. noOfDays - noOfDays
*/
