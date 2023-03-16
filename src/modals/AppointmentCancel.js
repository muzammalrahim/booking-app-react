import React, { useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

import CheckTick from "../assets/images/cancel.png";

function AppointmentCancel(props) {
  const API_URL = process.env.REACT_APP_PUBLIC_URL;
  const [btnText, setBtnText] = useState("Repeat Payment");
  const handlePayment = () => {
    // const payload = JSON.parse(localStorage.getItem("payload"));
    // console.log(localStorage.getItem("payload"));
    // console.log(payload);
    console.log(localStorage.getItem("redirect_url"));
    window.location.href = localStorage.getItem("redirect_url");
    // console.log(JSON.parse(payload));
    // bookReservation(payload);
  };
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
          <p className='modal-para'>Sorry your payment didn't go through</p>

          <div className='mt-3 mb-3'>
            <p className='modal-gray-text'>
              You can repeat the payment after a while.
            </p>
            <p className='modal-gray-text'>
              Perhaps a bug with the service. We are
            </p>
            <p className='modal-gray-text'>working on it</p>
          </div>

          <button className='main-btn' onClick={() => handlePayment()}>
            {btnText}
          </button>
        </Modal.Body>
        {/* <button onClick={props.onHide} className='outline-btn mt-2'>
            Cancel
        </button> */}
      </Modal>
    </div>
  );
}

export default AppointmentCancel;
