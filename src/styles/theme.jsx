import { createTheme } from "@mui/material/styles";
import { lightGreen } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: lightGreen[500],
    },
    secondary: {
      main: "#f44336",
    },
  },
});
