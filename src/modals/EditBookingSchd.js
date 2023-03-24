import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { BusinessInfoContext } from "../services/BusinessInfo.context";
import axios from "axios";
import BookAppointment from "../modals/BookAppointment";
import AppointmentDone from "../modals/AppointmentDone";
import AppointmentCancel from "../modals/AppointmentCancel";
import moment from "moment";
import SlotBox from "../views/SlotBox";
import { SelectedSlotsContext } from "../services/SelectedSlots.Context";
import { SelectedDateContext } from "../services/SelectedDate.context";
import { ModalContext } from "../services/Modals.Context";
import { ChangeBookingContext } from "../services/ChangeBooking.context";
import EditSlotBox from "./EditSlotBox";

export default function CalanderSchd(props) {
  const { selDate, locationId } = props;
  const [previousSlot, setPreviousSlot] = useState({ date: "", start: -1 });
  const [showSlots, setShowSlots] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [selectedArr, setSelectedArr] = useState({});
  const { modalState, dispatch } = useContext(ModalContext);
  const { changeBooking, setChangeBooking, changedBooking, setChangedBooking } =
    useContext(ChangeBookingContext);
  const { selectedDateContext, setSelectedDateContext } =
    useContext(SelectedDateContext);
  const { businessInfo, setBusinessInfo } = useContext(BusinessInfoContext);
  const [btnText, setBtnText] = useState("Confirm");
  /////////////////
  var timeSlots;
  var slotsOfDay;
  var availibity;
  const [timeObjects, setTimeObjects] = useState([]);
  // const [slotsOfDay, setSlotsOfDay] = useState();
  const API_URL = process.env.REACT_APP_PUBLIC_URL;
  const getData = async (date) => {
    console.log("GETDATA");
    console.log(timeSlots);
    const res = await fetch(
      API_URL + "reservation/getExistingReservationsForDate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          locationId: locationId,
          date: date,
        }),
      }
    );
    const data = await res.json();
    if (res.status === 422 || !data) {
      console.log("Fetch Failed");
    } else if (res.status === 200) {
      availibity = data;
      render();

      console.log(availibity);
      console.log("Fetch Successful");
      return res.data;
    }
  };

  const setActiveHandler = (data) => {
    let temp = timeObjects.map((obj) => {
      obj.selected = false;
      return obj;
    });
    const index = timeObjects.indexOf(data);
    let tempObj = data;
    tempObj.selected = !tempObj.selected;
    temp[index] = tempObj;
    setTimeObjects(temp);
  };

  const render = () => {
    timeSlots = businessInfo?.timeSlots;
    // console.log(timeSlots);
    const date = new Date(selDate);
    const weekdayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeek = weekdayNames[date.getDay()];
    switch (dayOfWeek) {
      case "Sunday": {
        slotsOfDay = timeSlots["1"];
        break;
      }
      case "Monday": {
        slotsOfDay = timeSlots["2"];
        break;
      }
      case "Tuesday": {
        slotsOfDay = timeSlots["3"];
        break;
      }
      case "Wednesday": {
        slotsOfDay = timeSlots["4"];
        break;
      }
      case "Thursday": {
        slotsOfDay = timeSlots["5"];
        break;
      }
      case "Friday": {
        slotsOfDay = timeSlots["6"];
        break;
      }
      case "Saturday": {
        slotsOfDay = timeSlots["7"];
        break;
      }
    }
    slotsOfDay = JSON.parse(slotsOfDay);
    const unAvailable = Object.keys(availibity?.unAvailability);
    var tempTimesArr = [];
    console.log(changeBooking);
    const unAvailableVar = unAvailable.map((val) => {
      if (val > 0) {
        return val - 86400;
      } else return Number(val);
    });
    for (let i = 0; i < slotsOfDay.length; i++) {
      const timestamp = slotsOfDay[i];
      const startDate = new Date(timestamp * 1000); // Convert timestamp to milliseconds
      const endDate = new Date((timestamp + 5400) * 1000); // Add 90 minutes (5400 seconds) to the start time
      let startTime = startDate.toISOString().substr(11, 5); // Extract start time in format "HH:mm"
      let endTime = endDate.toISOString().substr(11, 5); // Extract end time in format "HH:mm"

      var is_active = true;
      var selected = false;
      var booked = false;
      if (unAvailableVar.includes(timestamp)) {
        is_active = false;
      }
      // console.log(changeBooking.startTime, timestamp);
      var changeBookingST = 86400 + Number(timestamp);
      // console.log(changeBookingST);
      // console.log(formatDate(changeBooking.date), selDate);
      if (
        changeBooking.startTime == changeBookingST &&
        formatDate(changeBooking.date) == selDate
      ) {
        // console.log("TRUE");
        booked = true;
      }
      tempTimesArr.push({
        start: startTime,
        end: endTime,
        selected: selected,
        is_active: is_active,
        booked: booked,
      });
      // console.log(object);
    }
    console.log(tempTimesArr);
    setTimeObjects(tempTimesArr);
    setShowSlots(true);
  };

  function convertTimeToSeconds(timeString) {
    const [hours, minutes] = timeString.split(":");
    return hours * 3600 + minutes * 60;
  }

  function convertToSeconds(obj) {
    const startSeconds = convertTimeToSeconds(obj.start);
    const endSeconds = convertTimeToSeconds(obj.end);
    return {
      ...obj,
      start: startSeconds,
      end: endSeconds,
    };
  }

  // editReservationApi(payload);

  const editReservationApi = async (payload) => {
    localStorage.setItem("payload", JSON.stringify(payload));
    setBtnText("Changing...");
    axios
      .post(API_URL + "reservation/editReservation", { ...payload })
      .then((response) => {
        console.log("SUCCESSFULLY EDITED");
        setChangedBooking(payload);
        dispatch({ type: "hide editBooking" });
        dispatch({ type: "show bookingChanged" });
        // setBusinessInfo(response.data);
        // console.log(response.data.business.LocationId);
        // console.log(response.data);
        // setBtnText("Book appointment");
        // console.log(response.data);
        // localStorage.setItem("reservationId", response.data.id);
        // window.location.href = response.data.redirect_url;
        // return response.data;
      })
      .catch((error) => {
        console.log(error.response.status);
        console.log(error.message);
        return error.message;
      });
  };

  const handleEdit = () => {
    // e.preventDefault();
    // console.log(selectedDateContext);
    const date = new Date(selectedDateContext);
    const month = date.getMonth() + 1; // Add 1 to get 1-based month
    const day = date.getDate();
    const year = date.getFullYear();
    const formattedDate = month + "/" + day + "/" + year;
    const reservationId = localStorage.getItem("reservationId");
    // console.log(reservationId);
    const initialDate = moment(formattedDate).format("M/D/YYYY");
    const momentObj = moment.utc(initialDate, "M/D/YYYY");
    const isoString = momentObj.toISOString();
    var formattedString = momentObj.format("YYYY-MM-DDTHH:mm:ssZ");
    // console.log(formattedString); // Output: "4/28/2023"
    const selectedSlot = timeObjects.find((obj) => {
      return obj.selected == true;
    });
    const newObj = convertToSeconds(selectedSlot);
    var payload = {
      reservationId: reservationId,
      courtId: 1,
      date: formattedString,
      startTime: newObj.start,
      endTime: newObj.end,
      duration: businessInfo.location.duration,
    };
    console.log(payload);
    if (payload.startTime) {
      editReservationApi(payload);
    }
    // console.log(payload);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.getMonth() + 1; // Add 1 to get 1-based month
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  const handlepreviousSlot = (selDate, bookDate) => {
    const bookDateformat = formatDate(bookDate);
    console.log(selDate, bookDateformat);
    if (selDate == bookDateformat) {
      console.log("selDate=bookDate");
      setPreviousSlot({
        date: bookDateformat,
        start: JSON.parse(localStorage.getItem("payload")).startTime,
      });
    } else {
      setPreviousSlot({
        date: "",
        start: -1,
      });
    }
  };
  useEffect(() => {
    setShowSlots(false);
    // console.log(selDate);
    handlepreviousSlot(
      selDate,
      JSON.parse(localStorage.getItem("payload")).date
    );
    console.log(JSON.parse(localStorage.getItem("payload")));
    getData(selDate);
  }, [selDate]);

  useEffect(() => {
    handlepreviousSlot(
      selDate,
      JSON.parse(localStorage.getItem("payload")).date
    );
  }, []);

  if (businessInfo) {
    return (
      <div className='cal-view-main'>
        <div className='cal-inner'>
          <div className='container'>
            {/* -----------Calander Start--------- */}
            <div className='pt-3 pos-area'>
              <div className='container'>
                <div className='bottom-div pt-4'>
                  {/* -----------Time Schedule div---------- */}
                  <div className='time-schd-edit pb-5'>
                    {showSlots ? (
                      timeObjects?.map((data) => {
                        if (data.is_active === true && !data.booked) {
                          return (
                            <EditSlotBox
                              // classes={classes}
                              click={() => setActiveHandler(data)}
                              slot={data}
                              date={selDate}
                              selected={data.selected}
                            ></EditSlotBox>
                          );
                        } else if (data.is_active === false && !data.booked) {
                          return (
                            <div className='gray-sch sch-tab'>
                              <span>
                                <div>
                                  {data?.start} - {data?.end}
                                </div>
                              </span>
                            </div>
                          );
                        } else if (data.booked) {
                          return (
                            <>
                              <div className='booked-sch sch-tab'>
                                <span>
                                  <div>
                                    {data?.start} - {data?.end}
                                  </div>
                                </span>
                              </div>
                            </>
                          );
                        }
                      })
                    ) : (
                      <p>Loading Data...</p>
                    )}
                  </div>
                  {/* ----------Time Schedule div-------- */}

                  {/* ------------Price Div----------- */}
                  {/* <div className='price-div pb-5'>
                    <div>
                      <h2>Price</h2>
                      <span>For {convertMinutesToHHMM()} hour</span>
                    </div>

                    <div>
                      <h2>
                        {businessInfo.business.currency}{" "}
                        {businessInfo.location.rent}
                      </h2>
                    </div>
                  </div> */}
                  {/* ------------Price Div----------- */}

                  <div className='parallel-btns mt-4 mb-3'>
                    <div>
                      <button
                        className='outline-btn'
                        onClick={() => {
                          dispatch({ type: "hide editBooking" });
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                    <div>
                      <span className='modal-btn'>
                        <span className='main-btn' onClick={() => handleEdit()}>
                          {btnText}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* <div className='btn-div'>
                    <Link to="/cal-shd">
                    <span
                      onClick={() => {
                        handleSelectedSlots();
                        setModalShow(true);
                      }}
                    >
                      <button className='main-btn'>Next</button>
                    </span>
                    <BookAppointment
                      show={modalShow}
                      props={{ date: selDate, slots: selectedArr }}
                      onHide={() => setModalShow(false)}
                    />
                    <div className='mt-2'>
                      <button className='main-btn'> <AppointmentDone/></button>
                      <br />
                      <button className='main-btn mt-2'> <AppointmentCancel/></button>
                    </div>
                    </Link> */}
                </div>
              </div>
            </div>
          </div>
          {/* -----------Calander End--------- */}
        </div>
      </div>
      //   </div>
    );
  } else {
    return <>Loading data</>;
  }
}
