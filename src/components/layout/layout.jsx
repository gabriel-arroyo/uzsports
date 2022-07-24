import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/navbar";

const Layout = () => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
