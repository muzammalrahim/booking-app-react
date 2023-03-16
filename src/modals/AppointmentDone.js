import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import CheckTick from "../assets/images/circle-check.png";

function AppointmentDone(props) {
  const [data, setData] = useState({});
  const [bookingInfo, setBookingInfo] = useState({});
  const formatDate = () => {
    const date = new Date(bookingInfo.date);
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const string = date.toLocaleDateString("en-US", options);
    // console.log(string);
    return string;
  };

  function formatTime(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const amOrPm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert to 12-hour time format
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${amOrPm}`;
  }

  useEffect(() => {
    setBookingInfo(JSON.parse(localStorage.getItem("payload")));
    console.log(bookingInfo);
  }, []);
  return (
    <div className='done-appt'>
      <Modal
        {...props}
        size='sm'
        aria-labelledby='contained-modal-title-vcenter'
        className='done-appt'
        centered
      >
        <Modal.Header className='book-app'>
          <Modal.Title id='contained-modal-title-vcenter'>
            <img className='' src={CheckTick} alt='search' />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='modal-para'>Your appointment has been booked</p>
          <div className='mt-3 mb-3'>
            <p className='modal-gray-text'>
              Your booking is on {formatDate()} at{" "}
              {formatTime(bookingInfo.startTime)}
            </p>
            {/* <p className='modal-gray-text'>2023 at 12:00 pm.</p> */}
            <p className='modal-gray-text'>
              Your reservation code: {localStorage.getItem("reservationId")}
            </p>
          </div>

          <button className='main-btn'> Done</button>
        </Modal.Body>
        {/* <button onClick={props.onHide} className='outline-btn mt-2'>
            Cancel
        </button> */}
      </Modal>
    </div>
  );
}

export default AppointmentDone;

// render(<App />);
