import React from "react";
import "./breadcrumbs.scss";

const Breadcrumbs = ({ text, onClick, className }) => {
  return (
    <span className={className} onClick={onClick}>
      {text}
    </span>
  );
};

export default Breadcrumbs;
