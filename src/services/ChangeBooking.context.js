import { useState } from "react";
import { createContext } from "react";

export const ChangeBookingContext = createContext({
  changeBooking: {},
  setChangeBooking: () => null,
  changedBooking: {},
  setChangedBooking: () => null,
});

export const ChangeBookingProvider = ({ children }) => {
  const [changeBooking, setChangeBooking] = useState({});
  const [changedBooking, setChangedBooking] = useState({});
  const value = {
    changeBooking,
    setChangeBooking,
    changedBooking,
    setChangedBooking,
  };
  return (
    <ChangeBookingContext.Provider value={value}>
      {children}
    </ChangeBookingContext.Provider>
  );
};
