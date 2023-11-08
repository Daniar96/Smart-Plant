import React from "react";
import "./menu.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { MdSupportAgent } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { GrAddCircle } from "react-icons/gr";
import { useUserContext } from "../../components/context/UserContext";
import { BiLogOutCircle } from "react-icons/bi";
function Menu() {
  const navigate = useNavigate();
  const { user, setUserData } = useUserContext();
  const plantId = localStorage.getItem("activePlantID");
  const currentPath = useLocation().pathname;
  const removeInfo = () => {
    setUserData({
      userID: "",
      token: "",
      userName: "",
      fullName: "",
      email: "",
    });
  };

  const isActive = (route) => {
    return currentPath.startsWith(route) ? "active" : "";
  };

  return (
    <div className="menu flex">
      <div className={`flex custom  ${isActive("/dashboard")}`}>
        <div
          onClick={() => {
            navigate(plantId ? `/dashboard/${plantId}` : "/dashboard");
          }}
          className="iconContainer flex"
        >
          <AiOutlineDashboard />
          <span>Dashboard</span>
        </div>
      </div>

      <div className={`flex custom  ${isActive("/add")}`}>
        <div className="iconContainer flex">
          <GrAddCircle />
          <span>Add Plants</span>
        </div>
      </div>

      <div className={`flex custom  ${isActive("/settings")}`}>
        <div
          onClick={() => {
            navigate("/settings");
          }}
          className="iconContainer flex"
        >
          <FiSettings />
          <span>Settings</span>
        </div>
      </div>

      <div className={`flex custom  ${isActive("/support")}`}>
        <div
          onClick={() => {
            navigate("/support");
          }}
          className="iconContainer flex"
        >
          <MdSupportAgent />
          <span>Support</span>
        </div>
      </div>

      <div id="logout" className="flex custom">
        <div
          onClick={() => {
            removeInfo();
            localStorage.removeItem("userData");
            localStorage.removeItem("activePlantID");
            navigate("/");
          }}
          className="iconContainer flex"
        >
          <BiLogOutCircle />
          <span>LogOut</span>
        </div>
      </div>
    </div>
  );
}

export default Menu;
