import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div>
        <h1>Navbar</h1>
        <nav>
          <Link to="/">Home</Link>| <Link to="account/register">Register</Link>|{" "}
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
