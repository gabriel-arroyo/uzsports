import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

const FileField = (props) => {
  const {
    register,
    watch,
    formState: { errors },
  } = props.form;
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
            {...register(props.name, { required: props.required })}
            hidden
          />
        </Button>
        <Typography mt={1} variant="body1">
          {watch(props.name, "")[0]?.name}
        </Typography>
        <Typography variant="body1" color={"#D00"} fontSize="0.8rem">
          {errors && !errors[props.name]
            ? ""
            : "Favor de seleccionar un archivo"}
        </Typography>
      </div>
    </>
  );
};

export default FileField;

FileField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  form: PropTypes.object.isRequired,
  required: PropTypes.bool,
};
