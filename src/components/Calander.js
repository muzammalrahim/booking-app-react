import React, { useEffect, useContext, useState } from "react";
import { ModalContext } from "../services/Modals.Context";
import BookingChanged from "../modals/BookingChanged";

// libraries
import Calendar from "react-calendar";
import { Link } from "react-router-dom";
import EditBooking from "../modals/EditBooking";
import ConfirmCancelled from "../modals/ConfirmCancelled";
import BookingNotCancelled from "../modals/BookingNotCancelled";

// Local Imports
import CalanderSchd from "../views/CalanderSchd";
import WeeklyCalander from "../modals/WeeklyCalander";
import ConfirmCode from "../modals/ConfirmCode";
import ConfirmChoices from "../modals/ConfirmChoices";

import { BusinessInfoContext } from "../services/BusinessInfo.context";
import { SelectedDateContext } from "../services/SelectedDate.context";

import EclipseBG from "../assets/images/eclipse-bottom.png";
import Header from "./Header";
export default function Calander() {
  // confirm modal
  const { modalState, dispatch } = useContext(ModalContext);
  const [confirmCodeShow, setConfirmCodeShow] = React.useState(false);
  console.log(modalState.confirmCodeBool);
  const { selectedDateContext, setSelectedDateContext } =
    useContext(SelectedDateContext);
  const { businessInfo, setBusinessInfo } = useContext(BusinessInfoContext);
  const [date, setDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [tempTS, setTempTS] = useState(date); //temp timeStamp to test
  const locationId = businessInfo?.business?.LocationId;
  //   console.log(locationId);
  // const onClick = () => setShow(!show);
  //   console.log(businessInfo.timeSlots);

  //   const timeSlots = {
  //     1: "[-32400,-27000,-21600,-16200,-10800,-5400,0]",
  //     2: "[-32400,-27000,-21600,-16200,-10800,-5400,0]",
  //     3: "[-32400,-27000,-21600,-16200,-10800,-5400,0]",
  //     4: "[-32400,-27000,-21600,-16200,-10800,-5400,0]",
  //     5: "[-32400,-27000,-21600,-16200,-10800,-5400,0]",
  //     6: "[-32400,-27000,-21600,-16200,-10800,-5400,0]",
  //     7: "[-32400,-27000,-21600,-16200,-10800,-5400,0]",
  //   };

  const timeSlots = businessInfo?.timeSlots
    ? businessInfo.timeSlots
    : {
        1: "[-32400,-27000,-21600,-16200,-10800,-5400,0]",
        2: "[-32400,-27000,-21600,-16200,-10800,-5400,0]",
        3: "[-32400,-27000,-21600,-16200,-10800,-5400,0]",
        4: "[-32400,-27000,-21600,-16200,-10800,-5400,0]",
        5: "[-32400,-27000,-21600,-16200,-10800,-5400,0]",
        6: "[-32400,-27000,-21600,-16200,-10800,-5400,0]",
        7: "[-32400,-27000,-21600,-16200,-10800,-5400,0]",
      };
  const weekdays = Object.keys(timeSlots);

  const humanReadableTimeSlots = {};

  weekdays.forEach((weekday) => {
    const timestamps = JSON.parse(timeSlots[weekday]);

    const dateObjects = timestamps.map(
      (timestamp) => new Date(timestamp * 1000)
    );

    const timeStrings = dateObjects.map((date) => date.toLocaleTimeString());

    humanReadableTimeSlots[weekday] = timeStrings;
  });

  //   console.log(humanReadableTimeSlots);
  //   const onClick = () => {
  //     setShow((prevState) => !show && !prevState);
  //   };
  //   const dayOfWeek = date.toLocaleDateString();
  //   const temp = date.toISOString();
  //   setSelectedDate(temp);
  //   console.log(dayOfWeek);

  useEffect(() => {
    // console.log("TEMP TS");
    // console.log(tempTS);
    // console.log("Calender Date");
    // console.log(date);
    // console.log(tempTS.toLocaleString());
    // setTempTS(updatedDateString);
  }, [date]);

  useEffect(() => {
    // console.log(show);
    // setShow(true);
    // console.log(show);
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
    const temp = date.toISOString();
    setSelectedDate(temp);
    // console.log(tempTS);
    // console.log(dayOfWeek);
    switch (dayOfWeek) {
      case "Sunday": {
        setSelectedTimeSlot(humanReadableTimeSlots[1]);
        break;
      }
      case "Monday": {
        setSelectedTimeSlot(humanReadableTimeSlots[2]);
        break;
      }
      case "Tuesday": {
        setSelectedTimeSlot(humanReadableTimeSlots[3]);
        break;
      }
      case "Wednesday": {
        setSelectedTimeSlot(humanReadableTimeSlots[4]);
        break;
      }
      case "Thursday": {
        setSelectedTimeSlot(humanReadableTimeSlots[5]);
        break;
      }
      case "Friday": {
        setSelectedTimeSlot(humanReadableTimeSlots[6]);
        break;
      }
      case "Saturday": {
        setSelectedTimeSlot(humanReadableTimeSlots[7]);
        break;
      }
      default:
        break;
      // code block
    }
    // console.log(date.getDay());
  }, [date]);

  const setDateHandler = (date) => {
    setShow(true);
    setDate(date);

    const isoString = new Date(date).toISOString();
    setTempTS(new Intl.DateTimeFormat("en-US").format(date));
    setSelectedDateContext(tempTS);
    console.log(selectedDateContext);
    // setSelectedDateContext(date);
  };
  useEffect(() => {
    if (businessInfo) console.log(businessInfo);
  }, [businessInfo]);

  return (
    <div className='pt-3 pos-area'>
      <div className='container'>
        <div className='calendar-container'>
          {/* {console.log(selectedDate)} */}
          <Calendar onChange={(val) => setDateHandler(val)} value={date} />
          {show ? (
            <CalanderSchd
              timeSlots={selectedTimeSlot}
              selDate={tempTS}
              locationId={locationId}
            />
          ) : null}
          {/* <CalanderSchd
            timeSlots={selectedTimeSlot}
            selDate={tempTS}
            locationId={locationId}
          /> */}
        </div>

        {/* <p className='text-center'> */}
        {/* <span className='bold'>Selected Date:</span> {date.toUTCString()} */}
        {/* <br /> */}
        {/* <br /> */}
        {/* <span className='bold'>Selected Date:</span> {tempTS.toLocaleString()} */}
        {/* </p> */}

        <div className={show === false ? "showPlans" : "hidePlans"}>
          <div className='bottom-div pt-4'>
            <h2>Your plans changed?</h2>
            <p className='bot-para'>
              If you need to make changes to your appointment or you want to
              cancel it please press the button below
            </p>

            <div className='btn-div'>
              <span className='modal-btn'>
                <span
                  className='main-btn'
                  onClick={() => {
                    // props.closeModal();
                    // setModalShow(true);
                    dispatch({ type: "show confirmCode" });
                  }}
                >
                  Change booking
                </span>

                <ConfirmCode
                  // show={modalShow}
                  show={modalState.confirmCodeBool}
                  onHide={() => dispatch({ type: "hide confirmCode" })}
                />
              </span>
              <ConfirmChoices
                // show={modalShow}
                show={modalState.confirmChoicesBool}
                onHide={() => dispatch({ type: "hide confirmChoices" })}
              />

              <EditBooking
                show={modalState.editBookingBool}
                onHide={() => dispatch({ type: "hide editBooking" })}
              />
              <ConfirmCancelled
                show={modalState.confirmCancelledBool}
                onHide={() => dispatch({ type: "hide confirmCancelled" })}
              />
              <BookingChanged
                show={modalState.bookingChangedBool}
                onHide={() => dispatch({ type: "hide bookingChanged" })}
              />

              <BookingNotCancelled
                show={modalState.bookingNotCancelledBool}
                onHide={() => dispatch({ type: "hide bookingNotCancelled" })}
              />

              {/* <Link to='/cal-shd'>
                <button className='main-btn'>
                  <ConfirmCode
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                    />
                  Change booking
                </button>
              </Link> */}
            </div>
          </div>
        </div>
      </div>
      {/* <img className='cal-bottom-bg' src={EclipseBG} alt="bg-img" />   */}
    </div>
  );
}
