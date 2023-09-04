const express = require('express');
const router = express.Router();
const citizenController = require('../controllers/citizenController');
router.post('/register', citizenController.register);
router.post('/login', citizenController.login);

// Profile route #requires authenticate
router.get('/profile', citizenController.getCitizenProfile);

// Update Profile route #requires authenticate
router.put('/profile', citizenController.updateCitizenProfile);

// Deletion of Account 
router.delete('/:citizen_id', citizenController.deleteCitizenAccount);

module.exports = router;
