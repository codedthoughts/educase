const db = require('../config/db');

class School {
  static async addSchool(name, address, latitude, longitude) {
    try {
      const [result] = await db.execute(
        'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
        [name, address, latitude, longitude]
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  static async getAllSchools() {
    try {
      const [rows] = await db.execute('SELECT * FROM schools');
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Calculate distance between two points using Haversine formula
  static calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in km
    return distance;
  }

  static deg2rad(deg) {
    return deg * (Math.PI/180);
  }
}

module.exports = School;