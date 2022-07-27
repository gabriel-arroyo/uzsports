import { Box, Popper, Grow } from "@mui/material";
import React, { useId } from "react";
import "./drop.css";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { menu } from "../../database/local";

const Drop = (props) => {
  return (
    <div style={{ flexGrow: 1 }} className="navmenu">
      {menu.map((element, key) => (
        <>
          <Menu
            key={key}
            label={element.label}
            link={element.link}
            submenu={element.submenu}
          />
          {menu.length > key + 1 && <p>●</p>}
        </>
      ))}
    </div>
  );
};

export default Drop;

const Menu = ({ label, submenu, level, link }) => {
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
                      key={key}
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
};

Menu.defaultProps = {
  level: 0,
};
