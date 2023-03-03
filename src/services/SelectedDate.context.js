import { useState } from "react";
import { createContext } from "react";

export const SelectedDateContext = createContext({
  selectedDateContext: "",
  SelectedDateContext: () => null,
});

export const SelectedDateProvider = ({ children }) => {
  const [selectedDateContext, setSelectedDateContext] = useState({});
  const value = { selectedDateContext, setSelectedDateContext };
  return (
    <SelectedDateContext.Provider value={value}>
      {children}
    </SelectedDateContext.Provider>
  );
};
