import React from "react";
import Select from "react-select";

const CustomSelect = ({
  field,
  options,
  placeholder,
  form,
  styles,
  sendDataToForm = () => {},
}) => {
  return (
    <Select
      options={options}
      name={field.name}
      placeholder={placeholder}
      value={
        Array.isArray(options) && options
          ? options.find((option) => option.value === field.value)
          : ""
      }
      onChange={(option) => {
        form.setFieldValue(field.name, option.value);
        sendDataToForm(option.value);
      }}
      styles={styles}
      components={{
        IndicatorSeparator: () => null,
      }}
    />
  );
};

export default CustomSelect;
