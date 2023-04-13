import { Field } from "formik";
import React from "react";
import "./input-field.scss";

const InputField = ({ id, name, placeholder, type }) => {
  return (
    <Field
      id={id}
      name={name}
      placeholder={placeholder}
      type={type}
      className="input-field"
      autoComplete="off"
    />
  );
};

export default InputField;
