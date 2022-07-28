import { Box, Popper, Grow } from "@mui/material";
import React, { useId, useState, useEffect } from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

const Dropdown = ({ menu, color, bgcolor, mainMenu }) => {
  const mediaMatch = window.matchMedia("(min-width: 768px)");
  const [matches, setMatches] = useState(mediaMatch.matches);
  useEffect(() => {
    const handler = (e) => setMatches(e.matches);
    mediaMatch.addEventListener("change", handler);
    return () => mediaMatch.removeEventListener("cahgen", handler);
  });

  const styles = {
    navmenu: (matches) => ({
      flexGrow: 1,
      alignItems: "center",
      justifyContent: "center",
      display: !matches && mainMenu ? "none" : "flex",
    }),
  };

  return (
    <div style={styles.navmenu(matches)}>
      {menu.map((element, key) => (
        <React.Fragment key={uuidv4()}>
          <Menu
            key={uuidv4()}
            label={element.label}
            link={element.link}
            submenu={element.submenu}
            color={color}
            bgcolor={bgcolor}
          />
          {menu.length > key + 1 && (
            <p key={uuidv4()} style={{ color: "#8bc53d" }}>
              •
            </p>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Dropdown;

Dropdown.propTypes = {
  menu: PropTypes.array.isRequired,
  bgcolor: PropTypes.string,
  color: PropTypes.string,
  mainMenu: PropTypes.bool,
};

Dropdown.defaultProps = {
  mainMenu: false,
};

const Menu = ({ label, submenu, level, link, color, bgcolor }) => {
  const buttonId = useId();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleEnterLevel2 = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseLevel2 = () => {
    setAnchorEl(null);
  };

  const openLevel2 = Boolean(anchorEl);
  const idpopper = openLevel2 ? "simple-popper" : undefined;

  return (
    <>
      {link ? (
        <NavLink to={link} className="navlink">
          <div>{label}</div>
        </NavLink>
      ) : (
        <div
          id={buttonId}
          className="navlink"
          onMouseEnter={handleEnterLevel2}
          onMouseLeave={handleCloseLevel2}
          style={{ color: color, backgroundColor: bgcolor }}
        >
          {label}
          <Popper
            id={idpopper}
            open={openLevel2}
            anchorEl={anchorEl}
            placement={!level ? "bottom" : "right-start"}
          >
            <Grow in={openLevel2}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  backgroundColor: "#eee",
                  padding: "8px",
                }}
              >
                {submenu &&
                  submenu.map((element, key) => (
                    <Menu
                      label={element.label}
                      submenu={element.submenu}
                      key={uuidv4()}
                      level={level + 1}
                      link={element.link}
                    />
                  ))}
              </Box>
            </Grow>
          </Popper>
        </div>
      )}
    </>
  );
};

Menu.propTypes = {
  label: PropTypes.string.isRequired,
  submenu: PropTypes.arrayOf(PropTypes.object),
  level: PropTypes.number,
  link: PropTypes.string,
  bgcolor: PropTypes.string,
  color: PropTypes.string,
};

Menu.defaultProps = {
  level: 0,
  bgcolor: "transparent",
  color: "#000",
};
