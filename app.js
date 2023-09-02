const  express = require("express");
const app = express();
module.exports = app;
const mysql = require('mysql2');

// MySQL Connection Configuration
const db = mysql.createConnection({
  host: "localhost",         // Replace with the actual host if hosted remotely
  user: "root",
  password: "",
  database: "qpheladb"
});

// Connecting to MySQL
db.connect(err => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

module.exports = db;