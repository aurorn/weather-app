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
  const [country, setCountry] = useState('');
  const [unit, setUnit] = useState('C');
  const [backgroundGradient, setBackgroundGradient] = useState('');

  const weatherGradients = {
    1000: 'linear-gradient(to right, #2980B9, #6DD5FA)', // Clear
    1003: 'linear-gradient(to right, #bdc3c7, #2c3e50)', // Partly cloudy
    1006: 'linear-gradient(to right, #4b79a1, #283e51)', // Cloudy
    1009: 'linear-gradient(to right, #485563, #29323c)', // Overcast
    1030: 'linear-gradient(to right, #757F9A, #D7DDE8)', // Mist
    1063: 'linear-gradient(to right, #83a4d4, #b6fbff)', // Patchy rain possible
    1066: 'linear-gradient(to right, #e0eafc, #cfdef3)', // Patchy snow possible
    1069: 'linear-gradient(to right, #bdc3c7, #2c3e50)', // Patchy sleet possible
    1072: 'linear-gradient(to right, #bdc3c7, #e6e9f0)', // Patchy freezing drizzle possible
    1087: 'linear-gradient(to right, #283048, #859398)', // Thundery outbreaks possible
    1114: 'linear-gradient(to right, #e0eafc, #bbd2c5)', // Blowing snow
    1117: 'linear-gradient(to right, #e0eafc, #d7e1ec)', // Blizzard
    1135: 'linear-gradient(to right, #757F9A, #D7DDE8)', // Fog
    1147: 'linear-gradient(to right, #757F9A, #d7e1ec)', // Freezing fog
    1150: 'linear-gradient(to right, #83a4d4, #b6fbff)', // Patchy light drizzle
    1153: 'linear-gradient(to right, #83a4d4, #b6fbff)', // Light drizzle
    1168: 'linear-gradient(to right, #bdc3c7, #e6e9f0)', // Freezing drizzle
    1171: 'linear-gradient(to right, #bdc3c7, #e6e9f0)', // Heavy freezing drizzle
    1180: 'linear-gradient(to right, #83a4d4, #b6fbff)', // Patchy light rain
    1183: 'linear-gradient(to right, #83a4d4, #b6fbff)', // Light rain
    1186: 'linear-gradient(to right, #4b79a1, #283e51)', // Moderate rain at times
    1189: 'linear-gradient(to right, #4b79a1, #283e51)', // Moderate rain
    1192: 'linear-gradient(to right, #283048, #859398)', // Heavy rain at times
    1195: 'linear-gradient(to right, #283048, #859398)', // Heavy rain
    1198: 'linear-gradient(to right, #bdc3c7, #e6e9f0)', // Light freezing rain
    1201: 'linear-gradient(to right, #bdc3c7, #e6e9f0)', // Moderate or heavy freezing rain
    1204: 'linear-gradient(to right, #bdc3c7, #e6e9f0)', // Light sleet
    1207: 'linear-gradient(to right, #bdc3c7, #2c3e50)', // Moderate or heavy sleet
    1210: 'linear-gradient(to right, #e0eafc, #cfdef3)', // Patchy light snow
    1213: 'linear-gradient(to right, #e0eafc, #cfdef3)', // Light snow
    1216: 'linear-gradient(to right, #e0eafc, #bbd2c5)', // Patchy moderate snow
    1219: 'linear-gradient(to right, #e0eafc, #bbd2c5)', // Moderate snow
    1222: 'linear-gradient(to right, #e0eafc, #d7e1ec)', // Patchy heavy snow
    1225: 'linear-gradient(to right, #e0eafc, #d7e1ec)', // Heavy snow
    1237: 'linear-gradient(to right, #bdc3c7, #e6e9f0)', // Ice pellets
    1240: 'linear-gradient(to right, #83a4d4, #b6fbff)', // Light rain shower
    1243: 'linear-gradient(to right, #4b79a1, #283e51)', // Moderate or heavy rain shower
    1246: 'linear-gradient(to right, #283048, #859398)', // Torrential rain shower
    1249: 'linear-gradient(to right, #bdc3c7, #e6e9f0)', // Light sleet showers
    1252: 'linear-gradient(to right, #bdc3c7, #2c3e50)', // Moderate or heavy sleet showers
    1255: 'linear-gradient(to right, #e0eafc, #cfdef3)', // Light snow showers
    1258: 'linear-gradient(to right, #e0eafc, #d7e1ec)', // Moderate or heavy snow showers
    1261: 'linear-gradient(to right, #bdc3c7, #e6e9f0)', // Light showers of ice pellets
    1264: 'linear-gradient(to right, #bdc3c7, #e6e9f0)', // Moderate or heavy showers of ice pellets
    1273: 'linear-gradient(to right, #283048, #859398)', // Patchy light rain with thunder
    1276: 'linear-gradient(to right, #283048, #859398)', // Moderate or heavy rain with thunder
    1279: 'linear-gradient(to right, #e0eafc, #d7e1ec)', // Patchy light snow with thunder
    1282: 'linear-gradient(to right, #e0eafc, #d7e1ec)', // Moderate or heavy snow with thunder
  };

  useEffect(() => {
    const getWeather = async () => {
      const weatherData = await fetchCurrentWeather(location);
      if (weatherData) {
        setCurrentWeather(weatherData.current);
        setLocalTime(weatherData.location.localtime);
        setLocation(weatherData.location.name);
        setCountry(weatherData.location.country);
        setBackgroundGradient(
          weatherGradients[weatherData.current.condition.code]
        );
      } else {
        setCurrentWeather(null);
        setLocalTime('');
        setCountry('');
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

  const handleUnitChange = newUnit => {
    setUnit(newUnit);
  };

  const capitalizePlace = place => {
    return place
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const convertTemperature = tempC => {
    return unit === 'C' ? tempC : (tempC * 9) / 5 + 32;
  };

  return (
    <div className="app">
      <Header
        onSearch={handleSearch}
        onUnitChange={handleUnitChange}
        unit={unit}
      />
      <div className="main-content">
        {currentWeather && (
          <>
            <div
              className="current-weather-container"
              style={{ background: backgroundGradient }}
            >
              <div className="location-info">
                <h2>
                  {capitalizePlace(location)}, {country}
                </h2>
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
                  <p>
                    {convertTemperature(currentWeather.temp_c)}°{unit}
                  </p>
                </div>
                <div className="grid-item">
                  <p>Feels Like:</p>
                  <p>
                    {convertTemperature(currentWeather.feelslike_c)}°{unit}
                  </p>
                </div>
                <div className="grid-item">
                  <p>Humidity:</p>
                  <p>{currentWeather.humidity}%</p>
                </div>
                <div className="grid-item">
                  <p>Wind Speed:</p>
                  <p>
                    {unit === 'C'
                      ? currentWeather.wind_kph
                      : (currentWeather.wind_kph / 1.609).toFixed(2)}{' '}
                    {unit === 'C' ? 'km/h' : 'mph'}
                  </p>
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
          <WeeklyForecast
            forecast={weeklyForecast}
            unit={unit}
            convertTemperature={convertTemperature}
          />
        </div>
      </div>
      <footer className="footer">
        Made by Aurorn
      </footer>
    </div>
  );
};

export default App;
