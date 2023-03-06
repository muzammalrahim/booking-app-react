import React from "react";
import { ModalContext } from "../services/Modals.Context";
import { useContext } from "react";
// libraries
import Modal from "react-bootstrap/Modal";

// Local Imports

export default function ConfirmCode(props) {
  // Confirm Choices Modal
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
            {/* <img className='' src={CheckTick} alt="search" /> */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='modal-para'>Change appointment</p>

          <div className='mt-3 mb-3'>
            <p className='modal-gray-text'>
              When you created your reservation, we sent
            </p>
            <p className='modal-gray-text'>
              you a confirmation code to your Email.
            </p>
            <p className='modal-gray-text'>Please enter this code.</p>
          </div>

          <div className='confirm-code-div mb-4'>
            <div className='confirm-block'>3</div>
            <div className='confirm-block'>2</div>
            <div className='confirm-block'>5</div>
            <div className='confirm-block'>8</div>
          </div>
          <div className='mb-4'>
            {/* <span
              onClick={() => {
                // props.parent();
              }}
              className='modal-btn'
            >
              <ConfirmChoices
                show={modalShow}
                onHide={() => {
                  props.parent();
                  setModalShow(false);
                }}
              />
            </span> */}
            <span
              className='main-btn'
              onClick={() => {
                dispatch({ type: "hide confirmCode" });
                dispatch({ type: "show confirmChoices" });
                // setModalShow(true);
              }}
            >
              Confirm the code
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

// render(<App />);
