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
          {data.start} - {data.end}
        </span>
      </div>
    </>
  );
};

export default SlotBox;
