import React, { useEffect, useState } from "react";
import "./myPlant.scss";
import { IoLocationSharp } from "react-icons/io5";
import Aos from "aos";
import "aos/dist/aos.css";
import Plant from "./Plant";

const MyPlant = () => {
  useEffect(() => {
    Aos.init({ duration: 800 });
  }, []);

  const [tem, setTem] = useState({ weatherDescription: "", temperature: "" });
  const [location, setLocation] = useState({
    city: "Enschede",
    country: "Netherlands",
    latitude: 52.2207,
    longitude: 6.8951,
  });

  useEffect(() => {
    fetch("https://ipinfo.io/json?token=94fe5687994488")
      .then((response) => response.json())
      .then((data) => {
        const [latitude, longitude] = data.loc.split(",");
        const city = data.city;
        const country = data.country;
        setLocation({
          city: city,
          country: country,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        });
      });
  }, []);

  useEffect(() => {
    const apiKey = "29cca481017e53df82b569510168cd3e";
    const { latitude, longitude } = location;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        const weatherDescription = data.weather[0].description;
        const temperature = data.main.temp;
        setTem({ weatherDescription, temperature });
      })
      .catch();
  }, [location]);

  return (
    <div className="myPlant">
      <div className="infoContainer">
        <div data-aos="fade-down" className="plant info">
          <h3>Your Plant</h3>
          <Plant img="sunflower" name="Sunflower" age="8" growth="48" />
        </div>
        <div data-aos="fade-down" className="temperature info">
          <div className="weather">
            <h3 className="flex">
              <IoLocationSharp className="location" />
              {location.city}, {location.country}
            </h3>
            <div className="temandimg">
              <h1>
                {tem.temperature}
                <span>&deg;C</span>
              </h1>
              <img
                src={
                  tem.weatherDescription.includes("rain")
                    ? "/assets/img/rain.png"
                    : "/assets/img/sun.png"
                }
                alt="Weather Image"
              />
            </div>
            <h4>{tem.weatherDescription}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyPlant;
