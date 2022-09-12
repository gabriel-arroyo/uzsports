import React, { useRef, useContext } from "react";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import { FormContext } from "../form-paper/form-paper.jsx";

const Field = (props) => {
  const form = useContext(FormContext);
  const {
    register,
    watch,
    formState: { errors },
  } = form;
  const requiredSign = props.required ? "*" : "";
  const password = useRef({});
  const label = (props.label ?? props.name) + requiredSign;
  const isEmail = props.type === "email" || props.name === "email";
  const isPhone = props.type === "phone" || props.name === "phone";
  const isPassword = props.type === "password" || props.name === "password";
  const isPasswordConfirm =
    props.type === "passwordConfirm" || props.name === "passwordConfirm";
  password.current = isPasswordConfirm ? watch("password", "") : "";
  const validatePassword = isPasswordConfirm
    ? {
        validate: (value) =>
          value === password.current || "Las contraseñas no coinciden",
      }
    : {};
  const emailPattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const phonePattern = /^\d{10}$/;
  const length = isPassword
    ? { minLength: { value: 8, message: "Mínimo 8 caracteres" } }
    : {};

  const pattern = isEmail ? emailPattern : isPhone ? phonePattern : null;
  return (
    <TextField
      sx={{ width: "20rem" }}
      value={props.value}
      disabled={props.disabled}
      variant={
        props.standard ? "standard" : props.filled ? "filled" : "outlined"
      }
      type={
        !(isPassword || isPasswordConfirm) ? props.type ?? "text" : "password"
      }
      error={errors && errors[props.name] ? true : false}
      label={label}
      helperText={
        errors && !errors[props.name]
          ? ""
          : isEmail || isPhone
          ? "Dato inválido"
          : isPassword
          ? errors[props.name]?.message ?? "Favor de ingresar un valor válido"
          : "Favor de llenar este campo"
      }
      {...register(props.name, {
        required: props.required,
        pattern: pattern,
        ...length,
        ...validatePassword,
      })}
    />
  );
};

export default Field;

Field.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  filled: PropTypes.bool,
  standard: PropTypes.bool,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  shrink: PropTypes.bool,
};

Field.defaultProps = {
  required: false,
  type: "text",
  filled: false,
  standard: false,
  disabled: false,
};
