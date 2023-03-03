import { useState } from "react";
import { createContext } from "react";

export const BusinessInfoContext = createContext({
  businessInfo: {},
  setBusinessInfo: () => null,
});

export const BusinessInfoProvider = ({ children }) => {
  const [businessInfo, setBusinessInfo] = useState({});
  const value = { businessInfo, setBusinessInfo };
  return (
    <BusinessInfoContext.Provider value={value}>
      {children}
    </BusinessInfoContext.Provider>
  );
};
