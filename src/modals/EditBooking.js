import React from 'react'

// libraries
import Modal from 'react-bootstrap/Modal';

// local imports
import WeeklyCalander from "../modals/WeeklyCalander"
import BookingChanged from "../modals/BookingChanged"

// images
import CheckTick from "../assets/images/circle-check-bg.png";


 function EditBooking(props) {

// Not Changed Modal
 const [modalShow, setModalShow] = React.useState(false);


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
            <h2 className='modal-para'>
            Edit booking
            </h2>
          <WeeklyCalander/>
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
                <span className="modal-btn">
                    <BookingChanged
                        show={modalShow}
                        onHide={() => setModalShow(false)}
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

      <span className='main-btn' onClick={() => setModalShow(true)}>
        Edit booking
        {/* <button className=''> </button> */}
      </span>
      

      <EditBooking
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

// render(<App />);