import React, { useContext } from "react";
import { ModalContext } from "../services/Modals.Context";

// libraries
import Modal from "react-bootstrap/Modal";

// local imports
import WeeklyCalander from "../modals/WeeklyCalander";

// images
import CheckTick from "../assets/images/circle-check-bg.png";

export default function EditBooking(props) {
  // Not Changed Modal
  const { modalState, dispatch } = useContext(ModalContext);
  const [modalShow, setModalShow] = React.useState(false);

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
            <h2 className='modal-para'>Edit booking</h2>
            <WeeklyCalander />
            {/* <img className='' src={CheckTick} alt="search" /> */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='time-schd time-sch-popup pb-2 mt-4'>
            <div className='gray-sch-fill sch-tab'>
              <span>09:00 - 10:00</span>
            </div>
            <div className='gray-sch-fill sch-tab'>
              <span>09:00 - 10:00</span>
            </div>
            <div className='black-sch sch-tab'>
              <span>09:00 - 10:00</span>
            </div>
            <div className='black-sch sch-tab'>
              <span>09:00 - 10:00</span>
            </div>
            <div className='black-sch sch-tab'>
              <span>09:00 - 10:00</span>
            </div>
            <div className='black-sch sch-tab'>
              <span>09:00 - 10:00</span>
            </div>
            <div className='black-sch sch-tab'>
              <span>09:00 - 10:00</span>
            </div>
            <div className='black-sch sch-tab'>
              <span>09:00 - 10:00</span>
            </div>
            <div className='gray-sch-fill sch-tab'>
              <span>09:00 - 10:00</span>
            </div>
          </div>

          {/* <div className='pb-4'>
          
          <p className='modal-para'>
            has been canceled
          </p>
        </div> */}

          <div className='parallel-btns mt-4 mb-3'>
            <div>
              <button className='outline-btn'>Cancel</button>
            </div>
            <div>
              <span className='modal-btn'>
                <span
                  className='main-btn'
                  onClick={() => dispatch({ type: "show bookingChanged" })}
                >
                  Confirm
                </span>
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
