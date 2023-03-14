import React from 'react'
import PropTypes from 'prop-types';
import './blackNavbar.scss';
import IconButton from '../iconButton/IconButton';
import fbIcon from "../../resources/images/fbIcon.svg";
import igIcon from "../../resources/images/igIcon.svg";
import twIcon from "../../resources/images/twIcon.svg";


const BlackNavbar = ({username}) => {

  return (
    <div>
      <div className='nav-black'>
        <div className='icons'>
          <IconButton imageUrl={fbIcon} websiteUrl={"https://www.facebook.com/"}/>
          <IconButton imageUrl={igIcon} websiteUrl={"https://www.instagram.com/"}/>
          <IconButton imageUrl={twIcon} websiteUrl={"https://www.twitter.com/"}/>
        </div>
         <div className='welcome-text'>Hi, {username}</div>
      </div>
    </div>
  )
}

BlackNavbar.propTypes = {
    imageUrl: PropTypes.string,
  }

export default BlackNavbar 