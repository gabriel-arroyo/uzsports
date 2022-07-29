import { Box } from "@mui/material";
import React from "react";
import { PropTypes } from "prop-types";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";

const Img = styled("img")(({ theme, size }) => ({
  padding: theme.spacing(1),
  [theme.breakpoints.down("md")]: {
    width: size === "large" ? "200px" : "140px",
    heigth: size === "large" ? "200px" : "140px",
  },
  [theme.breakpoints.up("md")]: {
    width: size === "large" ? "200px" : "140px",
    heigth: size === "large" ? "200px" : "140px",
  },
  [theme.breakpoints.up("lg")]: {
    width: size === "large" ? "260px" : "160px",
    heigth: size === "large" ? "260px" : "160px",
  },
}));

const Photo = ({ src, to, round, lg, responsive }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "inherit",
      }}
    >
      <NavLink to={to}>
        <Img
          size={lg ? "large" : "small"}
          src={src}
          style={{
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
  responsive: PropTypes.bool,
};

Photo.defaultProps = {
  src: "https://picsum.photos/200",
  to: "/",
  round: false,
  lg: false,
  responsive: false,
};
