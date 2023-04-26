const axios = require("axios");
const cors = require("cors");

exports.handler = cors({ origin: "*" })(async function (event, context) {
  const { lat, lng } = event.queryStringParameters;

  if (!lat || lat.trim() === "") {
    return {
      statusCode: 400,
      body: "Please provide a valid city",
    };
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${process.env.WEATHER_API_KEY}`;
    const response = await axios.get(url);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Content-Type, Access-Control-Allow-Headers, X-Requested-With",
        "Access-Control-Allow-Methods": "GET, POST, OPTION",
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "Error getting weather data",
    };
  }
});
