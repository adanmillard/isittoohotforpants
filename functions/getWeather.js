const axios = require("axios");

exports.handler = async function (event, context) {
  const lat = event.queryStringParameters.lat;
  const lng = event.queryStringParameters.lng;

  if (!lat || lat.trim() === "" || !lng || lng.trim() === "") {
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
};
