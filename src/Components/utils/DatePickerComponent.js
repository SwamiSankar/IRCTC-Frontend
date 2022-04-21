import React from 'react';
import DatePicker from 'react-datepicker';
import { useFormikContext, useField } from 'formik';
import 'react-datepicker/dist/react-datepicker.css';

Date.prototype.addDays = function (days) {
  this.setDate(this.getDate() + days);
  return this;
};

const DatePickerComponent = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  return (
    <DatePicker
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
      minDate={new Date()}
      maxDate={new Date().addDays(30)}
      dateFormat="dd-MM-yyyy"
    />
  );
};

export default DatePickerComponent;
