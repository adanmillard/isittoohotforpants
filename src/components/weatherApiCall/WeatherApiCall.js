import React from "react";
import { useState } from "react";
import axios from "axios";

export const WeatherApiCall = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(false);
  const [mainTemp, setMainTemp] = useState();
  const [userCityInput, setUserCityInput] = useState("");

  //Dev Use
  const weatherKey = process.env.REACT_APP_API_KEY;

  //Dev use
  const getCityWeather = () => {
    setData(false);
    setMainTemp("");
    setLoading(true);

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${userCityInput}&units=metric&appid=${weatherKey}`
      )
      .then((response) => {
        setData(response.data);
        setMainTemp(response.data.main.temp);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /*
  const getCityWeather = () => {
    setData(false);
    setMainTemp("");
    setLoading(true);

    fetch(
      `https://ornate-brioche-82b84c.netlify.app/.netlify/functions/getWeather?city=${userCityInput}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network Response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setData(data);
        setMainTemp(data.main.temp);
        console.log(mainTemp);
        setLoading(false);
      })
      .catch((error) => {
        console.log("There was a problem with the fetch operation", error);
      });
  };
*/
  return (
    <div>
      <div>
        <label>City: </label>
        <input
          onChange={(e) => setUserCityInput(e.target.value)}
          placeholder="Enter your city.."
        ></input>
        <button onClick={getCityWeather}>Should you wear pants?</button>
      </div>
      {data ? (
        <div>
          <p>
            The current temperature in {data.name} {data.sys.country} is{" "}
            {Math.round(data.main.temp)}°C, with {data.main.humidity}% humidity
            and {data.weather[0].description}.
          </p>
        </div>
      ) : (
        loading && (
          <div>
            <p>Checking for pants...</p>
          </div>
        )
      )}
      <div>
        {data ? (
          mainTemp > 20 ? (
            <p>Based on this it is too hot for pants. 🔥</p>
          ) : (
            <p>Based on this you should wear pants. 🥶</p>
          )
        ) : null}
      </div>
    </div>
  );
};
