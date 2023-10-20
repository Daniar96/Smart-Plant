import "./notification.scss";
import { GoDotFill } from "react-icons/go";
import { PiEnvelopeBold } from "react-icons/pi";
const Notification = (props) => {
  const { sender, text } = props;
  const formatDate = () => {
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    const date = new Date();
    return date.toLocaleDateString(undefined, options);
  };
  return (
    <div className="notification">
      <div className="date">{formatDate()}</div>
      <div className="noiContent">
        <div className="sender">
          <div className="dot flex">
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
