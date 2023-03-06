import React, { useContext } from "react";
import { ModalContext } from "../services/Modals.Context";

import Modal from "react-bootstrap/Modal";

import CheckTick from "../assets/images/cancel.png";

function BookingNotCancelled(props) {
  const { modalState, dispatch } = useContext(ModalContext);
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
            <p className='modal-para'>Bookings in less than 24 hours</p>
            <p className='modal-para'>cannot be canceled</p>
          </div>

          <button
            className='main-btn'
            onClick={() => {
              dispatch({ type: "hide bookingNotCancelled" });
            }}
          >
            Done
          </button>
        </Modal.Body>
        {/* <button onClick={props.onHide} className='outline-btn mt-2'>
            Cancel
        </button> */}
      </Modal>
    </div>
  );
}

export default BookingNotCancelled;

// render(<App />);
