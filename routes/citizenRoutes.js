const express = require('express');
const router = express.Router();
const citizenController = require('../controllers/citizenController');
router.post('/register', citizenController.registerCitizen);
router.post('/login', citizenController.logincitizen);

// Profile route #requires authenticate
router.get('/profile', citizenController.getCitizenProfile);

// Update Profile route #requires authenticate
router.put('/profile', userController.updateCitizenProfile);

// Deletion of Account 
router.delete('/:citizen_id', userController.deleteCitizenAccount);

module.exports = router;
