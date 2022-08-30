import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/navbar";
import SocialBar from "../social/socialbar";

const Layout = () => {
  return (
    <>
      <div>
        <SocialBar />
        <Navbar />
      </div>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
