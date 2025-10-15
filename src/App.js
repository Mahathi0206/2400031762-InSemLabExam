import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const getWeather = async () => {
    if (!city) {
      setError('Please enter a city name.');
      return;
    }

    try {
      const response = await fetch(`https://wttr.in/${city}?format=j1`);
      if (!response.ok) throw new Error('Failed to fetch weather');
      const data = await response.json();

      setWeather({
        location: city,
        tempC: data.current_condition[0].temp_C,
        description: data.current_condition[0].weatherDesc[0].value,
      });
      setError('');
    } catch (err) {
      setError('Could not fetch weather data.');
      setWeather(null);
    }
  };

  return (
    <div className="App">
      <h1>Simple Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: '20px' }}>
          <h2>Weather in {weather.location}</h2>
          <p>Temperature: {weather.tempC}°C</p>
          <p>Condition: {weather.description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
