import React from "react";
import { Menu as MenuIcon, Home as HomeIcon } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import "./navbar.css";
// import Drop from "./drop";

const Navbar = () => {
  return (
    <>
      <nav className="nav">
        <NavLink to="/" className="navlink">
          <HomeIcon className="home" />
        </NavLink>
        <MenuIcon className="bars" />
        <div className="navmenu">
          {/* <Drop /> */}
          <NavLink to="/account/about" className="navlink">
            This is uz
          </NavLink>
          <p>●</p>
          <NavLink to="/account/league" className="navlink">
            Liga
          </NavLink>
          <p>●</p>
          <NavLink to="/account/comunity" className="navlink">
            Comunidad
          </NavLink>
        </div>
        <nav className="navbtn">
          <NavLink to="/account/register" className="navlink">
            Registro
          </NavLink>
          <NavLink to="/account/login" className="navlink">
            Login
          </NavLink>
        </nav>
      </nav>
    </>
  );
};

export default Navbar;
