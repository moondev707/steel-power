const express = require('express');
const cors = require('cors');
const fs = require('fs');
const csv = require('csv-parser');
const moment = require('moment');

const app = express();
const PORT = 3001;

app.use(cors());

let data = [];

// Load CSV data once when the server starts
fs.createReadStream('data/Steel_industry_data.csv')
  .pipe(csv({
    mapHeaders: ({ header }) => header.trim().replace(/^\uFEFF/, '') // Remove BOM
  }))
  .on('data', (row) => {
    const rawDate = row['date']?.trim();
    const parsedDate = moment(rawDate, 'DD/MM/YYYY HH:mm', true);

    if (!parsedDate.isValid()) {
      console.log('Invalid date found:', rawDate);
      return;
    }

    row['date'] = parsedDate.format('YYYY-MM-DD HH:mm');
    row['day'] = parsedDate.format('dddd');
    data.push(row);
  })
  .on('end', () => {
    console.log(`CSV file successfully processed. Total rows: ${data.length}`);
  });

// Utility: Filter the data based on query parameters
function filterData({
from,
to,
days,
type,
loadType,
}) {
return data.filter((row) => {
    
    const date = moment(row.date, 'YYYY-MM-DD');
    const dayOfWeek = date.format('dddd'); // e.g., "Monday"
    
    // Apply date filter
    if (from && date.isBefore(moment(from))) return false;
    if (to && date.isAfter(moment(to))) return false;

    // Apply day filter
    if (days && days.length > 0 && !days.includes(dayOfWeek)) return false;
    // Only include rows with valid numeric type
    if (type && isNaN(parseFloat(row[type]))) return false;

    // Apply loadType filter — skip if loadType is "All"
    if (loadType && (loadType !== row.Load_Type)) return false;
    //     console.log("loadType=========", loadType)
    //    if (!loadType || loadType == row.Load_Type) return true;

    return true;
});
}

// Example route
app.get('/', (req, res) => {
  res.send('Steel Power API is running!');
});

app.get('/power', (req, res) => {
  const {
    from,
    to,
    days,
    type = 'Usage_kWh',
    loadType = '',
    view = 'list', // 'list' or 'summary'
    stat = 'sum',  // 'sum', 'mean', 'min', 'max', 'median'
  } = req.query;

  if (!type) return res.status(400).json({ error: 'Missing type parameter' });
  //if (!loadType) return res.status(400).json({ error: 'Missing loadType parameter' });
  console.log('req.query', req.query, loadType);
  const dayList = days ? days.split(',') : [];

  const filtered = filterData({ from, to, days: dayList, type, loadType: req.query.loadType || '' });

  if (view === 'list') {
    return res.json(filtered.map(row => ({
      date: row.date,
      day: moment(row.date).format('dddd'),
      [type]: parseFloat(row[type]),
      loadType: row.Load_Type,
    })));
  }

  // Summary View
  const values = filtered.map(row => parseFloat(row[type]));

  let result;
  switch (stat) {
    case 'sum':
      result = values.reduce((a, b) => a + b, 0);
      break;
    case 'mean':
      result = values.reduce((a, b) => a + b, 0) / values.length;
      break;
    case 'min':
      result = Math.min(...values);
      break;
    case 'max':
      result = Math.max(...values);
      break;
    case 'median':
      values.sort((a, b) => a - b);
      const mid = Math.floor(values.length / 2);
      result = values.length % 2 === 0
        ? (values[mid - 1] + values[mid]) / 2
        : values[mid];
      break;
    default:
      return res.status(400).json({ error: 'Invalid stat type' });
  }

  return res.json({
    type,
    stat,
    result: parseFloat(result.toFixed(2))
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
