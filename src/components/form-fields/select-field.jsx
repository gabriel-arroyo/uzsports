import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import { FormContext } from "../form-paper/form-paper.jsx";

const SelectField = (props) => {
  const form = useContext(FormContext);
  const {
    register,
    watch,
    formState: { errors },
  } = form;
  const label = props.label ?? props.name;
  let options = props.options;
  if (!props.options[0]?.hasOwnProperty("value")) {
    options = props.options.map((o) => ({ value: o, label: o }));
  }
  return (
    <TextField
      select
      error={errors[props.name] ? true : false}
      label={label}
      value={watch(props.name)}
      helperText={!errors[props.name] ? "" : "Favor de llenar este campo"}
      {...register(props.name, { required: props.required })}
    >
      <MenuItem value={props.default}>Selecciona tu {label}</MenuItem>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectField;

SelectField.propTypes = {
  children: PropTypes.any,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  options: PropTypes.array.isRequired,
  default: PropTypes.any.isRequired,
};
