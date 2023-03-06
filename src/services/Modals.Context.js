import { useState } from "react";
import { createContext } from "react";
import { useReducer } from "react";
const initialState = {
  confirmCodeBool: false,
  confirmChoicesBool: false,
  editBookingBool: false,
  bookingChangedBool: false,
  confirmCancelledBool: false,
  bookingNotCancelledBool: false,
};

const reducer = (modalState, { type, payload }) => {
  if (type === "check reducer") {
    console.log("reducer");
    return modalState;
  }
  if (type === "show confirmCode") {
    return {
      ...modalState,
      confirmCodeBool: true,
    };
  } else if (type === "hide confirmCode") {
    return {
      ...modalState,
      confirmCodeBool: false,
    };
  } else if (type === "show confirmChoices") {
    return {
      ...modalState,
      confirmChoicesBool: true,
    };
  } else if (type === "hide confirmChoices") {
    return {
      ...modalState,
      confirmChoicesBool: false,
    };
  } else if (type === "show editBooking") {
    return {
      ...modalState,
      editBookingBool: true,
    };
  } else if (type === "hide editBooking") {
    return {
      ...modalState,
      editBookingBool: false,
    };
  } else if (type === "show bookingChanged") {
    return {
      ...modalState,
      bookingChangedBool: true,
    };
  } else if (type === "hide bookingChanged") {
    return {
      ...modalState,
      bookingChangedBool: false,
    };
  } else if (type === "show confirmCancelled") {
    return {
      ...modalState,
      confirmCancelledBool: true,
    };
  } else if (type === "hide confirmCancelled") {
    return {
      ...modalState,
      confirmCancelledBool: false,
    };
  } else if (type === "show bookingNotCancelled") {
    return {
      ...modalState,
      bookingNotCancelledBool: true,
    };
  } else if (type === "hide bookingNotCancelled") {
    return {
      ...modalState,
      bookingNotCancelledBool: false,
    };
  }
};
export const ModalContext = createContext({ initialState });
export const ModalProvider = ({ children }) => {
  const [modalState, dispatch] = useReducer(reducer, initialState);
  const value = { modalState, dispatch };
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
