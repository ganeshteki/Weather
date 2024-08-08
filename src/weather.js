import React, { useState, useEffect } from 'react';
import axios from 'axios';

const styles = {
  container: {
    textAlign: 'center',
    maxWidth: '90%',
    margin: '0 auto',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '10px',
    width: '80%',
    maxWidth: '300px',
  },
  button: {
    padding: '10px',
    marginLeft: '10px',
    borderRadius: '4px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  message: {
    fontSize: '18px',
    color: '#333',
  },
  weatherContainer: {
    textAlign: 'center',
  },
  cityName: {
    fontSize: '24px',
    margin: '10px 0',
  },
  weatherDescription: {
    fontSize: '18px',
    textTransform: 'capitalize',
  },
  temperature: {
    fontSize: '20px',
    margin: '10px 0',
  },
  weatherIcon: {
    width: '100px',
    height: '100px',
    filter: 'invert(48%) sepia(78%) saturate(3892%) hue-rotate(357deg) brightness(100%) contrast(107%)', 
  },
};
const WeatherWidget = () => {
  const [city, setCity] = useState('New York'); // Default city
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiKey = '60536e28cab137e62404de2d9a358f74';
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        setWeather(response.data);
      } catch (error) {
        setError('Error fetching weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Fetch new weather data when form is submitted
  };

  return (
    <div style={{ textAlign: 'center', maxWidth: '300px', margin: '0 auto' }}>
      <h1 style={styles.heading}>WEATHER REPORT</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city"
          style={{ padding: '8px', fontSize: '16px' }}
        />
        <button type="submit" style={{ padding: '8px', marginLeft: '8px' }}>
          Get Weather
        </button>
      </form>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : weather ? (
        <div>
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <img
            src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
            alt="weather icon"
          />
        </div>
      ) : null}
    </div>
  );
};

  
export default WeatherWidget;

