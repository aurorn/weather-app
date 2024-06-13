import React from 'react';
import './MoreWeatherInfo.jsx';

const MoreWeatherInfo = ({ weatherData }) => {
  return (
    <div className="more-weather-info-grid">
      <div className="grid-item">
        <p>Temperature:</p>
        <p>{weatherData.temp_c}°C</p>
      </div>
      <div className="grid-item">
        <p>Feels Like:</p>
        <p>{weatherData.feelslike_c}°C</p>
      </div>
      <div className="grid-item">
        <p>Humidity:</p>
        <p>{weatherData.humidity}%</p>
      </div>
      <div className="grid-item">
        <p>Wind Speed:</p>
        <p>{weatherData.wind_kph} km/h</p>
      </div>
      <div className="grid-item">
        <p>Wind Direction:</p>
        <p>{weatherData.wind_dir}</p>
      </div>
      <div className="grid-item">
        <p>Pressure:</p>
        <p>{weatherData.pressure_mb} mb</p>
      </div>
      <div className="grid-item">
        <p>UV Index:</p>
        <p>{weatherData.uv}</p>
      </div>
      <div className="grid-item">
        <p>Precipitation:</p>
        <p>{weatherData.precip_mm} mm</p>
      </div>
      <div className="grid-item">
        <p>Visibility:</p>
        <p>{weatherData.vis_km} km</p>
      </div>
    </div>
  );
};

export default MoreWeatherInfo;
