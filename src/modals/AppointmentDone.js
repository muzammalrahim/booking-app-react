import React from 'react'


import Modal from 'react-bootstrap/Modal';

import CheckTick from "../assets/images/circle-check.png";


 function AppointmentDone(props) {
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
          <img className='' src={CheckTick} alt="search" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        <p className='modal-para'>
          Your appointment has been booked
        </p>

        <div className='mt-3 mb-3'>
          <p className='modal-gray-text'>
            Your booking is on Friday 10th February 
          </p>
          <p className='modal-gray-text'>
            2023 at 12:00 pm. 
          </p>
          <p className='modal-gray-text'>
            Your reservation code: 2318 
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
      <span onClick={() => setModalShow(true)}>
      Done
      </span>

      <AppointmentDone
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

// render(<App />);