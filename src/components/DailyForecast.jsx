import React from 'react';

const DailyForecast = ({ forecast, onDaySelect }) => (
  <div className="daily-forecast">
    {forecast.map((day, index) => (
      <div key={index} className="day" onClick={() => onDaySelect(day)}>
        <p>{new Date(day.date).toDateString()}</p>
        <img src={day.day.condition.icon} alt="Weather Icon" />
        <p>{day.day.avgtemp_c}°C</p>
      </div>
    ))}
  </div>
);

export default DailyForecast;
