import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { BusinessInfoContext } from "../services/BusinessInfo.context";
import axios from "axios";
import BookAppointment from "../modals/BookAppointment";
import AppointmentDone from "../modals/AppointmentDone";
import AppointmentCancel from "../modals/AppointmentCancel";
import moment from "moment";
import SlotBox from "./SlotBox";
import { SelectedSlotsContext } from "../services/SelectedSlots.Context";
import { SelectedDateContext } from "../services/SelectedDate.context";

export default function CalanderSchd(props) {
  const { businessInfo, setBusinessInfo } = useContext(BusinessInfoContext);
  const { selectedSlots, setselectedSlots } = useContext(SelectedSlotsContext);
  const [showSlots, setShowSlots] = useState(false);
  const { selectedDateContext, setSelectedDateContext } =
    useContext(SelectedDateContext);
  const { timeSlots, selDate, locationId } = props;
  const apiTimeSlots = businessInfo.timeSlots;
  const [TSArray, setTSArray] = useState([]); //time slots array in epoch

  // console.log(apiTimeSlots["1"]);
  // console.log("TimeSlots in calenderSchd");
  const dateTemp = new Date(selDate);
  const dayOfWeek = dateTemp.toLocaleDateString("en-US", {
    weekday: "short",
  });

  const getTSArray = () => {
    // console.log("---------------------");
    // console.log(dayOfWeek);
    switch (dayOfWeek) {
      case "Sun": {
        // return apiTimeSlots["1"];
        setTSArray(apiTimeSlots["1"]);
        break;
      }
      case "Mon:": {
        // return apiTimeSlots["2"];
        setTSArray(apiTimeSlots["2"]);
        break;
      }
      case "Tue:": {
        // return apiTimeSlots["3"];
        setTSArray(apiTimeSlots["3"]);
        break;
      }
      case "Wed:": {
        // return apiTimeSlots["4"];
        setTSArray(apiTimeSlots["4"]);
        break;
      }
      case "Thu:": {
        // return apiTimeSlots["5"];
        setTSArray(apiTimeSlots["5"]);
        break;
      }
      case "Fri:": {
        // return apiTimeSlots["6"];
        setTSArray(apiTimeSlots["6"]);
        break;
      }
      case "Sat:": {
        // return apiTimeSlots["7"];
        setTSArray(apiTimeSlots["7"]);
        break;
      }
    }
  };
  // useEffect(() => {}, []);

  // console.log(dayOfWeek); // Output: "Wednesday"
  // console.log(selDate);
  const [hours, setHours] = useState(0);
  const [modalShow, setModalShow] = React.useState(false);
  const [timesArr, setTimesArr] = useState({});
  const [selectedArr, setSelectedArr] = useState({});
  const [date, setDate] = useState();
  const [showText, setShowText] = useState(false);
  const onClick = () => setShowText(true);
  const [active, setActive] = useState(null);
  // const [availibity, setAvailibity] = useState();
  var availibity;

  const API_URL = process.env.REACT_APP_PUBLIC_URL;
  const getData = async (date) => {
    console.log("GETDATA");
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
      // setAvailibity(data);
      availibity = data;
      // console.log("THENN");
      console.log(data);
      createSlots(timeSlots);
      getTSArray();
      // console.log(response.data);

      console.log(res.status);
      console.log("Fetch Successful");
      return res.data;
      // navigate("/Login");
    }
    // navigate("/Login");
    // console.log(user);
  };

  // const getData = async (date) => {
  //   console.log(locationId);
  //   console.log("GET DATA Calender Schd");
  //   axios
  //     .post(API_URL + "reservation/getExistingReservationsForDate", {
  //       locationId: locationId,
  //       date: date,
  //     })
  //     .then((response) => {
  //       setAvailibity(response.data);
  //       console.log("THENN");
  //       createSlots(timeSlots);
  //       getTSArray();
  //       // console.log(response.data);
  //       return response.data;
  //     })
  //     .catch((error) => {
  //       // console.log(error.response);
  //       console.log("CATCH");
  //       console.log(error.message);
  //       return error.message;
  //     });
  // };

  function createSlots(startTimes) {
    const slots = [];
    // console.log("closedARR");
    // console.log(startTimes);
    // console.log(Object.keys(availibity.unAvailability));
    // console.log(Object.keys(availibity?.unAvailability));
    const unAvailable = Object.keys(availibity?.unAvailability);

    // console.log("TSArray");
    var courtIds = [];
    // console.log(TSArray);
    for (let i = 0; i < TSArray.length; i++) {
      if (TSArray.includes(unAvailable[i])) {
        courtIds.push(i + 1);
      }
    }
    // console.log("SLOT SET 1");
    // console.log("Line 122");
    // console.log(courtIds);
    const closedArr = availibity.closedCourts.map((obj) => {
      return Number(obj);
    });

    const unAvailableTS = Object.keys(availibity.unAvailability).map((obj) => {
      const epochTime = obj;
      const date = new Date(epochTime * 1000);
      const timeString = date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });
      const ampm = date
        .toLocaleTimeString([], { hour: "numeric", hour12: true })
        .split(" ")[1];
      const formattedTime = `${timeString}`;
      return formattedTime;
    });
    // console.log(unAvailableTS);
    // console.log(startTimes);
    for (let i = 0; i < startTimes.length; i++) {
      // console.log(startTimes);
      // console.log(i + 1);
      const closed = closedArr.includes((i + 1).toString());
      var active = true;
      if (unAvailableTS.includes(startTimes[i])) {
        // console.log("isActiveBlock");
        active = false;
      }
      const startTime = startTimes[i];
      const endTime = new Date(
        new Date(`01/01/2000 ${startTime}`).getTime() + 90 * 60000
      ).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      slots.push({
        start: startTime,
        end: endTime,
        closed: closed,
        is_active: active,
        selected: false,
      });
      // console.log("SLOT SET");
      setTimesArr(slots);
      setShowSlots(true);
      // console.log("Show Slots");
      // console.log(showSlots);
    }
    // console.log(timesArr);
    return slots;
  }
  const setActiveHandler = (data) => {
    let temp = timesArr.map((obj) => {
      obj.selected = false;
      return obj;
    });
    // console.log(temp);
    const index = timesArr.indexOf(data);
    let tempObj = data;
    tempObj.selected = !tempObj.selected;
    temp[index] = tempObj;
    setTimesArr(temp);
  };

  const handleSelectedSlots = () => {
    const tempArr = timesArr.filter((obj) => {
      return obj.selected === true;
    });
    setSelectedArr(tempArr);
    // const hrs = (selectedArr.length * 90) / 60;
    // setHours(hrs);
  };

  useEffect(() => {
    // console.log("Calender - Schd");
    // console.log(selDate);
    const momentObj = moment.utc(selDate, "M/D/YYYY");
    const isoString = momentObj.toISOString();
    const formattedString = momentObj.format("YYYY-MM-DDTHH:mm:ssZ");
    setDate(formattedString);
    getData(formattedString);
  }, [selectedDateContext]);

  const [show, setShow] = useState(false);

  function convertMinutesToHHMM() {
    let minutes = businessInfo.location.duration;
    let hours = Math.floor(minutes / 60);
    let mins = minutes % 60;
    hours = hours < 10 ? `0${hours}` : hours;
    mins = mins < 10 ? `0${mins}` : mins;
    return `${hours}:${mins}`;
  }
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
                  <div className='time-schd pb-5'>
                    {showSlots ? (
                      timesArr.map((data) => {
                        if (data.is_active === true) {
                          return (
                            <SlotBox
                              // classes={classes}
                              click={() => setActiveHandler(data)}
                              slot={data}
                              date={selDate}
                              selected={data.selected}
                            ></SlotBox>
                          );
                        } else {
                          return (
                            <div className='gray-sch sch-tab'>
                              <span>
                                {data.start} - {data.end}
                              </span>
                            </div>
                          );
                        }
                      })
                    ) : (
                      <p>Loading Data...</p>
                    )}

                    {/* <div className='gray-sch sch-tab'>
                                <span>09:00 - 10:00</span>
                            </div>
                            <div className='slected-sch sch-tab'>
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
                            <div className='gray-sch sch-tab'>
                                <span>09:00 - 10:00</span>
                            </div> */}
                  </div>
                  {/* ----------Time Schedule div-------- */}

                  {/* ------------Price Div----------- */}
                  <div className='price-div pb-5'>
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
                  </div>
                  {/* ------------Price Div----------- */}

                  <div className='btn-div'>
                    {/* <Link to="/cal-shd"> */}
                    <span
                      onClick={() => {
                        handleSelectedSlots();
                        // console.log(selectedArr);
                        setModalShow(true);
                      }}
                    >
                      <button className='main-btn'>Next</button>
                    </span>
                    {/* UNCOMMENT THIS BLOCK */}
                    <BookAppointment
                      show={modalShow}
                      props={{ date: selDate, slots: selectedArr }}
                      onHide={() => setModalShow(false)}
                    />
                    <div className='mt-2'>
                      {/* <button className='main-btn'> <AppointmentDone/></button> */}
                      <br />
                      {/* <button className='main-btn mt-2'> <AppointmentCancel/></button> */}
                    </div>
                    {/* </Link> */}
                  </div>
                </div>
              </div>
            </div>
            {/* -----------Calander End--------- */}
          </div>
        </div>
      </div>
    );
  } else {
    return <>Loading data</>;
  }
}
