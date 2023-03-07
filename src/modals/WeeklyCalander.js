import React, { useEffect, useContext, useState } from "react";

// liberaries
import Calendar from "react-calendar";

export default function WeeklyCalander() {

  const [date, setDate] = useState(new Date())

  return (
    
    <div className='weekly-calander'>
        {/*<Calendar onChange={(val) => setDateHandler(val)} value={date} />
           {show ? (
            <CalanderSchd
              timeSlots={selectedTimeSlot}
              selDate={tempTS}
              locationId={locationId}
            />
          ) : null} */}
          <Calendar onChange={setDate} value={date}/>
       
    </div>
  )
}
