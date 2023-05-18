import classNames from "classnames/bind";
import PropTypes from "prop-types";
import React from "react";
import "./button.scss";

const Button = ({ type, text, Icon, onClick, className, model, disabled }) => {
  return (
    <button
      className={classNames("btn", `btn-${type}`, className)}
      onClick={onClick}
      type={model}
      disabled={disabled}
    >
      <div className="btn-text">{text}</div>
      {Icon && <Icon className="btn-icon" />}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
};

export default Button;
