const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "q_pheladb"
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/admin/login', (req, res) => {
  const { email, password } = req.body;


  const sql = 'SELECT * FROM admin WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid login credentials' });
    }

    // Admin successfully logged in
    res.status(200).json({ message: 'Admin logged in successfully' });
  });
});
 

app.get('/admin/reports', (req, res) => {
    const sql = `
        SELECT
            r.incident_type AS "incident_type",
            r.rep_description AS "rep_description",
            c.citizen_name AS "citizen_name",
            l.latitude AS "latitude",
            l.longitude AS "longitude"
        FROM
            report r
            JOIN citizen c ON r.citizen_id = c.citizen_id
            JOIN location l ON r.location_id = l.location_id`;
            
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        // Transform the response to match the desired structure
        const transformedResults = results.map(result => ({
            incident_type: result.incident_type,
            rep_description: result.rep_description,
            citizen_name: result.citizen_name,
            latitude: result.latitude,
            longitude: result.longitude
        }));

        res.status(200).json(transformedResults);
    });
});


  
 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});