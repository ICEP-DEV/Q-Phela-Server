const express = require('express');
const mysql = require('mysql');
const express = require('express');
const mysql = require('mysql');
const app = express();
const connection = mysql.createConnection({
  host: "localhost",         
  user: 'root',
  password: '',
  database: 'q-phela database'
});

// Connecting to MySQL
db.connect(err => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL');
  }
});


app.get('/', (req, res)=> {
	return res.json("from server");
})
app.get('/citizen', (req, res) => {
	const query="select from citizen";
	db.query(sql, (err, data)=>{
		if (err) {
			return res.json(err);
		}
	return res.json(data);
});
});
const port = process.env.PORT || 8080;
app.listen(PORT, () =>{
	console.log("Listening on port", PORT);
});