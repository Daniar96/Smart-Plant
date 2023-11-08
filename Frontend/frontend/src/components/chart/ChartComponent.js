import React from "react";
import "./chart_component.scss";
import { CategoryScale, Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
Chart.register(CategoryScale);

function ChartComponent(props) {
  Chart.defaults.font.family = "Montserrat, sans-serif";

  var timeHr = props.time;

  var soil = props.soil;

  var light = props.light;

  const temperature = props.temperature;

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    aspectRatio: 2,
  };

  const data = {
    labels: timeHr,
    datasets: [
      {
        data: soil,
        borderColor: "#5DB7DE",
        pointBackgroundColor: "#5DB7DE",
        backgroundColor: "rgb(93, 183, 222, 0.25)",
        fill: true,
      },
      {
        data: light,
        borderColor: "rgb(3, 79, 132, 0.7)",
        pointBackgroundColor: "rgb(3, 79, 132, 0.7)",
        backgroundColor: "rgb(3, 79, 132, 0.25)",
        fill: true,
      },
      {
        data: temperature,
        borderColor: "#ffbd00",
        pointBackgroundColor: "#ffbd00",
        backgroundColor: "rgb(255, 189, 0, 0.25)",
        fill: true,
      },
    ],
  };
  return (
    <div className="chart">
      <Line data={data} options={options} />
    </div>
  );
}
export default ChartComponent;
