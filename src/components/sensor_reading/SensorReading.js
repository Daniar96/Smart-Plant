import React, { useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./sensor_reading.scss";
import Aos from "aos";
import "aos/dist/aos.css";
const SensorReading = (props) => {
  const { title, value, color } = props;
  const percentage = 48;
  useEffect(() => {
    Aos.init({ duration: 800 });
  }, []);
  return (
    <div data-aos="fade-left" className="measurement flex">
      <h3>{title}</h3>
      <div className="circleSize">
        <CircularProgressbar
          value={title === "Temperature" ? 100 : value}
          text={title === "Temperature" ? `${value}\u00B0C` : `${value}%`}
          strokeWidth={3}
          styles={buildStyles({
            pathColor: color,
            textColor: color,
            circleRatio: 0.5,
          })}
        />
      </div>
    </div>
  );
};

export default SensorReading;
