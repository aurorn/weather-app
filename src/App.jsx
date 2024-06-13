import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';
import WeeklyForecast from './components/WeeklyForecast';
import { fetchCurrentWeather, fetchForecast } from './api';
import './styles/styles.css';
import './components/MoreWeatherInfo.jsx';

const App = () => {
  const [location, setLocation] = useState('London');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weeklyForecast, setWeeklyForecast] = useState([]);
  const [localTime, setLocalTime] = useState('');
  const [unit, setUnit] = useState('C');

  useEffect(() => {
    const getWeather = async () => {
      const weatherData = await fetchCurrentWeather(location);
      if (weatherData) {
        setCurrentWeather(weatherData.current);
        setLocalTime(weatherData.location.localtime);
      } else {
        setCurrentWeather(null);
        setLocalTime('');
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

  const handleSearch = (newLocation) => {
    setLocation(newLocation);
  };

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
  };

  const convertTemperature = (tempC) => {
    return unit === 'C' ? tempC : (tempC * 9 / 5) + 32;
  };

  return (
    <div className="app">
      <Header onSearch={handleSearch} onUnitChange={handleUnitChange} unit={unit} />
      <div className="main-content">
        {currentWeather && (
          <>
            <div className="current-weather-container">
              <div className="location-info">
                <h2>{location}</h2>
                <p>{localTime}</p>
              </div>
              <div className="current-weather-info">
                <CurrentWeather
                  temperature={convertTemperature(currentWeather.temp_c)}
                  icon={currentWeather.condition.icon}
                  condition={currentWeather.condition.text}
                  unit={unit}
                />
              </div>
            </div>
            <div className="more-weather-info">
              <div className="more-weather-info-grid">
                <div className="grid-item">
                  <p>Temperature:</p>
                  <p>{convertTemperature(currentWeather.temp_c)}°{unit}</p>
                </div>
                <div className="grid-item">
                  <p>Feels Like:</p>
                  <p>{convertTemperature(currentWeather.feelslike_c)}°{unit}</p>
                </div>
                <div className="grid-item">
                  <p>Humidity:</p>
                  <p>{currentWeather.humidity}%</p>
                </div>
                <div className="grid-item">
                  <p>Wind Speed:</p>
                  <p>{unit === 'C' ? currentWeather.wind_kph : (currentWeather.wind_kph / 1.609).toFixed(2)} {unit === 'C' ? 'km/h' : 'mph'}</p>
                </div>
                <div className="grid-item">
                  <p>Wind Direction:</p>
                  <p>{currentWeather.wind_dir}</p>
                </div>
                <div className="grid-item">
                  <p>Pressure:</p>
                  <p>{currentWeather.pressure_mb} mb</p>
                </div>
                <div className="grid-item">
                  <p>UV Index:</p>
                  <p>{currentWeather.uv}</p>
                </div>
                <div className="grid-item">
                  <p>Precipitation:</p>
                  <p>{currentWeather.precip_mm} mm</p>
                </div>
                <div className="grid-item">
                  <p>Visibility:</p>
                  <p>{currentWeather.vis_km} km</p>
                </div>
              </div>
            </div>
          </>
        )}
        <div className="weekly-forecast-container">
          <h2>Weekly Forecast</h2>
          <WeeklyForecast forecast={weeklyForecast} unit={unit} convertTemperature={convertTemperature} />
        </div>
      </div>
    </div>
  );
};

export default App;
