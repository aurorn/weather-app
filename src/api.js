const API_KEY = '09759ee6939c4f5cbd9190341240606';
const BASE_URL = 'https://api.weatherapi.com/v1';

export const fetchCurrentWeather = async (location) => {
  const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=09759ee6939c4f5cbd9190341240606&q=${location}`);
  const data = await response.json();
  return data;
};

export const fetchForecast = async (location) => {
  const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=09759ee6939c4f5cbd9190341240606&q=${location}&days=8`);
  const data = await response.json();
  return data;
};
