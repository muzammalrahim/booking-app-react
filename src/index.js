import React from "react";
import ReactDOM from "react-dom/client";
import { ModalProvider } from "./services/Modals.Context";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BusinessInfoProvider } from "./services/BusinessInfo.context";
import { SelectedDateProvider } from "./services/SelectedDate.context";
import { SelectedSlotsProvider } from "./services/SelectedSlots.Context";
import { TimeStringProvider } from "./services/TimeString.context";
import { ChangeBookingProvider } from "./services/ChangeBooking.context";
import { EditBookingProvider } from "./services/EditBookingContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BusinessInfoProvider>
      <SelectedDateProvider>
        <SelectedSlotsProvider>
          <TimeStringProvider>
            <ModalProvider>
              <ChangeBookingProvider>
                <EditBookingProvider>
                  <App />
                </EditBookingProvider>
              </ChangeBookingProvider>
            </ModalProvider>
          </TimeStringProvider>
        </SelectedSlotsProvider>
      </SelectedDateProvider>
    </BusinessInfoProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
