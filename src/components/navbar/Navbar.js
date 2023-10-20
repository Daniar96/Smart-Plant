import React from "react";
import "./navbar.scss";
import profilePic from "../../img/profile.jpeg";
import { GiPlantWatering } from "react-icons/gi";
import { AiOutlineSearch } from "react-icons/ai";
import { AiFillAppstore } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { AiOutlineSetting } from "react-icons/ai";

function Navbar() {
  return (
    <div className="navbar flex">
      <div className="logo flex">
        <GiPlantWatering className="headerIcon" />
        <span>GrowGenius</span>
      </div>
      <div className="icon flex">
        <AiOutlineSearch className="headerIcon aiout" />
        <AiFillAppstore className="headerIcon" />
        <div className="notifications flex" data-count={5}>
          <IoIosNotificationsOutline className="headerIcon" />
        </div>
        <div className="user flex">
          <img src={profilePic} alt="" />
          <span>Tico</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
