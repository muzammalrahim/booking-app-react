import React from 'react'

// libraries
import Modal from 'react-bootstrap/Modal';

// Local Imports
import ConfirmChoices from "../modals/ConfirmChoices"


 function ConfirmCode(props) {
    // Confirm Choices Modal
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
          {/* <img className='' src={CheckTick} alt="search" /> */}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        <p className='modal-para'>
            Change appointment
        </p>

        <div className='mt-3 mb-3'>
          <p className='modal-gray-text'>
            When you created your reservation, we sent
          </p>
          <p className='modal-gray-text'>
            you a confirmation code to your Email. 
          </p>
          <p className='modal-gray-text'>
            Please enter this code.
          </p>
        </div>
        
        <div className='confirm-code-div mb-4'>
            <div className="confirm-block">3</div>
            <div className="confirm-block">2</div>
            <div className="confirm-block">5</div>
            <div className="confirm-block">8</div>
        </div>
        <div className='mb-4'>
            <span className="modal-btn">
                <ConfirmChoices
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </span>
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
      Change booking
      </span>

      <ConfirmCode
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

// render(<App />);
