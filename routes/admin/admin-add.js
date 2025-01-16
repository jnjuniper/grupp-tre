const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const router = express.Router();

const db = new sqlite3.Database(path.join(__dirname, '../../db/products.db'));

router.get('/', (req, res) => {
  res.render('admin/admin-add', { title: 'Add Product' });
});

router.post('/', (req, res) => {
  const {
    productName,
    price,
    image,
    secondaryImage1,
    secondaryImage2,
    secondaryImage3,
    brand,
    productDescription,
    isNew,
    category,
  } = req.body;

  const sql = `
    INSERT INTO products (
      productName, price, image, secondaryImage1, secondaryImage2, secondaryImage3, brand, productDescription, isNew, category
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const params = [
    productName,
    price,
    image,
    secondaryImage1,
    secondaryImage2,
    secondaryImage3,
    brand,
    productDescription,
    isNew,
    category,
  ];

  db.run(sql, params, function (err) {
    if (err) {
      console.error('Error adding product:', err);
      return res
        .status(500)
        .json({ error: 'An error occurred while adding the product' });
    }
    res.status(200).json({ message: 'Product added successfully' });
  });
});

module.exports = router;