import React from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";

const DateField = (props) => {
  const [value, setValue] = React.useState("");

  const handleChange = (newValue) => {
    console.log(newValue);
    setValue(newValue);
  };
  const label = props.label ?? props.name;
  return (
    <DesktopDatePicker
      label={label}
      error={props.errors && props.errors[props.name] ? true : false}
      inputFormat="dd/MM/yyyy"
      value={value}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          helperText={
            props.errors && !props.errors[props.name]
              ? ""
              : "Favor de seleccionar una fecha"
          }
          {...props.register(props.name, { required: props.required })}
        />
      )}
    />
  );
};

export default DateField;

DateField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object,
  required: PropTypes.bool,
};
