import React from "react";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";

const Field = (props) => {
  const label = props.label ?? props.name;
  return (
    <TextField
      type={props.type ?? "text"}
      error={props.errors && props.errors[props.name] ? true : false}
      label={label}
      helperText={
        props.errors && !props.errors[props.name]
          ? ""
          : "Favor de llenar este campo"
      }
      {...props.register(props.name, { required: props.required })}
    />
  );
};

export default Field;

Field.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object,
  required: PropTypes.bool,
  type: PropTypes.string,
};
