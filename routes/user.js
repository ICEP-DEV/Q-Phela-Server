
const router = express.Router();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
//const config = require('./config/config'); // Your database and secret key configuration

const app = express();

app.use(bodyParser.json());

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Registration failed' });
        }
        const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.query(sql, [username, hashedPassword], (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Registration failed' });
          }
    
          res.status(201).json({ message: 'Registration successful' });
        });
      });
    });

    app.post('/login', (req, res) => {
        const { username, password } = req.body;
      
        // Retrieve the user from the database
        const sql = 'SELECT * FROM users WHERE username = ?';
        db.query(sql, [username], (err, results) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
          }
          if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
          }
      
          const user = results[0];
          bcrypt.compare(password, user.password, (err, isPasswordValid) => {
            if (err || !isPasswordValid) {
              return res.status(401).json({ message: 'Invalid credentials' });
            }
      
            // Generate a JWT token
            const token = jwt.sign({ userId: user.id }, config.secretKey, { expiresIn: '1h' });
      
            res.status(200).json({ token });
          });
        });
      });
      const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});      

/* Profile route i've authenticated
router.get('/profile', authenticate, citizenController.getCitizenProfile);

// Update Profile route i've authenticated
router.put('/profile', authenticate, citizenController.updateCitizenProfile);

// Deletion of Account 
router.delete('/:citizen_id', authenticate, citizenController.deleteCitizenAccount);

module.exports = router;*/