import React from "react";
import { Menu as MenuIcon, Home as HomeIcon } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import Dropdown from "./dropdown";
import { menu } from "../../database/local";
import { Avatar } from "@mui/material";
import usePersistentContext from "../../hooks/usePersistentContext";
import PropTypes from "prop-types";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { firestore } from "../../database/firebase";
import { collection, query as fbQuery, limit, where } from "firebase/firestore";

const Navbar = () => {
  const [uid] = usePersistentContext("uid");

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
          <NavLink to="/account/admin" className="navlink">
            Admin
          </NavLink>
          <Avatar sx={{ ml: 2 }} alt="user" src="https://i.pravatar.cc/300" />
          {uid && <User id={uid} />}
        </nav>
      </nav>
    </>
  );
};

export default Navbar;

const User = ({ id }) => {
  const ref = fbQuery(
    collection(firestore, "Users"),
    limit(10),
    where("uid", "==", id)
  );

  const query = useFirestoreQuery(["Users"], ref);

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  const snapshot = query.data;
  return (
    <>
      {snapshot.docs.map((doc) => {
        const data = doc.data();
        return (
          <div style={{ marginLeft: "10px" }} key={doc.id}>
            {data.firstName}
          </div>
        );
      })}
    </>
  );
};

User.propTypes = {
  id: PropTypes.string.isRequired,
};
