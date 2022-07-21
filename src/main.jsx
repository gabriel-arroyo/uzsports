import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import CssBaseline from "@mui/material/CssBaseline ";
import { theme } from "./styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import Router from "./router.jsx";
import "./styles/index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline enableColorScheme />
        <QueryClientProvider client={queryClient}>
          <Router />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>
);
