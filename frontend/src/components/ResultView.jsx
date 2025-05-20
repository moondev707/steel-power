import React from 'react';
import styled from 'styled-components';

const SummaryBox = styled.div`
  padding: 1rem;
  background-color: #f3f3f3;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const Heading = styled.h3`
  margin-bottom: 0.5rem;
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background-color: #e0e0e0;
  padding: 0.75rem;
  border: 1px solid #ccc;
  text-align: left;
`;

const Td = styled.td`
  padding: 0.75rem;
  border: 1px solid #ccc;
`;

const ResultView = ({ data, view, type, loadType, stat }) => {
  if (!data) return null;

  if (view === 'summary') {
    return (
      <SummaryBox>
        <Heading>Summary</Heading>
        <p><strong>Type:</strong> {type}</p>
        <p><strong>Stat:</strong> {stat}</p>
        <p><strong>Result:</strong> {data.result}</p>
      </SummaryBox>
    );
  }

  // Defensive check
  if (!Array.isArray(data)) {
    return <p>No data available to display as a list.</p>;
  }

  return (
    <div>
      <Heading>Data List</Heading>
      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              <Th>Date</Th>
              <Th>Day</Th>
              <Th>{type}</Th>
              <Th>Load Type</Th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                <Td>{row.date}</Td>
                <Td>{row.day}</Td>
                <Td>{row[type]}</Td>
                <Td>{row.loadType}</Td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>
    </div>
  );
};

export default ResultView;
