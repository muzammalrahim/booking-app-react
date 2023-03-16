import React, { useEffect, useContext, useState } from "react";

// libraries
import Modal from "react-bootstrap/Modal";

// local imports
import ConfirmCancelled from "../modals/ConfirmCancelled";
import { ChangeBookingContext } from "../services/ChangeBooking.context";

// images
import CheckTick from "../assets/images/circle-check-bg.png";

export default function BookingChanged(props) {
  const { changeBooking, setChangeBooking, changedBooking, setChangedBooking } =
    useContext(ChangeBookingContext);
  console.log(changedBooking);
  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  const formatTime = (seconds) => {
    const dateObj = new Date(seconds * 1000); // convert seconds to milliseconds
    let hours = dateObj.getUTCHours();
    let minutes = dateObj.getUTCMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    const timeStr = hours + ":" + minutes + " " + ampm;
    return timeStr;
  };

  const formattedDate = formatDate(changedBooking.date);
  const time = formatTime(changedBooking.startTime); // assuming 47000 seconds is the input value
  console.log(time); // "1:03 PM" or a similar 12-hour time format in UTC timezone
  console.log(formattedDate);
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
          <div className='pb-4'>
            <p className='modal-para'>Your booking</p>
            <p className='modal-para'>has been changed</p>
          </div>

          <div>
            <p className='modal-gray-text'>Your booking is now on</p>
            <p className='modal-gray-text'>
              {formattedDate} at {time}
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

// render(<App />);
