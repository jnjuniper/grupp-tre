const express = require('express');
const router = express.Router();
const Database = require('better-sqlite3');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

// Create database connections
const productsDb = new Database('./db/products.db');
const adminsDb = new Database('./db/admins.db'); // Use `admins.db`

// GET admin page
router.get('/', (req, res, next) => {
  try {
    // Fetch products from products.db
    const products = productsDb.prepare('SELECT * FROM products').all();

    // Fetch admin users from admins.db
    const adminUsers = adminsDb.prepare('SELECT id, username, password FROM admins').all(); // Correct table name

    // Render the admin page with products and admin users
    res.render('admin/admin', {
      title: 'Administration',
      products,
      adminUsers,
    });
  } catch (error) {
    console.error('Error fetching data:', error.message);
    next(error); // Pass error to the error handler
  }
});

// POST route to delete a product
router.post('/delete/:id', (req, res, next) => {
  const productId = req.params.id;

  try {
    // Delete the product from products.db
    const result = productsDb.prepare('DELETE FROM products WHERE id = ?').run(productId);

    if (result.changes === 0) {
      return res.status(404).send('Product not found');
    }

    res.redirect('/admin'); // Redirect back to the admin page after deletion
  } catch (error) {
    console.error('Error deleting product:', error.message);
    next(error); // Pass error to the error handler
  }
});

// POST route to update an admin user
router.post('/update-admin/:id', async (req, res, next) => {
  const adminId = req.params.id; // ID of the admin to update
  const { username, password } = req.body; // New username and password from the form

  try {
    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the admin user in admins.db with the hashed password
    const result = adminsDb
      .prepare('UPDATE admins SET username = ?, password = ? WHERE id = ?')
      .run(username, hashedPassword, adminId);

    if (result.changes === 0) {
      return res.status(404).send('Admin user not found');
    }

    res.redirect('/admin'); // Redirect back to the admin page after update
  } catch (error) {
    console.error('Error updating admin user:', error.message);
    next(error); // Pass error to the error handler
  }
});

module.exports = router;
