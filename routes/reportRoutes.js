const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "your_database"
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Create a new report
app.post('/reports', (req, res) => {
  const { incident_type, rep_description, date, location_id, citizen_id } = req.body;
  if (!incident_type || !rep_description || !date || !location_id || !citizen_id) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sql = 'INSERT INTO report (incident_type, rep_description, date, location_id, citizen_id) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [incident_type, rep_description, date, location_id, citizen_id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to create a report' });
    }

    const newReport = {
      report_id: result.insertId,
      incident_type,
      rep_description,
      date,
      location_id,
      citizen_id,
    };

    res.status(201).json({ message: 'Report created successfully', report: newReport });
  });
});

// Get all reports
app.get('/reports', (req, res) => {
  const sql = 'SELECT * FROM report';
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(200).json(results);
  });
});

// Get a single report by ID
app.get('/reports/:report_id', (req, res) => {
  const report_id = req.params.report_id;
  const sql = 'SELECT * FROM report WHERE report_id = ?';
  db.query(sql, [report_id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.status(200).json(results[0]);
  });
});

// Update a report by ID
app.put('/reports/:report_id', (req, res) => {
  const report_id = req.params.report_id;
  const { incident_type, rep_description, date, location_id, citizen_id } = req.body;
  if (!incident_type || !rep_description || !date || !location_id || !citizen_id) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sql = 'UPDATE report SET incident_type = ?, rep_description = ?, date = ?, location_id = ?, citizen_id = ? WHERE report_id = ?';
  db.query(sql, [incident_type, rep_description, date, location_id, citizen_id, report_id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to update the report' });
    }

    res.status(200).json({ message: 'Report updated successfully' });
  });
});

// Delete a report by ID
app.delete('/reports/:report_id', (req, res) => {
  const report_id = req.params.report_id;
  const sql = 'DELETE FROM report WHERE report_id = ?';
  db.query(sql, [report_id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to delete the report' });
    }

    res.status(200).json({ message: 'Report deleted successfully' });
  });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});