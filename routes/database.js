const mysql = require('mysql');

// MySQL Connection Configuration
const db = mysql.createConnection({
  host: "localhost",         // Replace with the actual host if hosted remotely
  user: "root",
  password: "",
  database: "q_pheladb"
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
