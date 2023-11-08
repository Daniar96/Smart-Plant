import React, { useEffect, useState } from "react";
import "./navbar.scss";
import { GiPlantWatering } from "react-icons/gi";
import { AiOutlineSearch } from "react-icons/ai";
import { AiFillAppstore } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import Plant from "../my_plant/Plant";
import * as Avatar from "@radix-ui/react-avatar";
import { useNavigate, Link } from "react-router-dom";
import { useUserContext } from "../../components/context/UserContext";
import Notification from "../notificationsM/Notifications";

function Navbar() {
  const navigate = useNavigate();
  const { user, setUserData } = useUserContext();
  const [appMenu, setAppMenu] = useState("none");
  const [notification, setNotification] = useState("none");
  const [count, setCount] = useState(0);
  const [allPlant, setallPlant] = useState([]);
  const [allNoti, setAllNoti] = useState([]);

  useEffect(() => {
    setCount(
      allNoti.filter((notification) => notification.status === "OPEN").length
    );
  }, [allNoti]);

  useEffect(() => {
    if (user.token) {
      fetch("http://3.124.188.58/api/plant", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.text();
          }
        })
        .then((data) => {
          if (data) {
            const plantData = JSON.parse(data);
            setallPlant(plantData);
          }
        });
    }
  }, [user, count]);

  useEffect(() => {
    if (user.token) {
      fetch("http://3.124.188.58/api/notification", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.text();
          }
        })
        .then((data) => {
          if (data) {
            const noti = JSON.parse(data);
            setAllNoti(noti);
          }
        });
    }
  }, [user]);

  return (
    <div className="navbar flex">
      <div className="logo flex">
        <GiPlantWatering className="headerIcon" />
        <span id="logotext">GrowGenius</span>
      </div>
      <div className="icon flex">
        <div className="search-box">
          <input className="search-text" type="text" placeholder="Search" />
          <a href="#" className="search-btn">
            <AiOutlineSearch className="aiout" />
          </a>
        </div>
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
            }}
            className="headerIcon"
          />
        </div>
        <div
          onClick={() => {
            navigate("/settings");
          }}
          className="user flex"
        >
          <Avatar.Root className="AvatarRoot">
            <Avatar.Fallback className="AvatarFallback">
              {user.fullName
                .split(" ")
                .map((word) => word[0])
                .join("")}
            </Avatar.Fallback>
          </Avatar.Root>
          <span>{user.fullName}</span>
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
            {allPlant.map(({ plantId, plantName, age }) => (
              <Link
                to={`/dashboard/${plantId}`}
                key={plantId}
                onClick={() => {
                  setAppMenu("hide");
                  localStorage.setItem("activePlantID", plantId);
                }}
              >
                <Plant img={plantId} name={plantName} age={age} />
              </Link>
            ))}
          </div>
        </div>
      </aside>

      <aside className={`app-options ${notification}`}>
        <div className="app-options-headline">
          <h2>Messages </h2>
          <AiOutlineClose
            style={{ color: "#757a79" }}
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
          {allNoti.map(({ notificationId, body, status, date }) => (
            <Notification
              key={notificationId}
              id={notificationId}
              date={date}
              sender="Grow Genius"
              text={body}
              status={status ? status.toLowerCase() : "read"}
            />
          ))}
        </div>
      </aside>
    </div>
  );
}

export default Navbar;

//Your plant needs water. Please give it some.
//The water tank is empty. Please fill it.
