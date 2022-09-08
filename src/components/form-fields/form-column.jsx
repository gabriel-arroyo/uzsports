import React from "react";
import PropTypes from "prop-types";

const FormColumn = (props) => {
  const alignItems = props.center ? "center" : "flex-start";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: alignItems,
        justifyContent: "center",
        width: "100%",
      }}
    >
      {props.children}
    </div>
  );
};

export default FormColumn;

FormColumn.propTypes = {
  children: PropTypes.any,
  center: PropTypes.bool,
};
