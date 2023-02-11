import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(false);
  const [mainTemp, setMainTemp] = useState();
  const weatherKey = process.env.REACT_APP_API_KEY;
  const [userCityInput, setUserCityInput] = useState("");
  const [userCountyInput, setUserCountryInput] = useState("");

  const getCityWeather = () => {
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${userCityInput},${userCountyInput}&limit=5&appid=${weatherKey}`
      )
      .then((response) => {
        const lat = response.data[0].lat;
        const lon = response.data[0].lon;
        setLoading(true);
        return axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${weatherKey}`
        );
      })
      .then((response) => {
        setData(response.data);
        setMainTemp(response.data.main.temp);
        console.log(mainTemp);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <div>
        <h1>Is it too hot for pants?</h1>
      </div>
      <div>
        <label>City </label>
        <input onChange={(e) => setUserCityInput(e.target.value)}></input>
        <label>Country </label>
        <input onChange={(e) => setUserCountryInput(e.target.value)}></input>
        <button onClick={getCityWeather}>Get Weather</button>
      </div>
      {data ? (
        <div>
          <p>
            The Temperature is {data.main.temp} °C in {data.name},{" "}
            {data.sys.country}
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
            <p>too hot for pants</p>
          ) : (
            <p>You should wear pants</p>
          )
        ) : null}
      </div>
    </div>
  );
}

export default App;