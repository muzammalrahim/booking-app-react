import React, { useState, useContext, useEffect } from "react";
import { ModalContext } from "../services/Modals.Context";
// libraries
import Modal from "react-bootstrap/Modal";
import Calendar from "react-calendar";
import { SelectedDateContext } from "../services/SelectedDate.context";
// local imports
import WeeklyCalander from "../modals/WeeklyCalander";
import EditBookingSchd from "./EditBookingSchd";
import { ChangeBookingContext } from "../services/ChangeBooking.context";
import { BusinessInfoContext } from "../services/BusinessInfo.context";
// images
import CheckTick from "../assets/images/circle-check-bg.png";

export default function EditBooking(props) {
  const { changeBooking, setChangeBooking } = useContext(ChangeBookingContext);
  const { businessInfo, setBusinessInfo } = useContext(BusinessInfoContext);
  const { selectedDateContext, setSelectedDateContext } =
    useContext(SelectedDateContext);
  const locationId = businessInfo?.business?.LocationId;
  const [showCalender, setShowCalender] = useState(false);
  // Not Changed Modal
  const { modalState, dispatch } = useContext(ModalContext);
  const [modalShow, setModalShow] = React.useState(false);
  const [date, setDate] = useState(new Date());
  const [tempTS, setTempTS] = useState(date); //temp timeStamp to test
  var selDate;
  const formatDate = (d) => {
    const dd = new Date(d).toDateString().split(" ");
    console.log(d);
    console.log(dd);
    const dateWY = [dd[0], dd[1], dd[2]];
    console.log(dateWY);
    const finalDate = `${dateWY.join(" ")} 2023`;
    const dateFormat = new Date(finalDate);
    console.log(dateFormat);
    setSelectedDateContext(dateFormat);
    setDate(dateFormat);
    setShowCalender(true);
  };
  useEffect(() => {
    console.log(changeBooking);
    console.log(changeBooking.date);
    formatDate(changeBooking.date);
  }, [changeBooking]);

  useEffect(() => {
    const isoString = new Date(date).toISOString();
    setTempTS(new Intl.DateTimeFormat("en-US").format(date));
    const tempTime = new Intl.DateTimeFormat("en-US").format(date);
    const dateVar = new Date(date);
    const month = dateVar.getMonth() + 1;
    const day = dateVar.getDate();
    const year = dateVar.getFullYear();
    const formattedDate = `${month}/${day}/${year}`;
    // console.log(formattedDate);
    // setSelectedDateContext(formattedDate);
    // console.log(selectedDateContext);
    // console.log(date);
    selDate = formattedDate;
    setSelectedDateContext(date);

    // console.log(selDate);
  }, [date]);
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
            <h2 className='modal-para-edit'>Edit booking</h2>
            {/* <WeeklyCalander /> */}
            <div className='weekly-calander'>
              {/*<Calendar onChange={(val) => setDateHandler(val)} value={date} />
           {show ? (
            <CalanderSchd
              timeSlots={selectedTimeSlot}
              selDate={tempTS}
              locationId={locationId}
              />
            ) : null} */}
              {showCalender && <Calendar onChange={setDate} value={date} />}
            </div>

            {/* <img className='' src={CheckTick} alt="search" /> */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditBookingSchd
            selDate={tempTS}
            locationId={locationId}
          ></EditBookingSchd>

          {/* <div className='time-schd time-sch-popup pb-2 mt-4'>
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
          </div> */}

          {/* <div className='pb-4'>
          
          <p className='modal-para'>
            has been canceled
          </p>
        </div> */}
        </Modal.Body>
        {/* <button onClick={props.onHide} className='outline-btn mt-2'>
            Cancel
        </button> */}
      </Modal>
    </div>
  );
}

// render(<App />);
