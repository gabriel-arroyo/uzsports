import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Layout from "./components/layout/layout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Register from "./pages/register/register";
import Login from "./pages/login/login";
import Account from "./pages/account/account";
import AccountLayout from "./components/layout/account-layout";
import NotFoundPage from "./pages/404/404";
import { HashRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline ";
import { theme } from "./styles/theme";
import { ThemeProvider } from "@mui/material/styles";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Account />} />
            <Route path="*" element={<></>} />
          </Routes>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="account" element={<AccountLayout />}>
                <Route index element={<Account />} />
                <Route path="register/*" element={<Register />} />
                <Route path="login" element={<Login />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </HashRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
