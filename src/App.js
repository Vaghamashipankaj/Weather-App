import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = '02fcbd0bc4c92f3513ad1726be58b861'; // Replace with your OpenWeatherMap API key

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
        setError('');
      } else {
        setWeatherData(null);
        setError(data.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <p className="error">{error}</p>}
      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>{weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
      <footer>
        <p>&copy; {new Date().getFullYear()} Nilesh Talsaniya</p>
      </footer>
    </div>
  );
}

export default App;
