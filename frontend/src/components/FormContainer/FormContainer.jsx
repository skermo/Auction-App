import classNames from "classnames";
import React from "react";
import "./form-container.scss";

const FormContainer = ({ children, className }) => {
  return (
    <div className={classNames("form-container", className)}>{children}</div>
  );
};

export default FormContainer;
