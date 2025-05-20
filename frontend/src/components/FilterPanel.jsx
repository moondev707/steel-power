import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: grid;
  gap: 10px;
  margin-bottom: 20px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
`;

const Label = styled.label`
  margin-right: 10px;
`;

const CheckboxLabel = styled.label`
  margin-right: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Select = styled.select`
  padding: 5px;
`;

const Input = styled.input`
  padding: 5px;
`;

const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  font-weight: bold;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #1565c0;
  }
`;

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
    <Form className="filter-panel" onSubmit={handleSubmit}>
      <Row>
        <Label>From:</Label>
        <Input type="date" value={from} onChange={e => onFromChange(e.target.value)} />
        <Label>To:</Label>
        <Input type="date" value={to} onChange={e => onToChange(e.target.value)} />
      </Row>

      <Row>
        <Label>Day(s) of Week:</Label>
        {dayOptions.map(day => (
          <CheckboxLabel key={day}>
            <input
              type="checkbox"
              value={day}
              checked={days.includes(day)}
              onChange={handleDaysChange}
            />
            {day}
          </CheckboxLabel>
        ))}
      </Row>

      <Row>
        <Label>Consumption Type:</Label>
        <Select value={type} onChange={e => onTypeChange(e.target.value)}>
          {typeOptions.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </Select>
      </Row>

      <Row>
        <Label>Load Type:</Label>
        <Select value={loadType} onChange={e => onLoadTypeChange(e.target.value)}>
          <option value="">All</option>
          {loadTypeOptions.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </Select>
      </Row>

      <Row>
        <Label>View:</Label>
        <Select value={view} onChange={e => onViewChange(e.target.value)}>
          <option value="list">List</option>
          <option value="summary">Summary</option>
        </Select>
      </Row>

      {view === 'summary' && (
        <Row>
          <Label>Stat:</Label>
          <Select value={stat} onChange={e => onStatChange(e.target.value)}>
            {statOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </Select>
        </Row>
      )}

      <SubmitButton type="submit">Search</SubmitButton>
    </Form>
  );
};

export default FilterPanel;
