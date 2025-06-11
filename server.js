import express from 'express';
import fileUpload from 'express-fileupload';
import { parse } from 'csv-parse/sync';

const app = express();
app.use(fileUpload());

app.post('/api/exposure-rate', (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const csvData = req.files.file.data.toString('utf8');
  let records;
  try {
    records = parse(csvData, { columns: true, skip_empty_lines: true });
  } catch (err) {
    return res.status(400).json({ error: 'Invalid CSV' });
  }

  const teamsMap = new Map();
  for (const row of records) {
    const keys = Object.keys(row).reduce((acc, key) => {
      acc[key.toLowerCase()] = key;
      return acc;
    }, {});
    const teamKey = Object.keys(keys).find(k => k.includes('team'));
    const ratingKey = Object.keys(keys).find(k => k.includes('rating'));

    const name = teamKey ? row[keys[teamKey]] : 'Unknown';
    const ratingVal = ratingKey ? parseFloat(row[keys[ratingKey]]) : NaN;
    const rating = isNaN(ratingVal) ? 0 : ratingVal;

    if (!teamsMap.has(name)) {
      teamsMap.set(name, { name, rating: 0, roster: [] });
    }
    const team = teamsMap.get(name);
    if (rating) {
      team.rating = rating;
    }
    team.roster.push(row);
  }

  const teams = Array.from(teamsMap.values());
  res.json(teams);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
