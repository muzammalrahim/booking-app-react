import React from 'react'
import Time from '../components/Time'
import CalanderSchd from "../views/CalanderSchd"

import { useState } from 'react';
import Calendar from 'react-calendar';
import { Link} from "react-router-dom";



import EclipseBG from "../assets/images/eclipse-bottom.png";
import Header from './Header';

export default function Calander() {

   
  
    const [date, setDate] = useState(new Date());

    const [show, setShow] = useState(false);
    // const onClick = () => setShow(!show);
    const onClick = () => setShow((prevState) => !show && !prevState);

  return (
    <div className='pt-3 pos-area'>
        <div className='container'>
            <div className='calendar-container'>
                <Calendar onChange={onClick} value={date} />
                {show ? <CalanderSchd/> : null } 
                <div className='test2'>
                {/* <div className='time-schd pb-5'>
                            <div className='gray-sch sch-tab'>
                                <span>09:00 - 10:00</span>
                            </div>
                            <div className='gray-sch sch-tab'>
                                <span>09:00 - 10:00</span>
                            </div>
                            <div className='gray-sch sch-tab'>
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
                            </div>
                          </div> */}
                </div>
                
            </div>
            
            <p className='text-center'>
                <span className='bold'>Selected Date:</span>{' '}
                {date.toString()}
            </p>
            
            <div className='bottom-div pt-4'>
                <h2>Your plans changed?</h2>
                <p className='bot-para'>
                    If you need to make changes to your appointment or you want to cancel it please press the button below
                </p>
                
                <div className='btn-div'>
                    <Link to="/cal-shd">
                        <button className='main-btn'>Change booking</button>
                    </Link>
                    
                </div>
            </div>
        </div>
        {/* <img className='cal-bottom-bg' src={EclipseBG} alt="bg-img" />   */}
    </div>
    
  )
}

