import React from "react";
import { Outlet } from "react-router-dom";

const AccountLayout = () => {
  return (
    <div style={{ marginLeft: "20px", marginRight: "20px" }}>
      <Outlet />
    </div>
  );
};

export default AccountLayout;
