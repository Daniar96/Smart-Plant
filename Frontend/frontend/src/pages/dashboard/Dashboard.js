import React, { useState, useEffect } from "react";
import "./dashboard.scss";
import ChartComponent from "../../components/chart/ChartComponent";
import SensorReading from "../../components/sensor_reading/SensorReading";
import MyPlant from "../../components/my_plant/MyPlant";
import WaterTank from "../../components/water_tank/WaterTank";

function Dashboard() {
  const [reading, setReading] = useState({
    soil: 64,
    light: 15,
    temperature: 21,
  });

  return (
    <div className="dashboard">
      <MyPlant />
      <WaterTank />
      <ChartComponent />
      <SensorReading
        title="Soil Moisture"
        value={reading.soil}
        color="#5DB7DE"
      />
      <SensorReading
        title="Light Intensity"
        value={reading.light}
        color="#57cc99"
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
