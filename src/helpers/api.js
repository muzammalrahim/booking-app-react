import React, { useEffect, useState } from "react";
import axios from "axios";

export const useGetApi = (url, headers) => {
  const API_URL = process.env.REACT_APP_PUBLIC_URL;

  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /////////// Making Headers ////////////
  const makeHeaders = () => {
    if (headers) {
      return { headers: { ...headers } };
    }
    return {};
  };
  ///////////////////////////////

  const fetchData = async (url, headers, payload) => {
    console.log(url, payload);
    try {
      setIsLoading(true);
      const { status, data } = await axios.post(
        "https://us-central1-shadebusiness-c91d3.cloudfunctions.net/payment/" +
          url,
        {
          ...makeHeaders(),
          ...payload,
        }
      );
      if (status === 200) {
        console.log("Success");
        setData(data);
        setError("");
        setIsLoading(false);
      }
    } catch (e) {
      console.log("Failed");
      setData([]);
      setError(e.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(url, headers);
  }, [url]);

  const getDataWithPayload = async (payload) => {
    fetchData(url, headers, payload);
  };

  /////////////////// Returning Data, Error, Loading State
  return { data, error, isLoading, getDataWithPayload };
};

export default useGetApi;
