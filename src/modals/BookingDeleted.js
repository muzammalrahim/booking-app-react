import React, { useContext } from "react";

// libraries
import Modal from "react-bootstrap/Modal";

// local imports
import { ModalContext } from "../services/Modals.Context";

// images
import CheckTick from "../assets/images/circle-check-bg.png";

export default function BookingDeleted(props) {
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
            <p className='modal-para'>Your booking</p>
            <p className='modal-para'>has been canceled</p>
          </div>

          <button
            className='main-btn'
            // onClick={dispatch({ type: "hide bookingDeleted" })}
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

// render(<App />);
