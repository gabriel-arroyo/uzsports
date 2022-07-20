import React, { useContext } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { FormContext } from "../form-paper/form-paper.jsx";

const FileField = (props) => {
  const form = useContext(FormContext);
  const {
    register,
    watch,
    formState: { errors },
  } = form;
  const requiredSign = props.required ? "*" : "";
  const label = (props.label ?? props.name) + requiredSign;
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: 5,
          marginLeft: 10,
          marginRight: 10,
        }}
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
  required: PropTypes.bool,
};
