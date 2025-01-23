var express = require('express');
var router = express.Router();
var Database = require('better-sqlite3');

const db = new Database('./db/products.db'); // Adjust the path to your database file

router.get('/', (req, res) => {
    try {
      const products = db.prepare('SELECT * FROM products').all(); // Fetch 8 products
      res.render('shop', {
        title: 'Shop',
        products,
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  
module.exports = router;
