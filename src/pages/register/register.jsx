import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import RegisterPlayer from "./register-player";
import RegisterTeam from "./register-team";
import RegisterCoach from "./register-coach";
import RegisterReferee from "./register-referee";
import RegisterLeague from "./register-legue";
import RegisterTournament from "./register-tournament";
import RegisterUser from "./register-user";

/**
 *
 * @param {*} props children, value, index, ...other
 * @return {JXElement} Panel Item
 */
function Register() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Jugador" value="1" />
            <Tab label="Equipo" value="2" />
            <Tab label="Coach" value="3" />
            <Tab label="Referee" value="4" />
            <Tab label="Liga" value="5" />
            <Tab label="Torneo" value="6" />
            <Tab label="Usuario" value="7" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <RegisterPlayer />
        </TabPanel>
        <TabPanel value="2">
          <RegisterTeam />
        </TabPanel>
        <TabPanel value="3">
          <RegisterCoach />
        </TabPanel>
        <TabPanel value="4">
          <RegisterReferee />
        </TabPanel>
        <TabPanel value="5">
          <RegisterLeague />
        </TabPanel>
        <TabPanel value="6">
          <RegisterTournament />
        </TabPanel>
        <TabPanel value="7">
          <RegisterUser />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
export default Register;
