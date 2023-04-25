import React from "react";
import { useState } from "react";
import "../weatherApiCall/weatherApiCall.css";
import PlacesAutoComplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

export const WeatherApiCall = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(false);
  const [mainTemp, setMainTemp] = useState();
  // const [userCityInput, setUserCityInput] = useState("");
  const [error, setError] = useState("");
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null,
  });

  const getCityWeather = async () => {
    setData(false);
    setMainTemp("");
    setLoading(true);
    setError("");

    fetch(
      `https://ornate-brioche-82b84c.netlify.app/.netlify/functions/getWeather?lat=${coordinates.lat}&?lon=${coordinates.lng}`
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

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
    console.log(coordinates.lat);
    console.log(coordinates.lng);
  };

  return (
    <div className="weather-api-container">
      <div className="label-input-container">
        <label>City: </label>
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
              <div>{loading ? <div>... Loading</div> : null}</div>
              {suggestions.map((suggestion, i) => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                };
                return (
                  <div
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
