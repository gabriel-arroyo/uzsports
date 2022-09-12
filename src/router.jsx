import React from "react";
import Layout from "./components/layout/layout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Account from "./pages/account/account";
import AccountLayout from "./components/layout/account-layout";
import NotFoundPage from "./pages/404/404";
import { HashRouter } from "react-router-dom";
import Register from "./pages/register/register";
import Tester from "./pages/tester/tester";
import Admin from "./pages/admin/admin";
import ToDo from "./pages/todo/todo";

const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="*" element={<></>} />
      </Routes>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="todo" element={<ToDo />} />
          <Route path="tester" element={<Tester />} />
          <Route path="account" element={<AccountLayout />}>
            <Route index element={<Account />} />
            <Route path="register/*" element={<Register />} />
            <Route path="admin/*" element={<Admin />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  );
};

export default Router;
