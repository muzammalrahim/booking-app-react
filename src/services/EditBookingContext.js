import { useState } from "react";
import { createContext } from "react";

export const EditBookingContext = createContext({
  editBooking: {},
  setEditBooking: () => null,
});

export const EditBookingProvider = ({ children }) => {
  const [editBooking, setEditBooking] = useState({});
  const value = { editBooking, setEditBooking };
  return (
    <EditBookingContext.Provider value={value}>
      {children}
    </EditBookingContext.Provider>
  );
};
