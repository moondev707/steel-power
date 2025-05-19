import React, { useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

const API_URL = 'http://localhost:3000/power';

const App = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [days, setDays] = useState([]);
  const [type, setType] = useState('Usage_kWh');
  const [view, setView] = useState('list');
  const [stat, setStat] = useState('sum');
  const [loadType, setLoadType] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const metrics = [
    'Usage_kWh',
    'Lagging_Current_Reactive.Power_kVarh',
    'Leading_Current_Reactive_Power_kVarh',
    'CO2(tCO2)',
    'Lagging_Current_Power_Factor',
    'Leading_Current_Power_Factor',
    'NSM'
  ];

  const stats = ['sum', 'mean', 'min', 'max', 'median'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const params = {
        type,
        view,
        stat,
        from,
        to,
        days: days.join(','),
        loadType
      };
      const response = await axios.get(API_URL, { params });
      setResults(response.data);
    } catch (err) {
      setError('Failed to fetch data. Check server and input.');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Steel Industry Power Usage</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input type="date" value={from} onChange={e => setFrom(e.target.value)} placeholder="From" className="p-2 border rounded" />
        <input type="date" value={to} onChange={e => setTo(e.target.value)} placeholder="To" className="p-2 border rounded" />

        <select value={type} onChange={e => setType(e.target.value)} className="p-2 border rounded">
          {metrics.map(m => <option key={m} value={m}>{m}</option>)}
        </select>

        <select value={view} onChange={e => setView(e.target.value)} className="p-2 border rounded">
          <option value="list">List</option>
          <option value="summary">Summary</option>
        </select>

        {view === 'summary' && (
          <select value={stat} onChange={e => setStat(e.target.value)} className="p-2 border rounded">
            {stats.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        )}

        <select value={loadType} onChange={e => setLoadType(e.target.value)} className="p-2 border rounded">
          <option value="">All Load Types</option>
          <option value="Maximum_Load">Maximum_Load</option>
          <option value="Light_Load">Light_Load</option>
        </select>

        <div className="col-span-2">
          <label className="block mb-2 font-semibold">Days of Week:</label>
          <div className="flex flex-wrap gap-2">
            {weekDays.map(day => (
              <label key={day} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={days.includes(day)}
                  onChange={() => setDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day])}
                />
                {day}
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className="col-span-2 bg-blue-600 text-white p-2 rounded mt-4">Fetch Data</button>
      </form>

      {error && <p className="text-red-600">{error}</p>}

      {results && (
        <div className="mt-6">
          {view === 'list' ? (
            <table className="w-full border">
              <thead>
                <tr>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Day</th>
                  <th className="border p-2">{type}</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, idx) => (
                  <tr key={idx}>
                    <td className="border p-2">{r.date}</td>
                    <td className="border p-2">{r.day}</td>
                    <td className="border p-2">{r[type]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-xl font-semibold">{stat} of {type}: {results.result}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
