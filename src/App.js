


// import React, { useEffect, useState, useCallback } from 'react';
// import axios from 'axios';
// import WeatherToday from './components/WeatherToday';
// import WeatherWeekly from './components/WeatherWeekly.';
// import SearchBar from './components/SearchBar';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; 
// import 'leaflet/dist/leaflet.css'; 
// import L from 'leaflet'; 

// import './App.css';
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//   iconUrl: require('leaflet/dist/images/marker-icon.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
// });

// const App = () => {
//   const [weatherData, setWeatherData] = useState(null);
//   const [weeklyData, setWeeklyData] = useState([]);
//   const [city, setCity] = useState('Kakinada'); 
//   const [loading, setLoading] = useState(true); 
//   const [error, setError] = useState(null); 
//   const [isMobile, setIsMobile] = useState(false);
//   const [cityCoordinates, setCityCoordinates] = useState([0, 0]); 
//   const [currentCity, setCurrentCity] = useState(''); // New state for current city

//   // Function to fetch weather data using city name
//   const fetchWeatherDataByCity = async (cityName) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const apiKey = 'cbb4cbcd3a35d7abddd827cf13751700';

//       // Fetch current weather data
//       const currentWeatherRes = await axios.get(
//         `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
//       );
//       setWeatherData(currentWeatherRes.data);
//       const coords = [currentWeatherRes.data.coord.lat, currentWeatherRes.data.coord.lon];
//       setCityCoordinates(coords); // Update coordinates based on city
//       setCurrentCity(cityName); // Set current city

//       // Fetch 5-day forecast data
//       const forecastRes = await axios.get(
//         `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${apiKey}`
//       );

//       // Process forecast data to extract daily forecast
//       const dailyForecast = forecastRes.data.list
//         .filter((item) => item.dt_txt.includes('12:00:00'))
//         .map((item) => {
//           const date = new Date(item.dt_txt);
//           return {
//             day: date.toLocaleDateString('en-US', { weekday: 'short' }),
//             date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
//             temp: item.main.temp,
//             weather: item.weather[0].main,
//             icon: item.weather[0].icon,
//           };
//         });

//       setWeeklyData(dailyForecast);
//     } catch (error) {
//       console.error('Error fetching weather data:', error);
//       setError('Please check the city name.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Get the user's current location
//   const getUserLocation = useCallback(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           fetchWeatherDataByCoords(latitude, longitude); // Fetch weather by current location
//         },
//         (error) => {
//           console.error('Error getting location:', error);
//           fetchWeatherDataByCity('Kakinada'); // Fall back to default city if location access is denied
//         }
//       );
//     } else {
//       fetchWeatherDataByCity('Kakinada'); // Fall back to default city if Geolocation is not supported
//     }
//   }, []);

//   // Fetch weather data when the component mounts
//   useEffect(() => {
//     getUserLocation(); // Try fetching location first
//   }, [getUserLocation]);

//   // Function to fetch weather data using latitude and longitude
//   const fetchWeatherDataByCoords = async (lat, lon) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const apiKey = 'cbb4cbcd3a35d7abddd827cf13751700';

//       // Fetch current weather data using coordinates
//       const currentWeatherRes = await axios.get(
//         `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
//       );
//       setWeatherData(currentWeatherRes.data);
//       const coords = [lat, lon];
//       setCityCoordinates(coords); // Update coordinates based on user location
//       setCurrentCity(currentWeatherRes.data.name); // Set current city

//       // Fetch 5-day forecast data
//       const forecastRes = await axios.get(
//         `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
//       );

//       const dailyForecast = forecastRes.data.list
//         .filter((item) => item.dt_txt.includes('12:00:00'))
//         .map((item) => {
//           const date = new Date(item.dt_txt);
//           return {
//             day: date.toLocaleDateString('en-US', { weekday: 'short' }),
//             date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
//             temp: item.main.temp,
//             weather: item.weather[0].main,
//             icon: item.weather[0].icon,
//           };
//         });

