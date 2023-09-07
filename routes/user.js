const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors=require('cors');
//const db= require('./config/database'); // Your database and secret key configuration

// MySQL Connection Configuration
const mysql = require('mysql');
const db = mysql.createConnection({
  host: "localhost",         // Replace with the actual host if hosted remotely
  user: "root",
  password: "",
  database: "q_pheladb"
});

const app = express();
//cccc
app.use(bodyParser.json());
app.use(cors());
app.post('/register', (req, res) => {
    const { citizen_name, email, password,contact_number } = req.body;
    if (!citizen_name || !email || !password || !contact_number) {
        return res.status(400).json({ message: 'email and password are required' });
      } /*
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Registration failed' });
        } */
        const sql = 'INSERT INTO citizen (citizen_name, email, password, contact_number) VALUES (?, ?, ?, ?)';
        db.query(sql, [citizen_name, email, password, contact_number], (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Registration failed' });
          }
    
          res.status(201).json({ message: 'Registration successful' });
        });
      });
    //});

    app.post('/login', (req, res) => {
        
console.log(req.body)
        if (!req.body.email || !req.body.password) {
          return res.status(400).json({ message: 'Username and password are required' });
        }
        const sql = 'SELECT * FROM citizen WHERE email = ?';
        db.query(sql, [req.body.email], (err, results) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
          }
          if (results.length === 0) {
            console.log('No user found with email:', email);
            return res.status(401).json({ message: 'Invalid credentials' });
          }
      
          const citizen = results[0];

          //bcrypt.compare(password, user.password, (err, isPasswordValid) => {
            if (req.body.password !== citizen.password) {
              console.log('Password mismatch for citizen:', citizen.citizen_name);
              return res.status(401).json({ message: 'Invalid credentials' });
            }
        
         //   const token = jwt.sign({ citizen_id: citizen.id }, config.secretKey, { expiresIn: '1h' });
        
            res.status(200).json({ results });
          });
        });
      const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 