import React, { useContext } from "react";
import PropTypes from "prop-types";
import { FormContext } from "../form-paper/form-paper.jsx";
import { FormControlLabel, FormGroup } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { Controller } from "react-hook-form";

const CheckboxField = (props) => {
  const form = useContext(FormContext);
  const { control } = form;

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Controller
            name={props.name}
            control={control}
            render={({ field }) => (
              <Checkbox
                {...field}
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
        }
        label={props.label ?? props.name}
      />
    </FormGroup>
  );
};

export default CheckboxField;

CheckboxField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
};
