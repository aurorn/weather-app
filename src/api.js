const API_KEY = '-';
const BASE_URL = 'https://api.weatherapi.com/v1';

export const fetchCurrentWeather = async (location) => {
  const response = await fetch(
    `${BASE_URL}/current.json?key=${API_KEY}&q=${location}`
  );
  const data = await response.json();
  return data;
};

export const fetchForecast = async (location) => {
  const response = await fetch(
    `${BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=14`
  );
  const data = await response.json();
  return data;
};
