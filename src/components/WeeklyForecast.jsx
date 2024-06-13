import React from 'react';

const formatDate = dateString => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', options).format(date);
};

const WeeklyForecast = ({ forecast }) => (
  <div className="weekly-forecast">
    {forecast.slice(1, 8).map((day, index) => (
      <div key={index} className="day">
        <p>{formatDate(day.date)}</p>
        <img src={day.day.condition.icon} alt="Weather Icon" />
        <p>{day.day.avgtemp_c}°C</p>
        <p>{day.day.daily_chance_of_rain}%</p>
      </div>
    ))}
  </div>
);

export default WeeklyForecast;
