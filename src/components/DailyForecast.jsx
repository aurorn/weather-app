import React from 'react';

const DailyForecast = ({ forecast, onDaySelect, location }) => (
  <>
    <h2>{location}</h2>
    {forecast.map((day, index) => (
      <div key={index} className="day" onClick={() => onDaySelect(day)}>
        <p>{new Date(day.date).toDateString()}</p>
        <img src={day.day.condition.icon} alt="Weather Icon" />
        <p>{day.day.avgtemp_c}°C</p>
      </div>
    ))}
  </>
);

export default DailyForecast;
