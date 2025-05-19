const ResultView = ({ data, view, type, loadType, stat }) => {
  console.log('ResultView data:', data);
  if (!data) return null;

  if (view === 'summary') {
    return (
      <div style={{ padding: '1rem', backgroundColor: '#f3f3f3', borderRadius: '8px' }}>
        <h3>Summary</h3>
        <p><strong>Type:</strong> {type}</p>
        <p><strong>Stat:</strong> {stat}</p>
        <p><strong>Result:</strong> {data.result}</p>
      </div>
    );
  }

  // Defensive check before mapping:
  if (!Array.isArray(data)) {
    return <p>No data available to display as a list.</p>;
  }

  return (
    <div>
      <h3>Data List</h3>
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Day</th>
            <th>{type}</th>
            <th>Load Type</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              <td>{row.date}</td>
              <td>{row.day}</td>
              <td>{row[type]}</td>
              <td>{row.loadType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultView;
