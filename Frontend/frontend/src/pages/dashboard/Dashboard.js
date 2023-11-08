import React, { useState, useEffect } from "react";
import "./dashboard.scss";
import ChartComponent from "../../components/chart/ChartComponent";
import SensorReading from "../../components/sensor_reading/SensorReading";
import MyPlant from "../../components/my_plant/MyPlant";
import WaterTank from "../../components/water_tank/WaterTank";
import { useUserContext } from "../../components/context/UserContext";
import { useParams, useNavigate } from "react-router-dom";
function Dashboard() {
  const navigate = useNavigate();
  let { plantId } = useParams();
  const [stage, setStage] = useState(false);
  const [initialID, setinitialID] = useState("");
  const [hideDas, setHideDas] = useState("");
  const [plantCon, setPlantCon] = useState("");
  const { user, setUserData } = useUserContext();
  const [plant, setPlant] = useState({
    plantName: " ",
    age: " ",
    lastWater: " ",
    location: " ",
    mode: " ",
    threshold: " ",
  });

  const [reading, setReading] = useState({
    soil: "",
    light: "",
    temperature: "",
    water: 0,
  });

  const [measurement, setMeasurement] = useState({
    soil: [],
    light: [],
    temperature: [],
    time: [],
  });

  const getMeasurement = (plantId) => {
    fetch(`http://3.124.188.58/api/measurement/${plantId}?pageSize=2`, {
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
          const measurement = JSON.parse(data);
          if (measurement.content[0]) {
            const { temp, humidity, uv, water } = measurement.content[0];
            setReading({
              soil: humidity,
              light: uv,
              temperature: temp,
              water: water ? water : 0,
            });
          }
        }
      });
  };

  const getAllMeasurement = (plantId) => {
    fetch(`http://3.124.188.58/api/measurement/${plantId}?pageSize=25`, {
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
          const soil = [];
          const light = [];
          const temperature = [];
          const time = [];
          const measurements = JSON.parse(data);
          measurements.content.forEach((measurement, index) => {
            soil.push(measurement.humidity);
            light.push(measurement.uv);
            temperature.push(measurement.temp);
            const date = new Date(measurement.date);
            const hours = date.getHours() + 1;
            const minutes = date.getMinutes();
            const formattedTime = `${hours}:${minutes}`;
            time.push(index === 0 ? "Now" : formattedTime);
          });
          setMeasurement({
            soil: soil,
            light: light,
            temperature: temperature,
            time: time,
          });
        }
      });
  };

  useEffect(() => {
    if (user.token) {
      fetch(
        plantId !== undefined
          ? `http://3.124.188.58/api/plant/${plantId}`
          : "http://3.124.188.58/api/plant",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.text();
          }
          if (response.status === 401) {
            navigate("/");
            localStorage.removeItem("userData");
            localStorage.removeItem("activePlantID");
          }
        })
        .then((data) => {
          if (data) {
            const plantData = JSON.parse(data);
            if (plantData) {
              if (plantData.length === 0) {
                setHideDas("none");
              }
              try {
                setPlant({
                  plantName: plantData[0].plantName,
                  age: plantData[0].age,
                  lastWater: plantData[0].lastWater,
                  location: plantData[0].location,
                  mode: plantData[0].mode,
                  threshold: plantData[0].threshold,
                });
                plantId = plantData[0].plantId;
                setinitialID(plantId);
                localStorage.setItem("activePlantID", plantId);
              } catch (error) {
                setPlant({
                  plantName: plantData.plantName,
                  age: plantData.age,
                  lastWater: plantData.lastWater,
                  location: plantData.location,
                  mode: plantData.mode,
                  threshold: plantData.threshold,
                });
                plantId = plantData.plantId;
                setinitialID(plantId);
                localStorage.setItem("activePlantID", plantId);
              }
              if (plantId) {
                getMeasurement(plantId);
                getAllMeasurement(plantId);
              }
            }
          }
        });
    }
  }, [user.token, plantId, stage]);

  const update = (val) => {
    setStage(true);
  };

  // useEffect(() => {
  //   const measurementInterval = setInterval(() => {
  //     if (plantId) {
  //       getMeasurement(plantId);
  //       getAllMeasurement(plantId);
  //     }
  //   }, 10000);
  //   return () => clearInterval(measurementInterval);
  // }, [plantId]);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  function getPlantCondition(moisture) {
    const moistureGoodMin = 50;
    const moistureGoodMax = 70;
    const moistureBadMin = 0;
    const moistureBadMax = 30;
    const moistureCriticalMin = 80;
    const moistureCriticalMax = 100;
    if (moisture >= moistureGoodMin && moisture <= moistureGoodMax) {
      return "Good";
    } else if (moisture >= moistureBadMin && moisture <= moistureBadMax) {
      return "Bad";
    } else if (
      moisture >= moistureCriticalMin &&
      moisture <= moistureCriticalMax
    ) {
      return "Critical";
    } else {
      return "Mild";
    }
  }

  useEffect(() => {
    setPlantCon(getPlantCondition(reading.soil));
  }, [reading.soil]);

  return (
    <div className={`dashboard ${hideDas}`}>
      <MyPlant
        img={plantId ? plantId : initialID}
        plantName={plant.plantName}
        age={plant.age}
        condition={plantCon}
        place={plant.location}
        mode={plant.mode}
        threshold={plant.threshold}
        update={update}
      />
      <WaterTank
        water={reading.water}
        lastWater={plant.lastWater}
        mode={plant.mode}
        soil={reading.soil}
        threshold={plant.threshold}
      />
      <ChartComponent
        soil={measurement.soil}
        light={measurement.light}
        temperature={measurement.temperature}
        time={measurement.time}
      />
      <SensorReading
        title="Soil Moisture"
        value={reading.soil}
        color="#5DB7DE"
      />
      <SensorReading
        title="Light Intensity"
        value={reading.light}
        color="#034f84"
      />
      <SensorReading
        title="Temperature"
        value={reading.temperature}
        color="#ffbd00"
      />
    </div>
  );
}

export default Dashboard;
