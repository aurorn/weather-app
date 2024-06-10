import React, { useEffect, useRef } from 'react';

const HourlyForecast = ({ forecast }) => {
  const forecastRef = useRef(null);

  useEffect(() => {
    const forecastContainer = forecastRef.current;
    const handleScroll = () => {
      if (forecastContainer.scrollLeft === 0) {
        forecastContainer.scrollLeft = forecastContainer.scrollWidth / 2;
      } else if (forecastContainer.scrollLeft >= forecastContainer.scrollWidth / 2) {
        forecastContainer.scrollLeft = forecastContainer.scrollWidth / 4;
      }
    };

    forecastContainer.addEventListener('scroll', handleScroll);

    return () => {
      forecastContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const duplicatedForecast = [...forecast, ...forecast]; // Duplicate the forecast items

  return (
    <div className="hourly-forecast" ref={forecastRef}>
      {duplicatedForecast.map((hour, index) => (
        <div key={index} className="hour">
          <p>{new Date(hour.time).getHours()}:00</p>
          <img src={hour.condition.icon} alt="Weather Icon" />
          <p>{hour.temp_c}°C</p>
        </div>
      ))}
    </div>
  );
};

export default HourlyForecast;
