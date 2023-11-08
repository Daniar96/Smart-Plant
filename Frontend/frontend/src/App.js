import React from "react";
import "./global.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Support from "./pages/support/Support";
import DashboardRoutes from "./pages/dashboard/DashboardRoutes";
import Settings from "./pages/settingss/Settings";
import Profile from "./pages/settingss/profile/Profile";
import Password from "./pages/settingss/password/Password";
import Notification from "./pages/settingss/se-notification/Notification";

function App() {
  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/dashboard/*",
          element: <DashboardRoutes />,
        },
        {
          path: "/settings",
          element: <Settings />,
          children: [
            {
              path: "",
              element: <Profile />,
            },
            {
              path: "password",
              element: <Password />,
            },
            {
              path: "notifications",
              element: <Notification />,
            },
          ],
        },
        {
          path: "/support",
          element: <Support />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
