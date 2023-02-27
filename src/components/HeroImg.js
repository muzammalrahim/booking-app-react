import React from 'react'
import EclipseBG from "../assets/images/eclipse-bg.png";

export default function HeroImg() {
  return (
    <div className='header-main pt-3'>
        <div className='container'>
            <div className='hero-img'>
                <h1>Shades</h1>
            </div>
        </div>
        <img className='eclipse-bg' src={EclipseBG} alt="bg-img" />  
    </div>
  )
}
