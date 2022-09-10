import React from "react";
import { Button } from "@mui/material";
import PropTypes from "prop-types";

const EditButton = ({ edit, name, handleSubmit }) => {
  return (
    <Button
      disabled={edit !== "none" && edit !== name}
      variant={edit !== name ? "text" : "contained"}
      onClick={() => handleSubmit(name)}
    >
      {edit !== name ? "Editar" : "Guardar"}
    </Button>
  );
};

export default EditButton;

EditButton.propTypes = {
  edit: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func,
};
