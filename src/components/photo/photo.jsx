import { Box } from "@mui/material";
import React from "react";
import { PropTypes } from "prop-types";
import { NavLink } from "react-router-dom";

const Photo = ({ src, to, round, lg }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "inherit",
      }}
    >
      <NavLink to={to}>
        <img
          src={src}
          style={{
            width: lg ? "260px" : "160px",
            height: lg ? "260px" : "160px",
            objectFit: "fill",
            margin: "10px",
            borderRadius: round ? "50%" : "0",
          }}
        />
      </NavLink>
    </Box>
  );
};

export default Photo;

Photo.propTypes = {
  src: PropTypes.string,
  to: PropTypes.string,
  round: PropTypes.bool,
  lg: PropTypes.bool,
};

Photo.defaultProps = {
  src: "https://picsum.photos/200",
  to: "/",
  round: false,
  lg: false,
};
