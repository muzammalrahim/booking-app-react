import React from 'react'


import Modal from 'react-bootstrap/Modal';

import CheckTick from "../assets/images/cancel.png";


 function BookingNotCancelled(props) {
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
        Yes, delete
        {/* <button className=''> </button> */}
      </span>
      

      <BookingNotCancelled
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

// render(<App />);