const express = require('express');
const router = express.Router();
const Database = require('better-sqlite3');

// Create a database connection
const db = new Database('./db/products.db');

/* GET admin page. */
router.get('/', (req, res, next) => {
  try {
    // Query the database directly
    const products = db.prepare('SELECT * FROM products').all();

    // Render the admin page with products
    res.render('admin/admin', {
      title: 'Administration',
      products, // Pass products to the template
    });
  } catch (error) {
    console.error('Error fetching products:', error.message);
    next(error); // Pass the error to the error handler
  }
});

router.post('/delete/:id', (req, res, next) => {
    const productId = req.params.id;
  
    try {
      // Delete the product from the database
      const result = db.prepare('DELETE FROM products WHERE id = ?').run(productId);
  
      if (result.changes === 0) {
        return res.status(404).send('Product not found');
      }
  
      res.redirect('/admin'); // Redirect back to the admin page after deletion
    } catch (error) {
      console.error('Error deleting product:', error.message);
      next(error); // Pass the error to the error handler
    }
  });

module.exports = router;
