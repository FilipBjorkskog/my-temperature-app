"use client";

import { useState, useEffect } from 'react';
import TemperatureForm from './components/TemperatureForm';
import TemperatureChart from './components/TemperatureChart';

export default function Home() {
  const initialTemperatures = JSON.parse(localStorage.getItem('temperatures')) || Array(31).fill(0);
  const [temperatures, setTemperatures] = useState(initialTemperatures);

  const handleTemperatureSubmit = (newTemperatures) => {
    setTemperatures(newTemperatures);
  };

  useEffect(() => {
    localStorage.setItem('temperatures', JSON.stringify(temperatures));
  }, [temperatures]);

  return (
    <div>
      <h1>Monthly Temperature Tracker</h1>
      <TemperatureForm onTemperatureSubmit={handleTemperatureSubmit} />
      <TemperatureChart temperatures={temperatures} />
    </div>
  );
}
