// Import the module
const RouteRecommendation = require('../models/recommededRoutes'); // Assuming you have a RouteRecommendation model

// Controller function
const createRouteRecommended = async (req, res) => {
  try {
    // Logic to create a new recomeded route
    const { rec_description, start_location, citizen_id, location_id } = req.body;
    
    const newRouteRecommendation = await RouteRecommendation.create({
      rec_description,
      start_location,
      citizen_id,
      location_id,
    });
    
    return res.status(201).json(newRouteRecommendation);
  } catch (error) {
    console.error('Error creating route recommendation:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllRouteRecommendations = async (req, res) => {
  try {
    // Logic to retrieve all route recommendations
    const routeRecommendations = await RouteRecommendation.findAll();
    
    return res.status(200).json(routeRecommendations);
  } catch (error) {
    console.error('Error retrieving route recommendations:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Export the controller functions
module.exports = {
  createRouteRecommendation,
  getAllRouteRecommendations,
};
