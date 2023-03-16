import React, { useContext, useEffect, useState } from "react";
import AppForm from "../components/AppForm";
import { BusinessInfoContext } from "../services/BusinessInfo.context";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { TimeStringContext } from "../services/TimeString.context";
// const [showText, setShowText] = useState(false);

export default function BookAppointment(props) {
  const [selectedSlots, setSelectedSlots] = useState([]);
  const { businessInfo, setBusinessInfo } = useContext(BusinessInfoContext);
  const { timeStringContext, setTimeStringContext } =
    useContext(TimeStringContext);
  useEffect(() => {
    setSelectedSlots(props.props.slots);
    setTimeStringContext(props.props.slots[0]);
  }, [props]);

  const [show, setShow] = useState(false);

  return (
    <Modal
      {...props}
      size='md'
      className='appt-modal'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header className='book-app' closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          <h5>Book an appointment</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className='modal-para'>
          Please confirm that you would like to request the following
          appointment:
        </p>
        <div className='cal-date-div mt-3'>
          <div></div>
          <div>
            <p className='modal-para'>
              {new Date(props.props.date).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}{" "}
              {/* {() => handleSlots()} */}
              {selectedSlots.length > 0 &&
                selectedSlots?.map((obj) => {
                  return (
                    <>
                      {obj.start} - {obj.end}
                    </>
                  );
                })}
              {/* at 12:00 pm - 13:30 pm */}
            </p>
          </div>
        </div>
        <div className='confir-form mt-4'>
          <p className='modal-para'>Confirmation:</p>
          <p className='des-para mt-3'>
            Please enter your Name, Email and Phone number
            <span className='staric'>*</span>
          </p>
          <div className='mt-3'>
            <AppForm />
          </div>
        </div>
      </Modal.Body>
      {/* <button onClick={props.onHide} className='outline-btn mt-2'>
            Cancel
        </button> */}
    </Modal>
  );
}
