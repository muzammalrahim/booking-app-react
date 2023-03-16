import React, { useContext, useState } from "react";
import { ModalContext } from "../services/Modals.Context";

// libraries
import Modal from "react-bootstrap/Modal";
import axios from "axios";

// local imports
import BookingDeleted from "../modals/BookingDeleted";

// images
import CheckTick from "../assets/images/cancel.png";

function ConfirmCancelled(props) {
  const API_URL = process.env.REACT_APP_PUBLIC_URL;
  const { modalState, dispatch } = useContext(ModalContext);
  // Not Cancelled Modal
  const [modalShow, setModalShow] = React.useState(false);
  const [cancelBtn, setCancelBtn] = useState("Cancel booking");

  const cancelReservation = async () => {
    setCancelBtn("canceling");

    axios
      .post(API_URL + "reservation/cancelReservation", {
        reservationId: localStorage.getItem("reservationId"),
      })
      .then((response) => {
        console.log(response.status);
        // setApiCall(false);
        setCancelBtn("Cancel booking");

        dispatch({ type: "show bookingDeleted" });

        // setOtp("");
        return response.data;
      })
      .catch((error) => {
        dispatch({ type: "hide confirmCancelled" });
        dispatch({ type: "show bookingNotCancelled" });

        // setError(true);
        // setApiCall(false);
        console.log(error.response.status);
        console.log(error.message);
        return error.message;
      });
  };

  return (
    <div className='done-appt'>
      <Modal
        {...props}
        size='md'
        aria-labelledby='contained-modal-title-vcenter'
        className='done-appt'
        centered
      >
        <Modal.Header className='book-app'>
          <Modal.Title id='contained-modal-title-vcenter'>
            {/* <img className='' src={CheckTick} alt="search" /> */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='pb-4'>
            <p className='modal-para'>Cancel booking?</p>
          </div>

          <div className='mb-3'>
            <p className='modal-gray-text'>
              Are you sure you want to cancel your booking?
            </p>
          </div>

          <div className='parallel-btns mb-3'>
            <div>
              <span
                className='outline-btn no-btn'
                onClick={() => {
                  dispatch({ type: "hide confirmCancelled" });
                  dispatch({ type: "show confirmChoices" });
                }}
              >
                No
              </span>
            </div>

            <div>
              <span className='modal-btn'>
                <span
                  className='main-btn'
                  onClick={() => {
                    cancelReservation();
                  }}
                >
                  Yes, delete
                  {/* <button className=''> </button> */}
                </span>
              </span>

              {/* Deleted booking popup */}

              {/* <span className="modal-btn">
              <BookingDeleted
                  show={modalShow}
                  onHide={() => setModalShow(false)}
              />
          </span> */}
            </div>

            {/* <button className='main-btn'> Yes, delete</button> */}
          </div>
        </Modal.Body>
        {/* <button onClick={props.onHide} className='outline-btn mt-2'>
            Cancel
        </button> */}
      </Modal>
    </div>
  );
}

export default ConfirmCancelled;
// render(<App />);
