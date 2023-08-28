/*const express = require('express');
const mysql = require('mysql');

const app = express();
const connection = mysql.createConnection({
  host: "localhost",         
  user: 'root',
  password: '',
  database: 'q_phela_database'
});

// Connecting to MySQL
connection.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  }
   else {
    console.log('Connected to MySQL');
  }
});


app.get('/', (req, res) => {
	return res.json("from server");
})
app.get('citizen', (req, res) => {
	const query="select from citizen";
	connection.query(sql, (err, data) => {
		if (err) {
			return res.json(err);
		}
	return res.json(data);
});
});
//close
process.on('SIGINT', () => {
  connection.end();
  process.exit();
})

const PORT= process.env.PORT || 8002;
app.listen(PORT, () => {
	console.log("Listening on port", PORT);
});*/
const express = require('express');
const mysql = require('mysql');

const app = express();
const connection = mysql.createConnection({
  host: "localhost",         
  user: 'root',
  password: '',
  database: 'init'
});
const PORT=8001;
app.listen(PORT, () => {
	console.log('SERVER :http://localhost:${PORT}');
connection.connect((err)=>{
  if(err) throw err;
  console.log("DATABASE CONNECTED");
})
})
app.use("/all", (req,res)=>{
  const query='select from citizen';
	connection.query(query, (err, result) => {
		if (err) throw err;
    res.send(result)
    
})
})

/*const express = require('express');
const app = express();

const userRoutes = require('./routes/userRoutes');
const locationRoutes = require('./routes/locationRoutes');
const reportRoutes = require('./routes/reportRoutes');
const tripRoutes = require('./routes/tripRoutes');
const alertRoutes = require('./routes/alertRoutes');
const safetyTipRoutes = require('./routes/safetyTipRoutes');
const routeRecommendationRoutes = require('./routes/routeRecommendationRoutes');

app.use('/users', userRoutes);
app.use('/locations', locationRoutes);
app.use('/reports', reportRoutes);
app.use('/trips', tripRoutes);
app.use('/alerts', alertRoutes);
app.use('/safetytips', safetyTipRoutes);
app.use('/routerecommendations', routeRecommendationRoutes);

// ... other middleware and server setup ...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
*/