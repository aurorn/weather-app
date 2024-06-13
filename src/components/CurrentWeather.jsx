import React from 'react';

const CurrentWeather = ({ temperature, icon, condition, unit }) => (
  <div className="current-weather">
    <img src={icon} alt="Weather Icon" />
    <p>
      {temperature}°{unit}
    </p>
    <p>{condition}</p>
  </div>
);

export default CurrentWeather;
