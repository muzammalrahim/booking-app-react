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

export default function CalanderSchd(props) {
  const { businessInfo, setBusinessInfo } = useContext(BusinessInfoContext);
  const { timeSlots, selDate, locationId } = props;
  const { selectedSlots, setselectedSlots } = useContext(SelectedSlotsContext);
  const [hours, setHours] = useState(0);
  const [modalShow, setModalShow] = React.useState(false);
  const [timesArr, setTimesArr] = useState({});
  const [selectedArr, setSelectedArr] = useState({});
  const [date, setDate] = useState();
  const [showText, setShowText] = useState(false);
  const onClick = () => setShowText(true);
  const [active, setActive] = useState(null);
  const [availibity, setAvailibity] = useState();

  const API_URL = process.env.REACT_APP_PUBLIC_URL;
  const getData = async (date) => {
    // console.log(locationId);
    console.log("GET DATA Calender Schd");
    axios
      .post(API_URL + "reservation/getExistingReservationsForDate", {
        locationId: locationId,
        date: date,
      })
      .then((response) => {
        setAvailibity(response.data);
        createSlots(timeSlots);
        // console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error.response.status);
        console.log(error.message);
        return error.message;
      });
  };

  function createSlots(startTimes) {
    const slots = [];
    const closedArr = availibity.closedCourts.map((obj) => {
      return Number(obj);
    });
    for (let i = 0; i < startTimes.length; i++) {
      const closed = closedArr.includes(i + 1);
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
        is_active: true,
        selected: false,
      });
      setTimesArr(slots);
    }

    return slots;
  }
  const setActiveHandler = (data) => {
    let temp = timesArr;
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
    const hrs = (selectedArr.length * 90) / 60;
    setHours(hrs);
  };
  useEffect(() => {
    const momentObj = moment.utc(selDate, "M/D/YYYY");
    const isoString = momentObj.toISOString();
    const formattedString = momentObj.format("YYYY-MM-DDTHH:mm:ssZ");
    setDate(formattedString);
    getData(formattedString);
  }, [selDate]);

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
                    {timesArr.length > 0
                      ? timesArr.map((data) => {
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
                      : null}

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
                        console.log(selectedArr);
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
