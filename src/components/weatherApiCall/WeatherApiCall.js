import React from "react";
import { useState } from "react";
import "../weatherApiCall/weatherApiCall.css";

export const WeatherApiCall = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(false);
  const [mainTemp, setMainTemp] = useState();
  const [userCityInput, setUserCityInput] = useState("");
  const [error, setError] = useState("");

  const getCityWeather = () => {
    setData(false);
    setMainTemp("");
    setLoading(true);
    setError("");

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
        setError("Error checking for pants. Please enter a valid city.");
        setLoading(false);
      });
  };

  return (
    <div className="weather-api-container">
      <div className="label-input-container">
        <label>City: </label>
        <input
          onChange={(e) => setUserCityInput(e.target.value)}
          placeholder="Enter your city.."
        ></input>
        <button onClick={getCityWeather}>Should you wear pants?</button>
      </div>
      {data ? (
        <div className="response-msg">
          <p>
            The current temperature in {data.name} {data.sys.country} is{" "}
            {Math.round(data.main.temp)}°C, with {data.main.humidity}% humidity
            and {data.weather[0].description}.
          </p>
        </div>
      ) : (
        loading && (
          <div className="loading-msg">
            <p>Checking for pants...</p>
          </div>
        )
      )}
      <div className="outcome-msg">
        {data ? (
          mainTemp > 20 ? (
            <p>Based on this it is too hot for pants. 🔥</p>
          ) : (
            <p>Based on this you should wear pants. 🥶</p>
          )
        ) : null}
      </div>
      {error && (
        <div className="error-msg">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};
