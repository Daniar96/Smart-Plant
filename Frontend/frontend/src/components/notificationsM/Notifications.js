import { useState } from "react";
import "./notification.scss";
import { GoDotFill } from "react-icons/go";
import { useUserContext } from "../../components/context/UserContext";
import { PiEnvelopeBold } from "react-icons/pi";
const Notification = (props) => {
  const [dot, hideDot] = useState("");
  const { user, setUserData } = useUserContext();
  const { id, sender, text, status, date } = props;

  function MarkAsRead(id) {
    fetch(`http://3.124.188.58/api/notification/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "READ" }),
    })
      .then((response) => {
        if (response.ok) {
          hideDot("read");
        }
      })
      .catch((error) => {});
  }
  const formatDate = (date) => {
    const inputDate = new Date(date);
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    return inputDate.toLocaleDateString(undefined, options);
  };

  return (
    <div onClick={() => MarkAsRead(id)} className="notification">
      <div className="date">{formatDate(date)}</div>
      <div className="noiContent">
        <div className="sender">
          <div className={`dot flex ${dot} ${status}`}>
            <GoDotFill className="bold" />
          </div>
          <div className="flex envelope">
            <PiEnvelopeBold />
          </div>
          <div className="senderInfo">
            <span className="flex">{sender}</span>
          </div>
        </div>
        <div className="infoText">
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
};

export default Notification;
