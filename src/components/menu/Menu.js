import React from "react";
import "./menu.scss";
import { useNavigate } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { MdSupportAgent } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { GrAddCircle } from "react-icons/gr";
import { BiLogOutCircle } from "react-icons/bi";
function Menu() {
  const navigate = useNavigate();
  return (
    <div className="menu flex">
      <div className="flex custom">
        <div className="iconContainer flex">
          <AiOutlineDashboard />
          <span>Dashboard</span>
        </div>
      </div>

      <div className="flex custom">
        <div className="iconContainer flex">
          <GrAddCircle />
          <span>Add Plants</span>
        </div>
      </div>

      <div className="flex custom">
        <div className="iconContainer flex">
          <FiSettings />
          <span>Settings</span>
        </div>
      </div>

      <div className="flex custom">
        <div className="iconContainer flex">
          <MdSupportAgent />
          <span>Support</span>
        </div>
      </div>

      <div id="logout" className="flex custom">
        <div
          onClick={() => {
            navigate("/login");
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
