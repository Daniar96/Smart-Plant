import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { FiChevronDown } from "react-icons/fi";
import "./water_tank.scss";

const WaterTank = (props) => {
  return (
    <div data-aos="fade-left" className="WaterTank">
      <h4 className="head">Last watered 30 mins ago</h4>
      <div className="wateringSection">
        <div className="WaterInput">
          <input type="number" placeholder="Duration" />
        </div>
        <div className="WaterSelect">
          <select defaultValue="">
            <option disabled value="">
              Unit
            </option>
            <option value="ms">ms</option>
            <option value="s">s</option>
            <option value="min">min</option>
          </select>
          <FiChevronDown className="select-icon" />
        </div>
        <div className="btn">
          <button>Water</button>
        </div>
      </div>
      <div className="tankContainer">
        <ProgressBar
          height="8px"
          isLabelVisible={false}
          width="43px"
          labelSize="8px"
          completed={props.waterLevel}
          bgColor="#1ca3ec"
          className="vertical-progress"
        />
        <h2>{props.waterLevel}</h2>
        <div className="percentage">%</div>
      </div>
      <h4>Water Tank</h4>
    </div>
  );
};
export default WaterTank;
