//Function of CtizenS

const citizen = require('../modules/citizen'); 
const bcrypt = require('bcrypt'); // encrpt,hashing and validation
const jwt = require('jsonwebtoken'); //JWT tokens

// Reg new citizen
const registerCitizen = async (req, res) => {
  try {
    // Extract user data from the request body
    const { username, email, password } = req.body;

    // verify if the mail exists
    const existingCitizen = await citizen.findOne({ where: { email } });
    if (existingCitizen) {
      return res.status(400).json({ message: 'The email already exists' });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user record
    const newCitizen = await citizen.create({ username, email, password: hashedPassword });

    // Generate a JWT token for the user
    const token = jwt.sign({ citizen_id: newCitizen.id }, 'your-secret-key', { expiresIn: '1h' });

    // Send the token and user data in the response
    return res.status(201).json({ token, citizen: newCitizen });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Citizen Login
const loginCitizen = async (req, res) => {
  try {
    // Extract user data from the request body
    const { email, password } = req.body;

    // Find the Citizen by email
    const user = await user.findOne({ where: { email } });

    // If they dont exist give error messeg
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If the password is not valid, return an error
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // a JWT token 
    const token = jwt.sign({ userId: user.id },/* unfinished*/, { expiresIn: '1h' });

    // Send token and they should respond
    return res.status(200).json({ token, user });
  } catch (error) {
    console.error('Error logging in Citizen:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};



module.exports = {//conFunct
  registerCitizen,
  loginCitizen,
  
};
