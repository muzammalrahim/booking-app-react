import React from 'react'
import { Link} from "react-router-dom";
import Logo from "../assets/images/logo.png";

export default function Header() {
  return (
    <div className='header-main pt-3 pb-2'>
        <div className='container'>
            <div className='header-inner'>
                <div className='row head-row'>
                    <div className='col-md-3 col-sm-3 col-3'>
                        <Link to ="/">
                            <img className='logo' src={Logo} alt="search" />
                        </Link>  
                    </div>
                    <div className='col-md-3 col-sm-3 col-6'>
                        <h3>Shades</h3>
                    </div>
                </div>
                
                
            </div>
        </div>
    </div>
  )
}
