import React from 'react'

// libraries
import Modal from 'react-bootstrap/Modal';

// local imports
import ConfirmCancelled from "../modals/ConfirmCancelled";


 function BookingCancelled(props) {
  return (
    <div className='done-appt'>
      <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      className='done-appt'
      centered
    >
      <Modal.Header className='book-app'>
        <Modal.Title id="contained-modal-title-vcenter">
          {/* <img className='' src={CheckTick} alt="search" /> */}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        <div className='pb-4'>
          <p className='modal-para'>
            Bookings in less than 24 hours 
          </p>
          <p className='modal-para'>
            cannot be canceled
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

export default function App() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>

      <span className='main-btn' onClick={() => setModalShow(true)}>
        Cancel booking
      </span>
      

      <BookingCancelled
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

// render(<App />);