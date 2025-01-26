const express = require('express');
const router = express.Router();
const Database = require('better-sqlite3');
const db = new Database('./db/products.db');

router.post('/cart', (req, res) => {
    console.log(req.session.cart); // Debugging: Check session data here
    const { productId, name, price } = req.body;
  
    if (!req.session.cart) {
      req.session.cart = [];
    }
  
    const existingProductIndex = req.session.cart.findIndex(
      (item) => item.productId === productId
    );
  
    if (existingProductIndex > -1) {
      req.session.cart[existingProductIndex].quantity += 1;
    } else {
      req.session.cart.push({ productId, name, price, quantity: 1 });
    }
  
    console.log(req.session.cart); // Debugging: Check updated session data here
  
    res.json({ success: true, cart: req.session.cart });
  });
  
  router.get('/cart', (req, res) => {
    const cart = req.session.cart || [];
    const enrichedCart = cart.map((item) => {
      // Simulate fetching the image from the database
      const product = db.prepare('SELECT * FROM products WHERE id = ?').get(item.productId);
      return {
        ...item,
        image: product ? product.image : '/images/placeholder.svg', // Fallback image if missing
      };
    });
  
    res.json({ cart: enrichedCart });
  });
  


  router.delete('/cart/:productId', (req, res) => {
    const { productId } = req.params;
    console.log('Received DELETE for productId:', productId); // Debugging
  
    if (!req.session.cart) {
      console.log('Cart is empty'); // Debugging
      return res.status(400).json({ error: 'Cart is empty' });
    }
  
    req.session.cart = req.session.cart.filter(
      (item) => item.productId !== productId
    );
  
    console.log('Updated cart:', req.session.cart); // Debugging
    res.json({ success: true, cart: req.session.cart });
  });
  

module.exports = router;