//       setWeeklyData(dailyForecast);
//     } catch (error) {
//       console.error('Error fetching weather data by coordinates:', error);
//       setError('Failed to get weather for your location.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize(); // Check initial screen size on load

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const handleSearch = (cityName) => {
//     fetchWeatherDataByCity(cityName); // Fetch weather data based on city search
//   };

//   return (
//     <div className="weather-app"
//       style={{
//         height: isMobile ? '230vh' : '130vh',
//         background: 'linear-gradient(180deg, #1C3F94 0%, #87CEFA 100%)',
//         padding: '20px',
//       }}>
//       <SearchBar onSearch={handleSearch} /> 

//       {loading && <p>Loading...</p>} 
//       {error && <p className="error-message">{error}</p>} 
      
//       {weatherData && <WeatherToday weatherData={weatherData} isMobile={isMobile} />}
//       {weeklyData.length > 0 && <WeatherWeekly weeklyData={weeklyData} isMobile={isMobile} />}

//       {/* Leaflet Map Component */}
//       <MapContainer center={cityCoordinates} zoom={10} style={{ height: '400px', width: '100%' }}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <Marker position={cityCoordinates}>
//           <Popup>{currentCity || city}</Popup> {/* Display the current city name in the popup */}
//         </Marker>
//       </MapContainer>

//     </div>
//   );
// };

// export default App;

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import WeatherToday from './components/WeatherToday';
import WeatherWeekly from './components/WeatherWeekly.';
import SearchBar from './components/SearchBar';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // Import Leaflet components
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import L from 'leaflet'; // Import Leaflet for marker icon

import './App.css';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [weeklyData, setWeeklyData] = useState([]);
  const [city, setCity] = useState('Kakinada'); 
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [isMobile, setIsMobile] = useState(false);
  const [cityCoordinates, setCityCoordinates] = useState([0, 0]);
  const [mapZoom, setMapZoom] = useState(2); // Set a default zoom level

  // Function to fetch weather data using city name
  const fetchWeatherDataByCity = async (cityName) => {
    try {
      setLoading(true); // Start loading
      setError(null); // Reset error state
      const apiKey = 'cbb4cbcd3a35d7abddd827cf13751700'; // Replace with your API key

      // Fetch current weather data
      const currentWeatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
      );
      setWeatherData(currentWeatherRes.data);
      const lat = currentWeatherRes.data.coord.lat;
      const lon = currentWeatherRes.data.coord.lon;
      setCityCoordinates([lat, lon]); // Set city coordinates

      // Set zoom level based on city coordinates
      setMapZoom(8); // Set higher zoom level for the city

      // Fetch 5-day forecast data
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${apiKey}`
      );

      // Process forecast data to extract daily forecast
      const dailyForecast = forecastRes.data.list
        .filter((item) => item.dt_txt.includes('12:00:00')) // Filter for mid-day forecasts
        .map((item) => {
          const date = new Date(item.dt_txt);
          return {
            day: date.toLocaleDateString('en-US', { weekday: 'short' }),
            date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), // Full date
            temp: item.main.temp,
            weather: item.weather[0].main,
            icon: item.weather[0].icon,
          };
        });

      setWeeklyData(dailyForecast);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Please check the city name.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Get the user's current location
  const getUserLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherDataByCoords(latitude, longitude); // Fetch weather by current location
        },
        (error) => {
          console.error('Error getting location:', error);
          fetchWeatherDataByCity('Kakinada'); // Fall back to default city if location access is denied
        }
      );
    } else {
      fetchWeatherDataByCity('Kakinada'); // Fall back to default city if Geolocation is not supported
    }
  }, []);

  // Function to fetch weather data using latitude and longitude
  const fetchWeatherDataByCoords = async (lat, lon) => {
    try {
      setLoading(true); // Start loading
      setError(null); // Reset error state
      const apiKey = 'cbb4cbcd3a35d7abddd827cf13751700'; // Replace with your API key

      // Fetch current weather data using coordinates
      const currentWeatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );
      setWeatherData(currentWeatherRes.data);
      setCityCoordinates([lat, lon]); // Set coordinates to current location

      // Set zoom level for current location
      setMapZoom(8); // Higher zoom for better clarity

      // Fetch 5-day forecast data
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );

      // Process forecast data to extract daily forecast
      const dailyForecast = forecastRes.data.list
        .filter((item) => item.dt_txt.includes('12:00:00')) // Filter for mid-day forecasts
        .map((item) => {
          const date = new Date(item.dt_txt);
          return {
            day: date.toLocaleDateString('en-US', { weekday: 'short' }),
            date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), // Full date
            temp: item.main.temp,
            weather: item.weather[0].main,
            icon: item.weather[0].icon,
          };
        });

      setWeeklyData(dailyForecast);
    } catch (error) {
      console.error('Error fetching weather data by coordinates:', error);
      setError('Failed to get weather for your location.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch weather data when the component mounts
  useEffect(() => {
    getUserLocation(); // Try fetching location first
  }, [getUserLocation]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Consider mobile if screen width <= 768px
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check initial screen size on load

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearch = (cityName) => {
    setCity(cityName); // Update the city state
    fetchWeatherDataByCity(cityName); // Fetch weather data based on city search
  };

  return (
    <div className="weather-app"
      style={{
        height: isMobile ? '230vh' : '130vh', // Different height for mobile and desktop
        background: 'linear-gradient(180deg, #1C3F94 0%, #87CEFA 100%)', // Background gradient
        padding: '20px', // Optional: padding around content
      }}>
      <SearchBar onSearch={handleSearch} /> {/* Search bar is here */}
      
      {loading && <p>Loading...</p>} {/* Display loading state */}
      {error && <p className="error-message">{error}</p>} {/* Display error message */}
      
      {weatherData && <WeatherToday weatherData={weatherData} isMobile={isMobile} />}
      {weeklyData.length > 0 && <WeatherWeekly weeklyData={weeklyData} isMobile={isMobile} />}
      
      {/* Leaflet Map Component */}
      <MapContainer
        center={cityCoordinates}
        zoom={mapZoom} // Use dynamic zoom level
        style={{ height: '400px', width: '100%' }}
        scrollWheelZoom={false} // Disable scroll wheel zoom
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={cityCoordinates}>
          <Popup>{city}</Popup> {/* Display the city name in the popup */}
        </Marker>
      </MapContainer>
    </div>
  );
};

export default App;
