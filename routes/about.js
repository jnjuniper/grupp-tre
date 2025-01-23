const express = require('express');
const router = express.Router();
const aboutContent = require('../data/about.js');

router.get('/', (req, res) => {
  res.render('about', { title: 'About', aboutContent }); 
});

module.exports = router; 