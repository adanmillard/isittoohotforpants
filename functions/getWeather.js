const axios = require("axios");

exports.handler = async function (event, context) {
  const { city } = event.queryStringParameters;

  if (!city || city.trim() === "") {
    return {
      statusCode: 400,
      body: "Please provide a valid city",
    };
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
    const response = await axios.get(url);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
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
