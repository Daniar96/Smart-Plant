import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import React from "react";

const Plant = React.forwardRef((props, ref) => {
  const { img, name, age, condition } = props;

  function getTextColor(condition) {
    return condition === "Good"
      ? "#1FD8A4"
      : condition === "Bad"
      ? "#FFE629"
      : condition === "Critical"
      ? "#FFC53D"
      : condition === "Mild"
      ? "#BDEE63"
      : "transparent";
  }

  return (
    <div id="plant" ref={ref}>
      <div className="img flex">
        <img src={`/assets/img/${img}.png`} alt={name} />
        <div className="text flex">
          <h4>{name}</h4>
          <h5>{age} Weeks Old</h5>
        </div>
        <CircularProgressbar
          className="size"
          value={100}
          text={`${condition}`}
          strokeWidth={6}
          styles={buildStyles({
            pathColor: condition ? "#ffebb7" : "transparent",
            textColor: getTextColor(condition),
            trailColor: condition ? "rgba(92, 99, 110, 0.5)" : "transparent",
            circleRatio: 0.5,
          })}
        />
      </div>
    </div>
  );
});

export default Plant;
