import React from "react";
import PropTypes from "prop-types";

const FormRow = (props) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>{props.children}</div>
  );
};

export default FormRow;

FormRow.propTypes = {
  children: PropTypes.any,
};
