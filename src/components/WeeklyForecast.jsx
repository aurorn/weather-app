import React from 'react';

const WeeklyForecast = ({ forecast }) => (
  <div className="weekly-forecast">
    {forecast.slice(0, 7).map((day, index) => (
      <div key={index} className="day">
        <p>{new Date(day.date).toLocaleDateString()}</p>
        <img src={day.day.condition.icon} alt="Weather Icon" />
        <p>{day.day.avgtemp_c}°C</p>
        <p>{day.day.daily_chance_of_rain}%</p>
      </div>
    ))}
  </div>
);

export default WeeklyForecast;
