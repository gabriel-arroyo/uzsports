import React from "react";
import { Outlet } from "react-router-dom";

const AccountLayout = () => {
  return (
    <div>
      <h1>AccountLayout</h1>
      <Outlet />
    </div>
  );
};

export default AccountLayout;
