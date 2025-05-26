const Weather = require("../models/weatherModel");
const axios = require("axios");

const getWeather = async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({
      status: "error",
    });
  }

  try {
    const apiKey = process.env.WEATHER_API_KEY;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const { temp } = response.data.main;
    const { description, icon } = response.data.weather[0];
    const { sunset } = response.data.sys;

    const weather = new Weather({
      city,
      temperature: temp,
      description,
      icon,
      sunset,
    });

    await weather.save();

    res.status(200).json(weather);
  } catch (err) {
    console.error("Weather fetch error:", err.message);
    
    // Handle API-specific errors (like city not found)
    if (err.response && err.response.data && err.response.status === 404) {
      return res.status(404).json({ error: "City not found" });
    }

    res.status(500).json({ error: "Failed to fetch weather data" });
  }
};

module.exports = { getWeather };
