import React from "react";
import Dropdown from "../navbar/dropdown.jsx";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

const HomeDrop = ({ menu, bgcolor, color, right }) => {
  const newMenu = menu.map((element, key) => {
    if (key === 0) {
      return {
        label: right ? "▼ " + element.label : element.label + " ▼",
        link: element.link,
        submenu: element.submenu,
      };
    } else {
      return {
        label: element.label,
        link: element.link,
        submenu: element.submenu,
      };
    }
  });
  return (
    <Box
      sx={{
        bgcolor: bgcolor,
        color: color,
        borderRadius: 20,
        minWidth: "200px",
        maxWidth: "300px",
        height: "40px",
      }}
    >
      <Dropdown menu={newMenu} color={color} bgcolor={bgcolor} />
    </Box>
  );
};

export default HomeDrop;

HomeDrop.propTypes = {
  menu: PropTypes.array.isRequired,
  bgcolor: PropTypes.string,
  color: PropTypes.string,
  right: PropTypes.bool,
};

HomeDrop.defaultProps = {
  bgcolor: "#ddd",
  color: "#000",
  right: false,
};
