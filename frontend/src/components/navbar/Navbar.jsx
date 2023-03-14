import React from 'react'
import PropTypes from 'prop-types';
import BlackNavbar from '../blackNavbar/BlackNavbar';
import WhiteNavbar from '../whiteNavbar/WhiteNavbar';


const Navbar = ({username}) => {
  return (
    <div>
      <BlackNavbar username={username}/>
      <WhiteNavbar username={username}/>
    </div>
  )
}

Navbar.propTypes = {
    imageUrl: PropTypes.string,
  }

export default Navbar 