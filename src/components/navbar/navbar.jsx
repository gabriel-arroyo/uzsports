import React from "react";
import { Menu as MenuIcon, Home as HomeIcon } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import Dropdown from "./dropdown";
import { menu } from "../../database/local";
import { Avatar } from "@mui/material";

const Navbar = () => {
  return (
    <>
      <nav className="nav">
        <NavLink to="/" className="navlink">
          <HomeIcon className="home" />
        </NavLink>
        <MenuIcon className="bars" />
        <div>
          <Dropdown menu={menu} mainMenu />
        </div>
        <nav className="navbtn">
          <NavLink to="/account/register" className="navlink">
            Registro
          </NavLink>
          <NavLink to="/account/login" className="navlink">
            Login
          </NavLink>
          <Avatar sx={{ ml: 2 }} alt="user" src="https://i.pravatar.cc/300" />
        </nav>
      </nav>
    </>
  );
};

export default Navbar;
