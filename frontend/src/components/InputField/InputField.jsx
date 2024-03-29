import classNames from "classnames";
import { Field } from "formik";
import React from "react";
import "./input-field.scss";

const InputField = ({
  id,
  name,
  placeholder,
  type,
  autoComplete,
  className,
}) => {
  return (
    <Field
      id={id}
      name={name}
      placeholder={placeholder}
      type={type}
      className={classNames("input-field", className)}
      autoComplete={autoComplete}
    />
  );
};

export default InputField;
