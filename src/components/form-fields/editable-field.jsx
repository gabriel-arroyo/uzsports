import React from "react";
import EditButton from "./edit-button";
import Field from "./field";
import FormRow from "./form-row";
import PropTypes from "prop-types";

const EditableField = ({ edit, name, label, value, type, handleSubmit }) => {
  return (
    <FormRow>
      <Field
        standard
        disabled={
          name === "passwordConfirm" ? edit !== "password" : edit !== name
        }
        name={name}
        label={label}
        required={true}
        value={name === "passwordConfirm" ? "" : value[name]}
        type={type}
      />
      {name !== "passwordConfirm" && (
        <EditButton handleSubmit={handleSubmit} edit={edit} name={name} />
      )}
    </FormRow>
  );
};

export default EditableField;

EditableField.propTypes = {
  edit: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
  type: PropTypes.string,
  handleSubmit: PropTypes.func,
};

EditableField.defaultProps = {
  type: "text",
};
