import React from "react";
import { Menu as MenuIcon, Home as HomeIcon } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import Dropdown from "./dropdown";
import { menu } from "../../database/local";
import { Avatar, Button, Typography } from "@mui/material";
import usePersistentContext from "../../hooks/usePersistentContext";
import PropTypes from "prop-types";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { firestore } from "../../database/firebase";
import { collection, query as fbQuery, limit, where } from "firebase/firestore";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import { useAuthSignOut } from "@react-query-firebase/auth";
import { auth } from "../../database/firebase";

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
          <NavLink to="/todo" className="navlink">
            To-Do
          </NavLink>
          <NavLink to="/account/register" className="navlink">
            Registro
          </NavLink>
          <NavLink to="/account/login" className="navlink">
            Login
          </NavLink>
          <NavLink to="/account/admin" className="navlink">
            Admin
          </NavLink>
          {uid && <User id={uid} />}
        </nav>
      </nav>
    </>
  );
};

export default Navbar;

const User = ({ id }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const closePoper = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const idPoppper = open ? "simple-popper" : undefined;

  const ref = fbQuery(
    collection(firestore, "Users"),
    limit(10),
    where("uid", "==", id)
  );

  const query = useFirestoreQuery(["Users"], ref);

  const mutation = useAuthSignOut(auth, {
    onSuccess(user) {
      console.log("yeii");
      console.log(user);
      if (user) {
        console.log("user logged out: ", user);
      }
    },
  });

  const logout = () => {
    closePoper();
    mutation.mutate();
    localStorage.removeItem("roles");
    localStorage.removeItem("uid");
    localStorage.removeItem("user");
    console.log("deleting");
  };

  if (query.isLoading || mutation.isLoading) {
    return <div>Loading...</div>;
  }
  const snapshot = query.data;
  return (
    <>
      {snapshot.docs.map((doc) => {
        const data = doc.data();
        return (
          <div key={doc.id} onMouseLeave={closePoper}>
            <div
              onClick={handleClick}
              style={{
                display: "flex",
                cursor: "pointer",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar
                sx={{ ml: 2 }}
                alt="user"
                src="https://i.pravatar.cc/300"
              />
              <div style={{ marginLeft: "10px" }}>{data.firstName}</div>
            </div>
            <Popper id={idPoppper} open={open} anchorEl={anchorEl}>
              <Box
                sx={{
                  mt: 2,
                  border: 1,
                  p: 1,
                  bgcolor: "background.paper",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography variant="body1" sx={{ m: 1 }}>
                  {data.email}
                </Typography>
                <hr />
                <Button variant="contained" onClick={logout}>
                  Cerrar sesión
                </Button>
              </Box>
            </Popper>
          </div>
        );
      })}
    </>
  );
};

User.propTypes = {
  id: PropTypes.string.isRequired,
};
