import React, { useState, useEffect } from "react";
import HomeDrop from "../buttons/home-drop";
import "./navbar.css";

const HomeNavbar = () => {
  const mediaMatch = window.matchMedia("(min-width: 768px)");
  const [matches, setMatches] = useState(mediaMatch.matches);

  useEffect(() => {
    const handler = (e) => setMatches(e.matches);
    mediaMatch.addEventListener("change", handler);
    return () => mediaMatch.removeEventListener("cahgen", handler);
  });

  const styles = {
    nav: (matches) => ({
      background: "transparent",
      height: "80px",
      display: "flex",
      flexDirection: matches ? "row" : "column",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0.5rem calc(2vw + ((100vw - 1200px) / 2)))",
      zIndex: 10,
      margin: "0 auto",
    }),
  };

  return (
    <>
      <nav style={styles.nav(matches)}>
        <HomeDrop
          menu={[
            {
              label: "Tournaments",
              submenu: [{ label: "test", link: "/" }],
            },
          ]}
        />
        <HomeDrop
          right
          color="white"
          bgcolor={"black"}
          menu={[
            {
              label: "Hall of Fame",
              submenu: [{ label: "test", link: "/" }],
            },
          ]}
        />
      </nav>
    </>
  );
};

export default HomeNavbar;
