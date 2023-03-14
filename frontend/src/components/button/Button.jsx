import React from 'react'
import PropTypes from 'prop-types';
import "./button.scss";

function Button({type, text, icon, onBtnClick}) {

  return (
    <button className={type} onClick={onBtnClick}>
        <div className='btn-text'>{text}</div>
        {icon
        ? 
        <img className='btn-icon' src={icon}/>
      : <></>}
    </button>
  )
}

Button.propTypes = {
    type: PropTypes.string,
    text: PropTypes.string,
    icon: PropTypes.string,
  }

export default Button