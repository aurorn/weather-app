import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import { fetchCurrentWeather, fetchForecast } from './api';
import './styles/styles.css';

const App = () => {
  const [location, setLocation] = useState('New York');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    const getWeather = async () => {
      const weatherData = await fetchCurrentWeather(location);
      const forecastData = await fetchForecast(location);
      setCurrentWeather(weatherData.current);
      setHourlyForecast(forecastData.forecast.forecastday[0].hour);
      setDailyForecast(forecastData.forecast.forecastday);
    };

    getWeather();
  }, [location]);

  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };

  const handleSearch = (newLocation) => {
    setLocation(newLocation);
  };

  return (
    <div className="app">
      <Header onSearch={handleSearch} />
      <div className="main-content">
        {currentWeather && (
          <CurrentWeather
            temperature={currentWeather.temp_c}
            icon={currentWeather.condition.icon}
            condition={currentWeather.condition.text}
          />
        )}
        <HourlyForecast forecast={hourlyForecast} />
        <div className="weather-type-icon">
          {currentWeather && (
            <img src={currentWeather.condition.icon} alt="Weather Icon" />
          )}
        </div>
      </div>
      <DailyForecast forecast={dailyForecast} onDaySelect={handleDaySelect} />
      {selectedDay && (
        <div className="selected-day">
          <h2>{new Date(selectedDay.date).toDateString()}</h2>
          <p>{selectedDay.day.condition.text}</p>
          <p>{selectedDay.day.avgtemp_c}°C</p>
        </div>
      )}
    </div>
  );
};

export default App;
