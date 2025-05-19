import React from 'react';

const FilterPanel = ({
  from, to, days, type, view, stat, loadType,
  onFromChange, onToChange, onDaysChange,
  onTypeChange, onViewChange, onStatChange,
  onLoadTypeChange,
  onSubmit,
}) => {
  const dayOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const typeOptions = ['Usage_kWh', 'Lagging_Current_Reactive.Power_kVarh', 'Leading_Current_Reactive_Power_kVarh'];
  const loadTypeOptions = ['Maximum_Load', 'Light_Load'];
  const statOptions = ['sum', 'mean', 'min', 'max', 'median'];

  const handleDaysChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      onDaysChange([...days, value]);
    } else {
      onDaysChange(days.filter(day => day !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ from, to, days, type, loadType, view, stat });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', marginBottom: '20px' }}>
      <div>
        <label>From: </label>
        <input type="date" value={from} onChange={e => onFromChange(e.target.value)} />
        <label style={{ marginLeft: '10px' }}>To: </label>
        <input type="date" value={to} onChange={e => onToChange(e.target.value)} />
      </div>

      <div>
        <label>Day(s) of Week: </label>
        {dayOptions.map(day => (
          <label key={day} style={{ marginRight: '10px' }}>
            <input
              type="checkbox"
              value={day}
              checked={days.includes(day)}
              onChange={handleDaysChange}
            />
            {day}
          </label>
        ))}
      </div>

      <div>
        <label>Consumption Type: </label>
        <select value={type} onChange={e => onTypeChange(e.target.value)}>
          {typeOptions.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Load Type: </label>
        <select value={loadType} onChange={e => onLoadTypeChange(e.target.value)}>
          <option value="">All</option>
          {loadTypeOptions.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div>
        <label>View: </label>
        <select value={view} onChange={e => onViewChange(e.target.value)}>
          <option value="list">List</option>
          <option value="summary">Summary</option>
        </select>
      </div>

      {view === 'summary' && (
        <div>
          <label>Stat: </label>
          <select value={stat} onChange={e => onStatChange(e.target.value)}>
            {statOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      )}

      <button type="submit">Search</button>
    </form>
  );
};

export default FilterPanel;
