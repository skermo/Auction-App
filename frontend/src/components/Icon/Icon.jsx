import PropTypes from "prop-types";
import React from "react";
import "./icon.scss";

const Icon = ({ Icon, url }) => {
  return (
    <a href={url}>
      <Icon className="iconBtn" />
    </a>
  );
};

Icon.propTypes = {
  url: PropTypes.string,
};

export default Icon;
