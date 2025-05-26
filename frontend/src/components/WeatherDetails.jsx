import React, { useState, useEffect } from 'react';

const WeatherDetails = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("Delhi");
  const [inputCity, setInputCity] = useState("");

  const forecast = [
    { time: 'Now', temp: 25, icon: '🌥️' },
    { time: '2 AM', temp: 25, icon: '☁️' },
    { time: '3 AM', temp: 23, icon: '☁️' },
    { time: '4 AM', temp: 22, icon: '☁️' },
    { time: '5 AM', temp: 20, icon: '☁️' },
    { time: '6 AM', temp: 25, icon: '🌥️' },
    { time: '7 AM', temp: 24, icon: '🌥️' },
    { time: '8 AM', temp: 23, icon: '☁️' },
    { time: '9 AM', temp: 22, icon: '☁️' },
    { time: '10 AM', temp: 20, icon: '☁️' },
  ];

  const fetchWeatherData = async (selectedCity) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:8000/api/fetch-weather?city=${selectedCity}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch weather data');
      }

      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputCity.trim() !== "") {
      setCity(inputCity.trim());
    }
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const formatSunset = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAE2BD]/50">
      <form onSubmit={handleSearch} className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <input
          type="text"
          placeholder="Search city"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          className="px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-[#EFAA82] px-4 py-2 rounded-r-lg text-white font-semibold"
        >
          Search
        </button>
      </form>

      <div
        className="relative w-[700px] h-[460px] bg-cover bg-no-repeat rounded-3xl overflow-hidden shadow-lg"
        style={{ backgroundImage: `url('/bg.png')` }}
      >
        {error && (
          <div className="absolute inset-0 flex justify-center items-center text-red-500 font-bold">
            Error: {error}
          </div>
        )}

        {!loading && weatherData && (
          <>
            <div className="absolute left-6 top-20 bg-[#FAE2BD] text-[#EFAA82] p-6 rounded-2xl w-64 h-80">
              <div className="text-lg font-semibold text-center">Today</div>
              <div className="flex justify-center items-center my-2 space-x-2">
                <img
                  src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                  alt={weatherData.description}
                  className="w-16 h-16 text-[#EFAA82]"
                />
                <div className="text-6xl font-bold text-center">{Math.round(weatherData.temperature)}°</div>
              </div>
              <div className="text-xl text-center font-medium">{weatherData.description}</div>
              <div className="text-sm mt-1 font-semibold text-center">{weatherData.city}</div>
              <div className="text-sm font-semibold mt-4 text-center">{currentDate}</div>
              <div className="text-xs font-semibold mt-2 text-center">
                Feels like {Math.round(weatherData.temperature)}° <span className="mx-2">|</span> Sunset{" "}
                {formatSunset(weatherData.sunset)}
              </div>
            </div>

            <div className="absolute right-20 top-20 bg-gray-200/60 backdrop-blur-md rounded-2xl p-4 w-[280px]">
              <div className="grid grid-cols-5 gap-2 text-center text-sm text-gray-700">
                {forecast.slice(0, 5).map((item, index) => (
                  <div key={index}>
                    <div>{item.time}</div>
                    <div className="text-lg">{item.icon}</div>
                    <div>{item.temp}°</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-5 gap-2 text-center text-sm text-gray-700 mt-3">
                {forecast.slice(5).map((item, index) => (
                  <div key={index}>
                    <div>{item.time}</div>
                    <div className="text-lg">{item.icon}</div>
                    <div>{item.temp}°</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute right-20 top-[265px] rounded-2xl p-2 w-[280px] text-white font-semibold">
              <div className="text-sm font-semibold">Weather Tips</div>
              <p className="text-xs mt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit magni quae culpa illo veniam molestias exercitationem repellendus magnam assumenda. Veniam consectetur obcaecati amet eos qui maiores autem impedit facilis laborum?
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherDetails;
