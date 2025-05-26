const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const schoolRoutes = require('./routes/schoolRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', schoolRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('School Management API is running');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});