import React from 'react';

const HourlyForecast = ({ forecast }) => (
  <div className="hourly-forecast">
    {forecast.map((hour, index) => (
      <div key={index} className="hour">
        <p>{new Date(hour.time).getHours()}:00</p>
        <img src={hour.condition.icon} alt="Weather Icon" />
        <p>{hour.temp_c}°C</p>
      </div>
    ))}
  </div>
);

export default HourlyForecast;
