import React from "react";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <>
      <div>
        <h1>Navbar</h1>
      </div>
      <main>{children}</main>
    </>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
