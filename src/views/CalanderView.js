import React from 'react'
import { useState } from 'react';

import Header from "../components/Header"
import HeroImg from "../components/HeroImg"
import Calander from "../components/Calander"

export default function CalanderView() {
  // const [show, setShow] = useState(false);

  return (
    <div className='cal-view-main bottom-bg'>
        <Header/>
        <HeroImg/>
        <div className='cal-inner pt-5'>
            <div className='container'>
                <h2>Book now</h2>
                <Calander/>
            </div>
        </div>
        
    </div>
  )
}
