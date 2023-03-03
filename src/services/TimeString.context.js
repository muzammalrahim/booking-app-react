import { useState } from "react";
import { createContext } from "react";

export const TimeStringContext = createContext({
  timeStringContext: {},
  setTimeStringContext: () => null,
});

export const TimeStringProvider = ({ children }) => {
  const [timeStringContext, setTimeStringContext] = useState({});
  const value = { timeStringContext, setTimeStringContext };
  return (
    <TimeStringContext.Provider value={value}>
      {children}
    </TimeStringContext.Provider>
  );
};
