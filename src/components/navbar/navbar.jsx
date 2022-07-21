import React from "react";
import { Menu as MenuIcon, Home as HomeIcon } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <>
      <nav className="nav">
        <NavLink to="/" className="navlink">
          <HomeIcon className="home" />
        </NavLink>
        <MenuIcon className="bars" />
        <div className="navmenu">
          <NavLink to="/account/register" className="navlink">
            Register
          </NavLink>
          <NavLink to="/account/login" className="navlink">
            Login
          </NavLink>
        </div>
        <nav className="navbtn">
          {/* <NavLink to="/account/login" className="navbtnlink">
            Login
          </NavLink> */}
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
