import { Box, Popper, Grow } from "@mui/material";
import React, { useId } from "react";
import "./drop.css";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const Drop = (props) => {
  const liga = [
    {
      label: "Inicio",
      submenu: [
        { label: "Registro", link: "/account/register" },
        { label: "Login", link: "/account/login" },
      ],
    },
    {
      label: "Nosotros",
      submenu: [
        { label: "s2", link: "/account/register" },
        { label: "s2", link: "/account/login" },
      ],
    },
    { label: "Servicios", link: "/services" },
  ];

  return (
    <div style={{ flexGrow: 1 }} className="navmenu">
      <p>●</p>
      <Menu label="Liga" submenu={liga} />
      <p>●</p>
      <Menu label="Comunidad" link="/account/register" />
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
