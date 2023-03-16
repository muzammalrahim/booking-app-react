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
  const { selDate, locationId } = props;
  console.log(selDate);
  const [showSlots, setShowSlots] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [selectedArr, setSelectedArr] = useState({});

  const { businessInfo, setBusinessInfo } = useContext(BusinessInfoContext);
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
    console.log(timeSlots);
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
    const unAvailableVar = unAvailable.map((val) => {
      if (val > 0) {
        return val - 86400;
      } else return Number(val);
    });
    console.log(unAvailableVar);
    console.log(slotsOfDay);
    var tempTimesArr = [];
    for (let i = 0; i < slotsOfDay.length; i++) {
      const timestamp = slotsOfDay[i];
      const startDate = new Date(timestamp * 1000); // Convert timestamp to milliseconds
      const endDate = new Date((timestamp + 5400) * 1000); // Add 90 minutes (5400 seconds) to the start time
      const startTime = startDate.toISOString().substr(11, 5); // Extract start time in format "HH:mm"
      const endTime = endDate.toISOString().substr(11, 5); // Extract end time in format "HH:mm"
      var is_active = true;
      var selected = false;

      if (unAvailableVar.includes(timestamp)) {
        console.log("IF TRUE");
        is_active = false;
      }
      tempTimesArr.push({
        start: startTime,
        end: endTime,
        selected: selected,
        is_active: is_active,
      });
    }
    setTimeObjects(tempTimesArr);
    setShowSlots(true);
  };
  function convertMinutesToHHMM() {
    let minutes = businessInfo.location.duration;
    let hours = Math.floor(minutes / 60);
    let mins = minutes % 60;
    hours = hours < 10 ? `0${hours}` : hours;
    mins = mins < 10 ? `0${mins}` : mins;
    return `${hours}:${mins}`;
  }
  const handleSelectedSlots = () => {
    const tempArr = timeObjects.filter((obj) => {
      return obj.selected === true;
    });
    setSelectedArr(tempArr);
  };

  useEffect(() => {
    setShowSlots(false);
    getData(selDate);
  }, [selDate]);

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
                      timeObjects?.map((data) => {
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
                                {data?.start} - {data?.end}
                              </span>
                            </div>
                          );
                        }
                      })
                    ) : (
                      <p>Loading Data...</p>
                    )}
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
