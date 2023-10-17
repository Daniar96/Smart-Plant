import React, { useEffect } from "react";
import "./myPlant.scss";
import sunflower from "../../img/sunflower.png";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import sun from "../../img/sun.png";
import { IoLocationSharp } from "react-icons/io5";
import Aos from "aos";
import "aos/dist/aos.css";
const MyPlant = (props) => {
  const { name, age, growth } = props;
  useEffect(() => {
    Aos.init({ duration: 800 });
  }, []);
  return (
    <div className="myPlant">
      <div className="infoContainer">
        <div data-aos="fade-down" className="plant info">
          <h3>Your Plant</h3>
          <div id="plant">
            <div className="img flex">
              <img src={sunflower} />
              <div className="text flex">
                <h4>{name}</h4>
                <h5>{age} Weeks Old</h5>
              </div>
              <CircularProgressbar
                className="size"
                value={growth}
                text={`${growth}%`}
                strokeWidth={6}
                styles={buildStyles({
                  pathColor: "#21bf73",
                  textColor: "white",
                  trailColor: "#c1c1c1",
                  circleRatio: 0.5,
                })}
              />
            </div>
          </div>
        </div>
        <div data-aos="fade-down" className="temperature info">
          <div className="weather">
            <h3 className="flex">
              <IoLocationSharp className="location" />
              Enschede, Netherlands
            </h3>
            <div className="temandimg">
              <h1>
                18<span>&deg;C</span>
              </h1>
              <img src={sun} />
            </div>
            <h4>- mostly clear</h4>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyPlant;
