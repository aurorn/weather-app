import React, { useState, useEffect, useRef } from 'react';
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
  const hourlyRef = useRef(null);
  const dailyRef = useRef(null);

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

  const addDragScroll = (ref) => {
    let isDown = false;
    let startX;
    let scrollLeft;

    ref.current.addEventListener('mousedown', (e) => {
      isDown = true;
      ref.current.classList.add('active');
      startX = e.pageX - ref.current.offsetLeft;
      scrollLeft = ref.current.scrollLeft;
    });

    ref.current.addEventListener('mouseleave', () => {
      isDown = false;
      ref.current.classList.remove('active');
    });

    ref.current.addEventListener('mouseup', () => {
      isDown = false;
      ref.current.classList.remove('active');
    });

    ref.current.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - ref.current.offsetLeft;
      const walk = (x - startX) * 1; 
      ref.current.scrollLeft = scrollLeft - walk;
    });
  };

  useEffect(() => {
    addDragScroll(hourlyRef);
    addDragScroll(dailyRef);
  }, []);

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
        <div className="hourly-forecast-container">
          <div className="hourly-forecast" ref={hourlyRef}>
            <HourlyForecast forecast={hourlyForecast} />
          </div>
        </div>
        <div className="location-info">
          <h2>{location}</h2>
        </div>
      </div>
      <div className="daily-forecast-container">
        <div className="daily-forecast" ref={dailyRef}>
          <DailyForecast 
            forecast={dailyForecast} 
            onDaySelect={handleDaySelect} 
            location={location} 
          />
        </div>
      </div>
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
