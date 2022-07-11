import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

const FileField = (props) => {
  const label = props.label ?? props.name;
  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "column", marginBottom: 5 }}
      >
        <Button variant="contained" component="label" sx={{ mt: 2 }}>
          {label}
          <input
            type="file"
            accept="image/*"
            {...props.register(props.name, { required: props.required })}
            hidden
          />
        </Button>
        <Typography mt={1} variant="body1">
          {props.watch(props.name, "")[0]?.name}
        </Typography>
      </div>
    </>
  );
};

export default FileField;

FileField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object,
  required: PropTypes.bool,
  watch: PropTypes.func.isRequired,
};
