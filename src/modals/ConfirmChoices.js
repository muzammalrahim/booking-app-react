import React from 'react'

// libraries
import Modal from 'react-bootstrap/Modal';

// Local Imports
import ConfirmCancelled from "../modals/ConfirmCancelled"
import EditBooking from "../modals/EditBooking"

// Images
import CheckTick from "../assets/images/circle-check-bg.png";

function ConfirmChoices(props) {

 // Not Cancelled Modal
 const [modalShow, setModalShow] = React.useState(false);

 // Edit Booking Modal
 const [bookingShow, setBookingShow] = React.useState(false);

  return (
    <div className='done-appt'>
      <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      className='done-appt'
      centered
    >
      <Modal.Header className='book-app'>
        <Modal.Title id="contained-modal-title-vcenter">
          <img className='' src={CheckTick} alt="search" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        <p className='modal-para mt-2'>
        Confirmed!
        </p>

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
          <span className="modal-btn">
              <ConfirmCancelled
                  show={modalShow}
                  onHide={() => setModalShow(false)}
              />
          </span>
        </div>

        <div>
          <span className="modal-btn">
              <EditBooking
                  show={bookingShow}
                  onHide={() => setBookingShow(false)}
              />
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

export default function App() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
    <div className='mt-5'>
      <span className='main-btn' onClick={() => setModalShow(true)}>
        Confirm the code
      </span>
    </div>
      

      <ConfirmChoices
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

// render(<App />);
