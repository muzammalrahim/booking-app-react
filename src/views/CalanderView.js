import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { BusinessInfoContext } from "../services/BusinessInfo.context";
import Header from "../components/Header";
import HeroImg from "../components/HeroImg";
import Calander from "../components/Calander";
import { SelectedDateContext } from "../services/SelectedDate.context";
import { getBusinessInfo } from "../helpers/api";

export default function CalanderView() {
  const { businessInfo, setBusinessInfo } = useContext(BusinessInfoContext);
  // const { selectedDateContext, setSelectedDateContext } =
  //   useContext(SelectedDateContext);
  const [data, setData] = useState({});
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

  useEffect(() => {
    // console.log(selectedDateContext);
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
      </div>
    </div>
  );
}
