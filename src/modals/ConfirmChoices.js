import React, { useContext, useState } from "react";
import { ModalContext } from "../services/Modals.Context";
// libraries
import Modal from "react-bootstrap/Modal";

// Local Imports
import EditBooking from "../modals/EditBooking";
import { ChangeBookingContext } from "../services/ChangeBooking.context";
// Images
import CheckTick from "../assets/images/circle-check-bg.png";
export default function ConfirmChoices(props) {
  // Not Cancelled Modal
  const { modalState, dispatch } = useContext(ModalContext);
  // const {}
  const { changeBooking, setChangeBooking } = useContext(ChangeBookingContext);

  const [modalShow, setModalShow] = React.useState(false);

  // Edit Booking Modal
  const [bookingShow, setBookingShow] = React.useState(false);

  const [cancelBtn, setCancelBtn] = useState("Cancel booking");

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
            <img className='' src={CheckTick} alt='search' />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='modal-para mt-2'>Confirmed!</p>

          {/* <div className='mt-3 mb-3'>
          <p className='modal-gray-text'>
            When you created your reservation, we sent
          </p>
          <p className='modal-gray-text'>
            you a confirmation code to your Email. 
          </p>
          <p className='modal-gray-text'>
            Please enter this code.
          </p>
        </div> */}

          <div className='parallel-btns mt-4 mb-3'>
            <div>
              <span className='modal-btn'>
                <span
                  className='red-btn'
                  onClick={() => {
                    dispatch({ type: "show confirmCancelled" });
                    dispatch({ type: "hide confirmChoices" });
                    // cancelReservation();
                  }}
                >
                  Cancel booking
                </span>
              </span>
            </div>

            <div>
              <span className='modal-btn'>
                <span
                  className='main-btn'
                  onClick={() => {
                    dispatch({ type: "show editBooking" });
                    dispatch({ type: "hide confirmChoices" });
                  }}
                >
                  Edit booking
                  {/* <button className=''> </button> */}
                </span>

                {/* <EditBooking
                  show={bookingShow}
                  onHide={() => setBookingShow(false)}
                /> */}
              </span>
            </div>
          </div>
        </Modal.Body>
        {/* <button onClick={props.onHide} className='outline-btn mt-2'>
            Cancel
        </button> */}
      </Modal>
    </div>
  );
}

// render(<App />);
