import React from "react";
import "./chart_component.scss";
import { CategoryScale, Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
Chart.register(CategoryScale);

function ChartComponent(props) {
  Chart.defaults.font.family = "Montserrat, sans-serif";

  var timeHr = [
    "21:00",
    "22:00",
    "23:00",
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "Now",
  ];

  var soil = [
    45, 50, 48, 52, 55, 60, 62, 65, 68, 70, 72, 70, 68, 65, 62, 60, 58, 56, 55,
    54, 52, 50, 48,
  ];

  var light = [
    20, 30, 25, 0, 0, 0, 0, 100, 150, 200, 250, 260, 280, 300, 310, 315, 300,
    250, 200, 150, 0, 0, 50,
  ];

  const temperature = [
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 20, 21, 22,
  ];

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
        borderColor: "#5bc328",
        pointBackgroundColor: "#5bc328",
        backgroundColor: "rgb(91, 195, 40, 0.25)",
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
