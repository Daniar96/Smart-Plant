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
  const [waterLevel, setWaterLevel] = useState(45);
  const [plantInfo, setplantInfo] = useState({name: "Sunflower", age: 8, growth: 48});

  return (
    <div className="dashboard">
      <MyPlant name={plantInfo.name} age={plantInfo.age} growth={plantInfo.growth}/>
      <WaterTank waterLevel={waterLevel}/>
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
