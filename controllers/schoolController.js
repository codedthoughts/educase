const School = require('../models/schoolModel');

exports.addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    // Validate input
    if (!name || !address || !latitude || !longitude) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required: name, address, latitude, longitude' 
      });
    }

    // Validate latitude and longitude
    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Latitude and longitude must be valid numbers' 
      });
    }

    // Convert to float
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    // Validate latitude range (-90 to 90)
    if (lat < -90 || lat > 90) {
      return res.status(400).json({ 
        success: false, 
        message: 'Latitude must be between -90 and 90' 
      });
    }

    // Validate longitude range (-180 to 180)
    if (lng < -180 || lng > 180) {
      return res.status(400).json({ 
        success: false, 
        message: 'Longitude must be between -180 and 180' 
      });
    }

    const schoolId = await School.addSchool(name, address, lat, lng);
    
    res.status(201).json({
      success: true,
      message: 'School added successfully',
      data: { id: schoolId, name, address, latitude: lat, longitude: lng }
    });
  } catch (error) {
    console.error('Error adding school:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};

exports.listSchools = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    // Validate input
    if (!latitude || !longitude) {
      return res.status(400).json({ 
        success: false, 
        message: 'Latitude and longitude are required query parameters' 
      });
    }

    // Validate latitude and longitude
    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Latitude and longitude must be valid numbers' 
      });
    }

    // Convert to float
    const userLat = parseFloat(latitude);
    const userLng = parseFloat(longitude);

    // Validate latitude range (-90 to 90)
    if (userLat < -90 || userLat > 90) {
      return res.status(400).json({ 
        success: false, 
        message: 'Latitude must be between -90 and 90' 
      });
    }

    // Validate longitude range (-180 to 180)
    if (userLng < -180 || userLng > 180) {
      return res.status(400).json({ 
        success: false, 
        message: 'Longitude must be between -180 and 180' 
      });
    }

    // Get all schools
    const schools = await School.getAllSchools();

    // Calculate distance for each school and add it as a property
    const schoolsWithDistance = schools.map(school => {
      const distance = School.calculateDistance(
        userLat, userLng, 
        school.latitude, school.longitude
      );
      return { ...school, distance };
    });

    // Sort schools by distance (closest first)
    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    res.status(200).json({
      success: true,
      message: 'Schools retrieved successfully',
      data: schoolsWithDistance
    });
  } catch (error) {
    console.error('Error listing schools:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};