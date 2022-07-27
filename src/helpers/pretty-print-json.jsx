import PropTypes from "prop-types";
import React from "react";

const jsonStyle = { fontFamily: "Roboto" };
export const PrettyPrintJson = ({ data }) => (
  <div>
    <pre style={jsonStyle}>{JSON.stringify(data, null, 2)}</pre>
  </div>
);

PrettyPrintJson.propTypes = {
  children: PropTypes.any,
  data: PropTypes.any,
};
