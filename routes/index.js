const express = require('express');
const router = express.Router();
const Database = require('better-sqlite3');

const db = new Database('./db/products.db'); 
const heroDb = new Database('./db/hero_images.db'); 

router.get('/', (req, res) => {
  try {
    // Fetch all products from the database
    const products = db.prepare('SELECT * FROM products').all();
    const heroImages = heroDb.prepare('SELECT image_path FROM hero_images').all();

    // Render the index.ejs page with the fetched products
    res.render('index', {
      title: 'Home',
      products: products,
      heroImages: heroImages,
    });
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).send('Error loading products');
  }
});

module.exports = router;
