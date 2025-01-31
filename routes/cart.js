const express = require("express");
const router = express.Router();
const Database = require("better-sqlite3");
const db = new Database("./db/products.db");


router.post("/cart", (req, res) => {
  const { productId, name, price } = req.body;

  if (!req.session.cart) {
    req.session.cart = [];const express = require("express");
    const router = express.Router();
    const Database = require("better-sqlite3");
    const db = new Database("./db/products.db");
    

    router.post("/cart", (req, res) => {
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
        req.session.cart.push({
          productId,
          name,
          price: parseFloat(price), 
          quantity: 1,
        });
      }
    
      res.json({ success: true, cart: req.session.cart });
    });
    
   
    router.get("/cart", (req, res) => {
      const cart = req.session.cart || [];
      let total = 0;
    
    
      const enrichedCart = cart.map((item) => {
        const product = db
          .prepare("SELECT * FROM products WHERE id = ?")
          .get(parseInt(item.productId, 10)); 
    
        if (product) {
          const price = parseFloat(product.price) || 0; 
          total += price * item.quantity;
    
          return {
            ...item,
            price, 
            image: product.image || "/images/placeholder.png", 
          };
        } else {
          console.error(`Produkt med ID ${item.productId} hittades inte.`);
          return {
            ...item,
            price: 0,
            image: "/images/placeholder.png", 
          };
        }
      });
    
      res.json({ cart: enrichedCart, total: total.toFixed(2) });
    });
    
 
    router.delete("/cart/:productId", (req, res) => {
      const { productId } = req.params;
    
      if (!req.session.cart) {
        return res.status(400).json({ success: false, error: "Cart is empty" });
      }
    
      req.session.cart = req.session.cart.filter(
        (item) => item.productId !== productId
      );
    
      res.json({ success: true, cart: req.session.cart });
    });
    
    module.exports = router;
    
  }

  const existingProductIndex = req.session.cart.findIndex(
    (item) => item.productId === productId
  );

  if (existingProductIndex > -1) {
    req.session.cart[existingProductIndex].quantity += 1;
  } else {
    req.session.cart.push({
      productId,
      name,
      price: parseFloat(price), 
      quantity: 1,
    });
  }

  res.json({ success: true, cart: req.session.cart });
});


router.get("/cart", (req, res) => {
  const cart = req.session.cart || [];
  let total = 0;

  const enrichedCart = cart.map((item) => {
    const sanitizedProductId = item.productId.replace(/'/g, ""); 
    const product = db
      .prepare("SELECT * FROM products WHERE id = ?")
      .get(sanitizedProductId);

    if (product) {
      const price = parseFloat(product.price) || 0; 
      total += price * item.quantity;

      return {
        ...item,
        price,
        image: product.image || "/images/placeholder.png", 
      };
    } else {
      console.error(`Produkt med ID ${sanitizedProductId} hittades inte i databasen.`);
      return {
        ...item,
        price: 0,
        image: "/images/placeholder.png", 
      };
    }
  });

  res.json({ cart: enrichedCart, total: total.toFixed(2) });
});


router.delete("/cart/:productId", (req, res) => {
  const { productId } = req.params;

  if (!req.session.cart) {
    return res.status(400).json({ success: false, error: "Cart is empty" });
  }

  req.session.cart = req.session.cart.filter(
    (item) => item.productId !== productId
  );

  res.json({ success: true, cart: req.session.cart });
});

module.exports = router;
