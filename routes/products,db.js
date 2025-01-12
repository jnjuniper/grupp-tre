const express = require('express');
const router = express.Router();
const Database = require('better-sqlite3');


const db = new Database('./db/products.db'); 


router.get('/api/products', (req, res) => {
  try {
    const products = db.prepare('SELECT * FROM products').all();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ error: 'Database query failed' });
  }
});

module.exports = router;