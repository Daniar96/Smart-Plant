import { React, useState, useEffect } from "react";
import Navigation from "./Navigation";
import { Outlet } from "react-router-dom";
import { useUserContext } from "../../components/context/UserContext";
const Settings = () => {
  const { user, setUserData } = useUserContext();
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);
  return (
    <div className="settings" style={{ display: "flex", columnGap: "1.5rem" }}>
      <div className="navigation" style={{ width: "400px" }}>
        <Navigation />
      </div>
      <div className="main-setting" style={{ width: "100%", height: "92vh" }}>
        <Outlet />
      </div>
    </div>
  );
};
export default Settings;
