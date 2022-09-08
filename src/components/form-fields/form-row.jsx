import React from "react";
import PropTypes from "prop-types";

const FormRow = (props) => {
  const justifyContent = props.center ? "center" : "flex-start";
  const wrap = props.wrap ? "wrap" : "nowrap";
  return (
    <div
      style={{
        display: "flex",
        flexWrap: wrap,
        alignItems: "center",
        justifyContent: justifyContent,
        width: "100%",
      }}
    >
      {props.children}
    </div>
  );
};

export default FormRow;

FormRow.propTypes = {
  children: PropTypes.any,
  center: PropTypes.bool,
  wrap: PropTypes.bool,
};

FormRow.defaultProps = {
  center: false,
  wrap: true,
};
