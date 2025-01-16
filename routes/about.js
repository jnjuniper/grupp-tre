const express = require('express');
const router = express.Router();
const aboutContent = require('../data/about.js'); // Import the content data

// Route to render the About page
router.get('/', (req, res) => {
  res.render('about', { aboutContent }); // Pass the data to the view
});

module.exports = router; // Export the router
