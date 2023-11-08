import { React, useState, useEffect, useRef } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { FiChevronDown } from "react-icons/fi";
import "./water_tank.scss";
import { useUserContext } from "../../components/context/UserContext";
import toast, { Toaster } from "react-hot-toast";

const WaterTank = (props) => {
  const isInitialRender = useRef(true);
  const [duration, setDuration] = useState("");
  const { user, setUserData } = useUserContext();
  const [unit, setUnit] = useState("");

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const handleUnitChange = (event) => {
    setUnit(event.target.value);
  };

  const parseDate = (dateStr) => {
    if (dateStr) {
      const givenDate = new Date(dateStr);
      const currentDate = new Date();
      const timeDifference = currentDate - givenDate;
      const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60)) - 1;
      const minutesDifference = Math.floor((timeDifference / (1000 * 60)) % 60);
      const formattedHours = String(hoursDifference).padStart(2, "0");
      const formattedMinutes = String(minutesDifference).padStart(2, "0");
      return `${formattedHours}:${formattedMinutes}`;
    } else {
      return `00:00`;
    }
  };

  const lastWatered = async () => {
    const date = new Date().toISOString().slice(0, 16);
    fetch(
      `http://3.124.188.58/api/plant/${localStorage.getItem("activePlantID")}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lastWater: date }),
      }
    ).catch((error) => {});
  };

  const giveWater = (duration) => {
    return fetch("http://192.168.85.42:8011", {
      method: "POST",
      body: JSON.stringify({ duration: duration }),
    })
      .then(async (response) => {
        if (response.ok) {
          lastWatered();
          return response;
        } else {
          throw new Error(response.status);
        }
      })
      .catch((error) => {
        throw new Error("Connection Refused");
      });
  };

  const handleClick = () => {
    if (duration.trim() !== "" && unit.trim() !== "") {
      const durationInSeconds = unit === "ms" ? duration / 1000 : duration;
      toast.promise(giveWater(durationInSeconds), {
        loading: "Watering in progress...",
        success: <b>Watering completed successfully!</b>,
        error: (error) => {
          if (error.message.includes("Connection Refused")) {
            return <b>Network Error: Unable to connect to the server</b>;
          } else {
            return <b>Something went wrong. Please try again.</b>;
          }
        },
      });
    } else {
      toast.error("Please fill in both duration and unit fields.", {
        position: "top-right",
        duration: 4000,
      });
    }
  };

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    if (props.mode && props.soil < props.threshold) {
      toast.promise(giveWater(5), {
        loading: "Watering in progress...",
        success: <b>Watering completed successfully!</b>,
        error: (error) => {
          if (error.message.includes("Connection Refused")) {
            return <b>Unable to connect to the server</b>;
          } else {
            return <b>Something went wrong. Please try again.</b>;
          }
        },
      });
    }
  }, [props.soil]);

  return (
    <>
      <Toaster position="top-right" />
      <div data-aos="fade-left" className="WaterTank">
        <h4 className="head">
          Last watered {parseDate(props.lastWater)} hrs ago
        </h4>
        <div className="wateringSection">
          <div className="WaterInput">
            <input
              type="number"
              placeholder="Duration"
              onChange={handleDurationChange}
            />
          </div>

          <div className="WaterSelect">
            <select defaultValue="" onChange={handleUnitChange}>
              <option disabled value="">
                Unit
              </option>
              <option value="ms">ms</option>
              <option value="s">s</option>
            </select>
            <FiChevronDown className="select-icon" />
          </div>

          <div className="btn">
            <button onClick={handleClick}>Water</button>
          </div>
        </div>
        <div className="tankContainer">
          <ProgressBar
            height="8px"
            isLabelVisible={false}
            width="43px"
            labelSize="8px"
            completed={props.water}
            bgColor={props.water > 20 ? "#1ca3ec" : "#cd4439"}
            className="vertical-progress"
          />
          <h2>{props.water}</h2>
          <div className="percentage">%</div>
        </div>
        <h4>Water Tank</h4>
      </div>
    </>
  );
};
export default WaterTank;
