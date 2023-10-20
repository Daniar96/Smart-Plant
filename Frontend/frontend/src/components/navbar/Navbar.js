import React, { useEffect, useState } from "react";
import "./navbar.scss";
import { GiPlantWatering } from "react-icons/gi";
import { AiOutlineSearch } from "react-icons/ai";
import { AiFillAppstore } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import Plant from "../my_plant/Plant";
import Notification from "../notificationsM/Notifications";

function Navbar() {
  const [appMenu, setAppMenu] = useState("none");
  const [notification, setNotification] = useState("none");
  const [count, setCount] = useState(0);

  useEffect(() => {}, count);

  return (
    <div className="navbar flex">
      <div className="logo flex">
        <GiPlantWatering className="headerIcon" />
        <span id="logotext">GrowGenius</span>
      </div>
      <div className="icon flex">
        <AiOutlineSearch className="headerIcon aiout" />
        <AiFillAppstore
          onClick={() => {
            setAppMenu("");
          }}
          className="headerIcon"
        />
        <div
          className={`notifications flex ${count === 0 ? "zero-count" : ""}`}
          data-count={count}
        >
          <IoIosNotificationsOutline
            onClick={() => {
              setNotification("");
              setCount(0);
            }}
            className="headerIcon"
          />
        </div>
        <div className="user flex">
          <img src={"/assets/img/profile.jpeg"} alt="" />
          <span>Tico</span>
        </div>
      </div>
      <aside className={`app-options ${appMenu}`}>
        <div className="app-options-headline">
          <h2>Connected Plants</h2>
          <AiOutlineClose
            onClick={() => {
              setAppMenu("hide");
            }}
            className="closeIcon"
          />
        </div>
        <div className="app-options-contents">
          <div className="plant">
            <Plant img="sunflower" name="Sunflower" age="8" growth="48" />
            <Plant img="rubber" name="Rubber" age="4" growth="36" />
            <Plant img="umbrella" name="Umbrella" age="5" growth="23" />
          </div>
        </div>
      </aside>

      <aside className={`app-options ${notification}`}>
        <div className="app-options-headline">
          <h2>Messages </h2>
          <AiOutlineClose
            style={{ color: "#04736D" }}
            onClick={() => {
              setNotification("hide");
            }}
            className="closeIcon"
          />
        </div>
        <div id="line1"></div>
        <div id="clear-button">Clear All</div>
        <div id="line2"></div>
        <div className="app-options-contents">
          <Notification sender="Grow Genius" text="Water level is low" />
          <Notification sender="Grow Genius" text="Update your password" />
        </div>
      </aside>
    </div>
  );
}

export default Navbar;
