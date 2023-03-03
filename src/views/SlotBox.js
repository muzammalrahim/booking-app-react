import { useEffect, useState } from "react";
import React from "react";
// import { forwardRef } from "react";
import { useContext } from "react";
// import { SelectedDateContext } from "../services/SelectedDate.context";
import { SelectedDateContext } from "../services/SelectedDate.context";
import { SelectedSlotsContext } from "../services/SelectedSlots.Context";

const SlotBox = (props) => {
  const { selectedDateContext, setSelectedDateContext } =
    useContext(SelectedDateContext);
  const { selectedSlots, setselectedSlots } = useContext(SelectedSlotsContext);
  // const [selectedDateContext] = useContext(SelectedDateContext);
  const { click, slot: data, selected, selDate: date } = props;
  const startTime = data.start;
  const startDate = new Date("2000-01-01 " + startTime); // Use an arbitrary date to create the Date object
  const startTimeString = startDate.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  }); // Convert to 24-hour format

  const endTime = data.end;
  const endDate = new Date("2000-01-01 " + endTime); // Use an arbitrary date to create the Date object
  const endTimeString = endDate.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  }); // Convert to 24-hour format

  // console.log(formattedTime); // Output: "20:00:00"
  const [state, setState] = useState(false);
  const handleClick = (data) => {
    setState(!state);
    click(data);
  };

  useEffect(() => {
    setState(false);
    console.log("SLOTBOX CLG");
  }, [selectedDateContext]);
  return (
    <>
      <div
        onClick={() => handleClick(data)}
        className={state ? "slected-sch sch-tab" : "black-sch sch-tab"}
      >
        <span
        // className={`list-item ${
        //   active == data && "active"
        // }`}
        >
          {startTimeString} - {endTimeString}
        </span>
      </div>
    </>
  );
};

export default SlotBox;
