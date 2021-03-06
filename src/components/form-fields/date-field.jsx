import React, { useContext } from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import { FormContext } from "../form-paper/form-paper.jsx";

const DateField = (props) => {
  const form = useContext(FormContext);
  const {
    register,
    formState: { errors },
  } = form;
  const [value, setValue] = React.useState("");

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const requiredSign = props.required ? "*" : "";
  const label = (props.label ?? props.name) + requiredSign;
  return (
    <DesktopDatePicker
      label={label}
      error={errors && errors[props.name] ? true : false}
      inputFormat="dd/MM/yyyy"
      value={value}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          helperText={
            errors && !errors[props.name]
              ? ""
              : "Favor de seleccionar una fecha"
          }
          {...register(props.name, { required: props.required })}
        />
      )}
    />
  );
};

export default DateField;

DateField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
};
