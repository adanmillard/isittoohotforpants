import React from "react";
import { useState } from "react";
import "../weatherApiCall/weatherApiCall.css";
import PlacesAutoComplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import axios from "axios";

export const WeatherApiCall = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(false);
  const [mainTemp, setMainTemp] = useState();
  const [error, setError] = useState("");
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null,
  });

  const weatherKey = process.env.REACT_APP_API_KEY;

  const getCityWeather = () => {
    setData(false);
    setMainTemp("");
    setLoading(true);
    setError("");
    setCoordinates("");

    if (!coordinates.lat || !coordinates.lng) {
      setError("Error checking for pants.");
      setLoading(false);
    } else {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lng}&units=metric&&appid=${weatherKey}`
        )
        .then((response) => {
          setData(response.data);
          setMainTemp(response.data.main.temp);
          setLoading(false);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
          setError("Error checking for pants.");
          setLoading(false);
        });
    }
  };

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  };

  return (
    <div className="weather-api-container">
      <div className="label-input-container">
        <label>Address: </label>
        <PlacesAutoComplete
          value={address}
          onChange={setAddress}
          onSelect={handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <input
                {...getInputProps({ placeholder: "Type address" })}
              ></input>
              <div className="google-loading-msg">
                {loading ? <div>... Loading</div> : null}
              </div>
              {suggestions.map((suggestion, i) => {
                const style = {
                  backgroundColor: suggestion.active ? "#e9f80e" : "#f0efeb",
                  outline: suggestion.active ? "1px solid black" : null,
                };
                return (
                  <div
                    className="google-address-msg"
                    {...getSuggestionItemProps(suggestion, { style })}
                    key={i}
                  >
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          )}
        </PlacesAutoComplete>
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
