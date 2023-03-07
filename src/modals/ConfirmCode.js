import React, { useRef } from "react";
import { ModalContext } from "../services/Modals.Context";
import { useContext, useState } from "react";
import axios from "axios";
// libraries
import Modal from "react-bootstrap/Modal";
const API_URL = process.env.REACT_APP_PUBLIC_URL;

// Local Imports

export default function ConfirmCode(props) {
  // Confirm Choices Modal
  const [apiCall, setApiCall] = useState(false);
  const [error, setError] = useState(false);
  const { modalState, dispatch } = useContext(ModalContext);
  const [modalShow, setModalShow] = React.useState(false);
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const [otp, setOtp] = useState("");

  function handleInputChange(index, event) {
    const { value } = event.target;

    // Move focus to the next input field if a digit is entered
    if (value.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }

    // Update OTP state
    const newOtp = otp.slice(0, index) + value + otp.slice(index + 1);
    setOtp(newOtp);

    // Call a function when all 6 digits are entered
    if (newOtp.length === 6) {
      handleOtpConfirmation(newOtp);
    }
  }

  // function handleOtpConfirmation(otp) {
  //   // Send OTP to API for confirmation
  //   console.log("Sending OTP to API:", otp);
  //   // Reset OTP state
  //   setOtp("");
  // }

  const handleOtpConfirmation = async (otp) => {
    setApiCall(true);
    setError(false);
    console.log(otp);
    axios
      .post(API_URL + "reservation/sendOTPtoEmail", {
        email: "saqibsdesk@gmail.com", // change email here
        otp: otp,
      })
      .then((response) => {
        console.log(response.status);
        setApiCall(false);
        dispatch({ type: "hide confirmCode" });
        dispatch({ type: "show confirmChoices" });
        setOtp("");

        return response.data;
      })
      .catch((error) => {
        setError(true);
        setApiCall(false);
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
            {inputRefs.map((ref, index) => (
              <div className='confirm-block' key={index}>
                <input
                  type='text'
                  placeholder='0'
                  maxLength={1}
                  onChange={(event) => handleInputChange(index, event)}
                  ref={ref}
                />
              </div>
            ))}
            {/* <div className='confirm-block'>
              <input type='text' placeholder='0' />
            </div>
            <div className='confirm-block'>
              <input type='text' placeholder='0' />
            </div>
            <div className='confirm-block'>
              <input type='text' placeholder='0' />
            </div>
            <div className='confirm-block'>
              <input type='text' placeholder='0' />
            </div>
            <div className='confirm-block'>
              <input type='text' placeholder='0' />
            </div>
            <div className='confirm-block'>
              <input type='text' placeholder='0' />
            </div>{" "} */}
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
            {error && (
              <div class='alert alert-danger' role='alert'>
                Wrong OTP
              </div>
            )}
            <span
              className='main-btn'
              onClick={() => {
                handleOtpConfirmation(otp);
                // setModalShow(true);
              }}
            >
              {apiCall ? "Verifing" : "Confirm the code"}
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
