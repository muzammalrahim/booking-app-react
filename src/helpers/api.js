// // import axios from "../config/axiosConfig";
// import axios from "axios";
// import { useContext } from "react";
// import { BusinessInfoContext } from "../services/BusinessInfo.context";

// const API_URL = process.env.REACT_APP_PUBLIC_URL;

// export async function getBusinessInfo(endpoint, data) {
//   //   const { businessInfo, setBusinessInfo } = useContext(BusinessInfoContext);
//   axios
//     .post(API_URL + endpoint, data)
//     .then((response) => {
//       //   console.log(response.data);
//       //   setBusinessInfo(response.data);
//       return response.data;
//     })
//     .catch((error) => {
//       //   if (error.response) {
//       //     //response status is an error code
//       //     console.log(error.response.status);
//       //   } else if (error.request) {
//       //     //response not received though the request was sent
//       //     console.log(error.request);
//       //   } else {
//       //     //an error occurred when setting up the request
//       //     console.log(error.message);
//       //     return error.message;
//       //   }
//       console.log(error.response.status);
//       //   console.log(error.request);
//       console.log(error.message);
//       return error.message;
//     });
// }
