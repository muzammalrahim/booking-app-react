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
  // const handleSlots = () => {
  //   console.log("Handle SLots");
  //   const tempSelected = props?.props?.slots.filter((obj) => {
  //     return obj.selected;
  //   });
  //   setSelectedSlots(tempSelected);
  //   console.log(selectedSlots);

  //   console.log(selectedSlots);
  // };
  useEffect(() => {
    setSelectedSlots(props.props.slots);
    console.log(props.props);
    console.log(businessInfo);
    console.log("Selected Slots in book Appointment Modal");
    console.log(props.props.slots);
    setTimeStringContext(props.props.slots[0]);
    console.log(timeStringContext);
    // handleSlots();
    // const tempSelected = props?.props?.slots.filter((obj) => {
    //   return obj.selected;
    // });
    // setSelectedSlots(tempSelected);
    // console.log(selectedSlots);
  }, []);

  const [showText, setShowText] = useState(false);
  const onClick = () => setShowText(true);

  // const times = [
  //   {
  //     slot_time: "10:00 11:00",
  //     is_active: false,
  //   },
  //   {
  //     slot_time: "11:00 12:00",
  //     is_active: false,
  //   },
  //   {
  //     slot_time: "12:00 13:00",
  //     is_active: false,
  //   },
  //   {
  //     slot_time: "10:00 11:00",
  //     is_active: true,
  //   },
  //   {
  //     slot_time: "11:00 12:00",
  //     is_active: true,
  //   },
  //   {
  //     slot_time: "12:00 13:00",
  //     is_active: true,
  //   },
  // ];

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
                      {obj.start}- {obj.end} {" , "}
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

// export default function App(props) {
//   const [modalShow, setModalShow] = React.useState(false);

//   return (
//     <>
//       <span onClick={() => setModalShow(true)}>Next</span>

//       <BookAppointment
//         show={modalShow}
//         // props={props}
//         onHide={() => setModalShow(false)}
//       />
//     </>
//   );
// }

// render(<App />);
