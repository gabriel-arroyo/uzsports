import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Button } from "@mui/material";
import Navbar from "../navbar/navbar";

const Layout = () => {
  return (
    <>
      <div>
        <Navbar />
        <nav>
          <Link to="/" sx={{ textDecoration: "none" }}>
            <Button variant="contained" sx={{ textDecoration: "none" }}>
              Home
            </Button>
          </Link>
          | <Link to="account/register">Register</Link>|{" "}
          <Link to="account/login">Login</Link>
        </nav>
      </div>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
