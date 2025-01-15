const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const router = express.Router();

const db = new sqlite3.Database(path.join(__dirname, '../../db/products.db'));

router.get('/:id', (req, res) => {
  const sql = `SELECT * FROM products WHERE id = ?`;
  db.get(sql, [req.params.id], (err, product) => {
    if (err) {
      console.error('Error fetching product:', err);
      return res
        .status(500)
        .send('An error occurred while fetching the product');
    }
    if (!product) return res.status(404).send('Product not found');
    res.render('admin/admin-edit', { title: 'Edit Product', product });
  });
});

router.put('/:id', (req, res) => {
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
    UPDATE products 
    SET 
      productName = ?, 
      price = ?, 
      image = ?, 
      secondaryImage1 = ?, 
      secondaryImage2 = ?, 
      secondaryImage3 = ?, 
      brand = ?, 
      productDescription = ?, 
      isNew = ?, 
      category = ?
    WHERE id = ?`;

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
    req.params.id,
  ];

  db.run(sql, params, function (err) {
    if (err) {
      console.error('Error updating product:', err);
      return res
        .status(500)
        .json({ error: 'An error occurred while updating the product' });
    }
    res.status(200).json({ message: 'Product updated successfully' });
  });
});

module.exports = router;
