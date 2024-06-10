import React from 'react';

const CurrentWeather = ({ temperature, icon, condition }) => (
  <div className="current-weather">
    <img src={icon} alt="Weather Icon" />
    <p>{temperature}°C</p>
    <p>{condition}</p>
  </div>
);

export default CurrentWeather;
