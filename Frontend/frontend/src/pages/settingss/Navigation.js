import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import "./navigation.scss";
const Navigation = () => {
  return (
    <div className="navigation-container">
      <Link to={"/settings"}>
        <div className="options flex">
          <AiOutlineUser className="icons" />
          <span>Profile</span>
        </div>
      </Link>
      <Link to={"/settings/password"}>
        <div className="options flex">
          <RiLockPasswordLine className="icons" />
          <span>Password</span>
        </div>
      </Link>
      <Link to={"/settings/notifications"}>
        <div className="options flex">
          <IoIosNotificationsOutline className="icons" />
          <span>Notifications</span>
        </div>
      </Link>
    </div>
  );
};
export default Navigation;
