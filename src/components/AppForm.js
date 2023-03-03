import React, { useContext, useState } from "react";
import { BusinessInfoContext } from "../services/BusinessInfo.context";
import { SelectedDateContext } from "../services/SelectedDate.context";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import moment from "moment";
import { TimeStringContext } from "../services/TimeString.context";
import axios from "axios";
export default function AppForm() {
  const { timeStringContext, setTimeStringContext } =
    useContext(TimeStringContext);
  const [payloadDate, setPayloadDate] = useState();
  const { selectedDateContext, setSelectedDateContext } =
    useContext(SelectedDateContext);
  var startSecVar = "";
  var endSecVar = "";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const { businessInfo, setBusinessInfo } = useContext(BusinessInfoContext);
  const initialDate = selectedDateContext;
  const formattedDate = moment(initialDate).format("M/D/YYYY");
  const momentObj = moment.utc(formattedDate, "M/D/YYYY");
  const isoString = momentObj.toISOString();
  var formattedString = momentObj.format("YYYY-MM-DDTHH:mm:ssZ");
  const [startSec, setStartSec] = useState();
  const [endSec, setEndSec] = useState();
  // setPayloadDate(formattedDate);
  // console.log(formattedString); // Output: "2023-03-16T00:00:00+05:00"
  const timeString = "12:30:00 AM";
  const time = moment(timeString, "hh:mm:ss A");
  const seconds = time.seconds() + time.minutes() * 60 + time.hours() * 3600;

  const setTimetoEpoch = () => {
    console.log("EPOCH");
    console.log(timeStringContext);
    const startTimeString = timeStringContext.start;
    const startTime = moment(startTimeString, "hh:mm:ss A");
    const startEpoch =
      startTime.seconds() + startTime.minutes() * 60 + startTime.hours() * 3600;
    setStartSec(startEpoch);
    startSecVar = startEpoch;
    const endTimeString = timeStringContext.end;
    const endTime = moment(endTimeString, "hh:mm:ss A");
    const endEpoch =
      endTime.seconds() + endTime.minutes() * 60 + endTime.hours() * 3600;
    setEndSec(endEpoch);
    endSecVar = endEpoch;

    console.log("Start Epoch" + startEpoch + "End Epoch: " + endEpoch);
  };

  const API_URL = process.env.REACT_APP_PUBLIC_URL;
  const bookReservation = async (payload) => {
    axios
      .post(API_URL + "reservation/bookReservation", { ...payload })
      .then((response) => {
        // setBusinessInfo(response.data);
        // console.log(response.data.business.LocationId);
        window.location.href = response.data.redirect_url;
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error.response.status);
        console.log(error.message);
        return error.message;
      });
  };

  // console.log(seconds);
  // console.log(formattedString);
  const handleBooking = (e) => {
    e.preventDefault();
    console.log(timeStringContext);
    setTimetoEpoch();
    var payload = {
      businessId: "mAqm6LjvFLUvMOU4pylE5qHcgPH3", // Hard Coded for Now
      locationId: businessInfo.business.LocationId,
      courtId: 1,

      date: formattedString,
      startTime: startSecVar,
      endTime: endSecVar,
      duration: businessInfo.location.duration,
      paymentAmount: businessInfo.location.rent,
      paymentCurrency: businessInfo.business.currency,
      businessName: businessInfo.business.companyName,
      businessLocation: businessInfo.business.location,
      customerName: firstName + " " + lastName,
      customerEmail: email,
      successUrl: "https://pay.expresspay.sa/",
      failUrl: "https://pay.expresspay.sa/",
    };
    bookReservation(payload);
    console.log(payload);
  };

  return (
    <Form onSubmit={handleBooking} className='form-main'>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <div className='form-inline-div'>
          <div>
            <Form.Label className='label-dark'>First name</Form.Label>
            <Form.Control
              type='text'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder='Enter first name'
            />
          </div>
          <div>
            <Form.Label className='label-dark'>Last name</Form.Label>
            <Form.Control
              type='text'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder='Enter last name'
            />
          </div>
        </div>
      </Form.Group>

      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <div className='form-inline-div'>
          <div>
            <Form.Label className='label-dark'>Email</Form.Label>
            <Form.Control
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter email'
            />
          </div>
          <div>
            <Form.Label className='label-dark'>Phone</Form.Label>
            <Form.Control type='email' placeholder='Enter phone number' />
          </div>
        </div>
      </Form.Group>

      {/* <div>
        <p className='modal-para'>
            Card details
            <span className='staric'>*</span>
        </p>
      </div>

      <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
        <Form.Label className='label-light'>Card holder name</Form.Label>
                <Form.Control type="email" placeholder="Jogh Smith" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className='label-light'>Credit card number</Form.Label>
                <Form.Control type="email" placeholder="0000 0000 0000 0000" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <div className='form-inline-div'>
            <div>
                <Form.Label className='label-light'>Expiration date</Form.Label>
                <Form.Control type="email" placeholder="MM/YY" />
            </div>
            <div>
                <Form.Label className='label-light'>CVC</Form.Label>
                <Form.Control type="email" placeholder="000" />
            </div>
        </div>
      </Form.Group>

      <Form.Group className="mb-4 mt-3" controlId="formBasicEmail">
            <Form.Label className='label-light'>Promo code</Form.Label>
            <Form.Control type="email" placeholder="Enter your Promo code" />
      </Form.Group>

    */}
      <div className='mt-4'>
        <button className='main-btn' type='submit'>
          Book appointment
        </button>
        <button className='outline-btn mt-2'>Cancel</button>
      </div>
    </Form>
  );
}
