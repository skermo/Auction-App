import React from 'react'
import PropTypes from 'prop-types';
import './whiteNavbar.scss';
import appLogo from "../../resources/images/appLogo.svg"


const WhiteNavbar = ({username}) => {

  return (
    <div>
      {username
        ? <div className='nav-white'>
            <img src={appLogo} className='logged-app-logo'/>
            <ul className='nav-list'>
              <li>HOME</li>
            </ul>
          </div>
        : <div className='nav-white'>
            <img src={appLogo}/>
          </div>
      }
    </div>
  )
}

WhiteNavbar.propTypes = {
    imageUrl: PropTypes.string,
  }

export default WhiteNavbar 