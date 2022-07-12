import React from "react";
import PropTypes from "prop-types";

const FormFooter = (props) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {props.children}
    </div>
  );
};

export default FormFooter;

FormFooter.propTypes = {
  children: PropTypes.any,
};
