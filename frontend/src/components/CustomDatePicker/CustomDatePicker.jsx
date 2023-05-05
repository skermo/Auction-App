import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "../../resources/icons";
import "./custom-date-picker.scss";

const CustomDatePicker = ({ field, form }) => {
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className="custom-datepicker" onClick={onClick}>
      <div ref={ref} className="date-input item">
        {value}
      </div>
      <CalendarIcon className="calendar-icon item" />
    </div>
  ));

  return (
    <DatePicker
      selected={(field.value && new Date(field.value)) || new Date()}
      onChange={(val) => {
        form.setFieldValue(field.name, val);
      }}
      customInput={<CustomInput />}
      showTimeSelect
      minDate={new Date()}
      minTime={
        new Date().getDate() ===
        new Date(field.value ?? new Date().getTime()).getDate()
          ? new Date()
          : new Date().setHours(0, 0, 0)
      }
      maxTime={new Date().setHours(23, 59, 59)}
    />
  );
};

export default CustomDatePicker;
