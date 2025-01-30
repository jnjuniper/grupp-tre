const express = require("express");
const router = express.Router();
const Database = require("better-sqlite3");
const db = new Database("./db/products.db");

const sanitizeAndParseId = (productId) => {
  if (typeof productId === "string") {
    return parseInt(productId.replace(/'/g, ""), 10);
  }
  return parseInt(productId, 10);
};

router.get("/", (req, res) => {
  const cart = req.session.cart || [];
  let total = 0;

  const enrichedCart = cart.map((item) => {
    const sanitizedId = sanitizeAndParseId(item.productId);
    const product = db
      .prepare("SELECT * FROM products WHERE id = ?")
      .get(sanitizedId);

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

  console.log("Enriched Cart Data:", enrichedCart);
  console.log("Total Price:", total);

  res.render("checkout", {
    cart: enrichedCart,
    total: total.toFixed(2),
  });
});

router.get("/cart", (req, res) => {
  const cart = req.session.cart || [];
  let total = 0;

  const enrichedCart = cart.map((item) => {
    const sanitizedId = sanitizeAndParseId(item.productId);
    const product = db
      .prepare("SELECT * FROM products WHERE id = ?")
      .get(sanitizedId);

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

  res.json({
    cart: enrichedCart,
    total: total.toFixed(2),
  });
});

module.exports = router;
