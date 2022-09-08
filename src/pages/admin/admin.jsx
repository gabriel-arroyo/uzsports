import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AdminCoach from "./admin-coach";
import AdminLeague from "./admin-league";
import AdminPlayer from "./admin-player";
import AdminReferee from "./admin-referee";
import AdminTeam from "./admin-team";
import AdminTournament from "./admin-tournament";
import AdminUser from "./admin-user";

/**
 *
 * @param {*} props children, value, index, ...other
 * @return {JXElement} Panel Item
 */
function Admin() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Usuario" value="1" />
            <Tab label="Jugador" value="2" />
            <Tab label="Equipo" value="3" />
            <Tab label="Coach" value="4" />
            <Tab label="Referee" value="5" />
            <Tab label="Liga" value="6" />
            <Tab label="Torneo" value="7" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <AdminUser />
        </TabPanel>
        <TabPanel value="2">
          <AdminPlayer />
        </TabPanel>
        <TabPanel value="3">
          <AdminTeam />
        </TabPanel>
        <TabPanel value="4">
          <AdminCoach />
        </TabPanel>
        <TabPanel value="5">
          <AdminReferee />
        </TabPanel>
        <TabPanel value="6">
          <AdminLeague />
        </TabPanel>
        <TabPanel value="7">
          <AdminTournament />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
export default Admin;
