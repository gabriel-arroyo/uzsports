import React, { useContext } from "react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import { FormContext } from "../form-paper/form-paper.jsx";

const TimeField = (props) => {
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
    <TimePicker
      label={label}
      error={errors && errors[props.name] ? true : false}
      value={value}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          helperText={
            errors && !errors[props.name] ? "" : "Favor de seleccionar una hora"
          }
          {...register(props.name, { required: props.required })}
        />
      )}
    />
  );
};

export default TimeField;

TimeField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
};
