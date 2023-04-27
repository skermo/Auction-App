import React from "react";
import "./text-area.scss";

const TextArea = ({ id, name, field }) => {
  return (
    <textarea
      className="text-area"
      id={id}
      name={name}
      value={field.value}
      onChange={field.onChange}
    />
  );
};

export default TextArea;
