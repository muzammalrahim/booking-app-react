import { useState } from "react";
import { createContext } from "react";

export const BusinessInfoContext = createContext({
  businessInfo: {},
  setBusinessInfo: () => null,
});

export const BusinessInfoProvider = ({ children }) => {
  const [businessInfo, setBusinessInfo] = useState({});
  const [testSlots, settestSlots] = useState({});
  const value = { businessInfo, setBusinessInfo, testSlots, settestSlots };
  return (
    <BusinessInfoContext.Provider value={value}>
      {children}
    </BusinessInfoContext.Provider>
  );
};
