import React from "react";
import "./checkbox.scss";

const Checkbox = ({ name, value, onChange, checked, className }) => {
  return (
    <input
      type="checkbox"
      name={name}
      onChange={onChange}
      value={value}
      className="proba"
      checked={checked}
    />
  );
};

export default Checkbox;
