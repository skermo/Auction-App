import React from 'react'
import PropTypes from 'prop-types';
import './iconButton.scss';

const IconButton = ({imageUrl, websiteUrl}) => {

  return (
    <a href={websiteUrl}>
        <img className='iconBtn' src={imageUrl}/>
    </a>
  )
}

IconButton.propTypes = {
    imageUrl: PropTypes.string,
  }

export default IconButton 