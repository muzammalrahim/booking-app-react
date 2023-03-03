import { useState } from "react";
import { createContext } from "react";

export const SelectedSlotsContext = createContext({
  selectedSlots: [],
  setselectedSlots: () => null,
});

export const SelectedSlotsProvider = ({ children }) => {
  const [selectedSlots, setselectedSlots] = useState({});
  const value = { selectedSlots, setselectedSlots };
  return (
    <SelectedSlotsContext.Provider value={value}>
      {children}
    </SelectedSlotsContext.Provider>
  );
};
