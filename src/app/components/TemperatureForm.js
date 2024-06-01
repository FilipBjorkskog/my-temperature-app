"use client";

import { useState, useEffect } from 'react';

const TemperatureForm = ({ onTemperatureSubmit }) => {
  const initialTemperatures = JSON.parse(localStorage.getItem('temperatures')) || Array(31).fill('');
  const [temperatures, setTemperatures] = useState(initialTemperatures);
  const [selectedDay, setSelectedDay] = useState(0);
  const [temperature, setTemperature] = useState(initialTemperatures[0] || '');

  useEffect(() => {
    localStorage.setItem('temperatures', JSON.stringify(temperatures));
  }, [temperatures]);

  const handleDayChange = (e) => {
    const day = parseInt(e.target.value, 10);
    setSelectedDay(day);
    setTemperature(temperatures[day] || '');
  };

  const handleTemperatureChange = (e) => {
    setTemperature(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTemperatures = [...temperatures];
    newTemperatures[selectedDay] = temperature;
    setTemperatures(newTemperatures);
    onTemperatureSubmit(newTemperatures.map(temp => parseFloat(temp) || 0));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Select Day:</label>
        <select value={selectedDay} onChange={handleDayChange}>
          {Array.from({ length: 31 }, (_, i) => (
            <option key={i} value={i}>
              Day {i + 1}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Temperature for Day {selectedDay + 1}:</label>
        <input
          type="number"
          value={temperature}
          onChange={handleTemperatureChange}
        />
      </div>
      <button type="submit">Submit Temperature</button>
    </form>
  );
};

export default TemperatureForm;
