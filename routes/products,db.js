const express = require('express');
const router = express.Router();
const Database = require('better-sqlite3');

const db = new Database('./db/products.db');


router.get('/api/products', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM products').all();
    const products = rows.map((row) => ({
      ...row,
      isNew: row.isNew === "1",
    }));
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ error: 'Database query failed' });
  }
});


router.get('/products/:id', (req, res) => {
  try {
    const productId = req.params.id; 
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(productId);

    if (!product) {
      return res.status(404).send('Product not found');
    }

    
    const relatedProducts = db
      .prepare('SELECT * FROM products WHERE category = ? AND id != ? LIMIT 4')
      .all(product.category, productId);

    res.render('product-details', {
      product,
      relatedProducts,
      isSizeVisible: !(product.category === 'watches'|| product.category === 'bags' || product.category === 'perfume'),
    });
  } catch (error) {
    console.error('Error fetching product by ID:', error.message);
    res.status(500).send('Error loading product details.');
  }
});

module.exports = router;
