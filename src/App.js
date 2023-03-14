import "./App.css";
import { Footer } from "./components/footer/Footer";
import { Heading } from "./components/header/Heading";
import { WeatherApiCall } from "./components/weatherApiCall/WeatherApiCall";

function App() {
  return (
    <div className="App">
      <Heading />
      <WeatherApiCall />
      <Footer />
    </div>
  );
}

export default App;
