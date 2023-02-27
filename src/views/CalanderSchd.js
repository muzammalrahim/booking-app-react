import React, { useState } from "react";


import BookAppointment from "../modals/BookAppointment"
import AppointmentDone from "../modals/AppointmentDone"
import AppointmentCancel from "../modals/AppointmentCancel"


export default function CalanderSchd() {

const [showText, setShowText] = useState(false);
const onClick = () => setShowText(true);
    
const times = [
  {
    slot_time: "10:00 11:00",
    is_active: false,
  },
  {
    slot_time: "11:00 12:00",
    is_active: false,
  },
  {
    slot_time: "12:00 13:00",
    is_active: false,
  },  
  {
    slot_time: "10:00 11:00",
    is_active: true,
  },
  {
    slot_time: "11:00 12:00",
    is_active: true,
  },
  {
    slot_time: "12:00 13:00",
    is_active: true,
  }   
]

const [show, setShow] = useState(false);

  return (
    <div className='cal-view-main'>
        <div className='cal-inner'>
            <div className='container'>
                {/* -----------Calander Start--------- */}
                <div className='pt-3 pos-area'>
                  <div className='container'>
                      {/* <div className='calendar-container'>
                          <Calendar onChange={setDate} value={date} />
                      </div> */}
                      <div className='bottom-div pt-4'>
                          {/* -----------Time Schedule div---------- */}
                          <div className='time-schd pb-5'>
                            {
                                times.map((data)=>
                            {
                                if (data.is_active === true){

                                    return(

                                        <div className='black-sch sch-tab' onClick={onClick}>
                                            
                                            <span>{data.slot_time}</span>
                                            {showText ? <BookAppointment/> : null}
                                        </div>
                                    )
                                }
                                else
                                {
                                    return(
                                    <div className='gray-sch sch-tab'>
                                        <span>{data.slot_time}</span>
                                    </div>
                                    )
                                }
                            }
                                
                                )
                            }
                            
                            {/* <div className='gray-sch sch-tab'>
                                <span>09:00 - 10:00</span>
                            </div>
                            <div className='slected-sch sch-tab'>
                                <span>09:00 - 10:00</span>
                            </div>
                            <div className='black-sch sch-tab'>
                                <span>09:00 - 10:00</span>
                            </div>
                            <div className='black-sch sch-tab'>
                                <span>09:00 - 10:00</span>
                            </div>
                            <div className='black-sch sch-tab'>
                                <span>09:00 - 10:00</span>
                            </div>
                            <div className='black-sch sch-tab'>
                                <span>09:00 - 10:00</span>
                            </div>
                            <div className='gray-sch sch-tab'>
                                <span>09:00 - 10:00</span>
                            </div> */}
                          </div>
                          {/* ----------Time Schedule div-------- */}

                          {/* ------------Price Div----------- */}
                          <div className='price-div pb-5'>
                              <div>
                                <h2>Price</h2>
                                <span>For 1 hour</span>
                              </div>

                              <div>
                                <h2>€ 220</h2>
                              </div>
                            </div>
                          {/* ------------Price Div----------- */}

                          <div className='btn-div'>
                          
                              {/* <Link to="/cal-shd"> */}
                                  <button className='main-btn'> <BookAppointment/></button>
                                  <div className='mt-2'>
                                    {/* <button className='main-btn'> <AppointmentDone/></button> */}
                                    <br/>
                                    {/* <button className='main-btn mt-2'> <AppointmentCancel/></button> */}
                                    
                                  </div>
                              {/* </Link> */}
                              
                              
                          </div>
                      </div>
                  </div>
                 
              </div>
              {/* -----------Calander End--------- */}
            </div>

            
        </div>
        
    </div>
  )
}

