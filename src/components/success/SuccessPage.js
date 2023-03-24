import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { BusinessInfoContext } from "../../services/BusinessInfo.context";
import { ModalContext } from "../../services/Modals.Context";
import Header from "../../components/Header";
import HeroImg from "../../components/HeroImg";
import Calander from "../../components/Calander";
import BookingChanged from "../../modals/BookingChanged";
// import { SelectedDateContext } from "../services/SelectedDate.context";
// import { getBusinessInfo } from "../helpers/api";
import { useNavigate } from "react-router";
import AppointmentDone from "../../modals/AppointmentDone";
export default function CalanderView() {
  let navigate = useNavigate();
  const { businessInfo, setBusinessInfo } = useContext(BusinessInfoContext);
  // const { selectedDateContext, setSelectedDateContext } =
  //   useContext(SelectedDateContext);
  const [show, setShow] = useState(true);
  const { modalState, dispatch } = useContext(ModalContext);
  const API_URL = process.env.REACT_APP_PUBLIC_URL;
  const getData = async () => {
    axios
      .post(API_URL + "reservation/getBusinessInfo", {
        businessId: "mAqm6LjvFLUvMOU4pylE5qHcgPH3",
      })
      .then((response) => {
        setBusinessInfo(response.data);
        // console.log(response.data.business.LocationId);
        return response.data;
      })
      .catch((error) => {
        console.log(error.response.status);
        console.log(error.message);
        return error.message;
      });
  };

  const sendOTP = async () => {
    axios
      .post(API_URL + "reservation/sendOTPtoEmail", {
        email: "saqibsdesk@gmail.com", // change email here
        id: localStorage.getItem("reservationId"),
      })
      .then((response) => {
        console.log(response.status);
        return response.data;
      })
      .catch((error) => {
        console.log(error.response.status);
        console.log(error.message);
        return error.message;
      });
  };

  useEffect(() => {
    // console.log(selectedDateContext);
    const payload = localStorage.getItem("payload");
    if (!payload) {
      navigate("/");
    }
    sendOTP();
    getData();
  }, []);

  return (
    <div className='cal-view-main bottom-bg'>
      <Header />
      <HeroImg />
      {/* Business INFO
      {businessInfo?.business?.companyName} */}
      <div className='cal-inner pt-5'>
        <div className='container'>
          <h2>Book now</h2>
          <Calander />
        </div>
        <BookingChanged
          show={modalState.bookingChangedBool}
          onHide={() => dispatch({ type: "hide bookingChanged" })}
        />
        <AppointmentDone
          // show={modalShow}
          show={show}
          onHide={() => {
            localStorage.removeItem("payload");
            localStorage.removeItem("redirect_url");
            localStorage.removeItem("reservationId");
            setShow(false);
          }}
        />
      </div>
    </div>
  );
}
