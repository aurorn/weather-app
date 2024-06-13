import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';
import WeeklyForecast from './components/WeeklyForecast';
import { fetchCurrentWeather, fetchForecast } from './api';
import './styles/styles.css';

const App = () => {
  const [location, setLocation] = useState('London');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weeklyForecast, setWeeklyForecast] = useState([]);

  useEffect(() => {
    const getWeather = async () => {
      const weatherData = await fetchCurrentWeather(location);
      if (weatherData) {
        setCurrentWeather(weatherData.current);
      } else {
        setCurrentWeather(null);
      }

      const forecastData = await fetchForecast(location);
      if (
        forecastData &&
        forecastData.forecast &&
        forecastData.forecast.forecastday
      ) {
        setWeeklyForecast(forecastData.forecast.forecastday);
      } else {
        setWeeklyForecast([]);
      }
    };

    getWeather();
  }, [location]);

  const handleSearch = newLocation => {
    setLocation(newLocation);
  };

  return (
    <div className="app">
      <Header onSearch={handleSearch} />
      <div className="main-content">
        {currentWeather && (
          <div className="current-weather-container">
            <div className="location-info">
              <h2>{location}</h2>
              <p>{new Date().toLocaleString()}</p>
            </div>
            <div className="current-weather-info">
              <CurrentWeather
                temperature={currentWeather.temp_c}
                icon={currentWeather.condition.icon}
                condition={currentWeather.condition.text}
              />
            </div>
            <div className="more-weather-info">
              <p>Feels like: {currentWeather.feelslike_c}°C</p>
              <p>Wind: {currentWeather.wind_kph} km/h</p>
              <p>Humidity: {currentWeather.humidity}%</p>
              <p>UV index: {currentWeather.uv}</p>
              </div>
          </div>
        )}
        <div className="weekly-forecast-container">
          <h2>Weekly Forecast</h2>
          <WeeklyForecast forecast={weeklyForecast} />
        </div>
      </div>
    </div>
  );
};

export default App;
