import "./App.css";
import { useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(false);
  const [mainTemp, setMainTemp] = useState();
  const [userCityInput, setUserCityInput] = useState("");

  const getCityWeather = () => {
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

  return (
    <div className="App">
      <div>
        <h1>Is it too hot for pants?</h1>
      </div>
      <div>
        <label>City </label>
        <input onChange={(e) => setUserCityInput(e.target.value)}></input>
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
