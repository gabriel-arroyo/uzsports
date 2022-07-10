import React from "react";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";

const Field = (props) => {
  return (
    <TextField
      type={props.type ?? "text"}
      error={props.errors[props.name] ? true : false}
      label={props.label ?? props.name}
      helperText={!props.errors[props.name] ? "" : "Favor de llenar este campo"}
      {...props.register(props.name, { required: props.required })}
    />
  );
};

export default Field;

Field.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  required: PropTypes.bool,
  type: PropTypes.string,
};
