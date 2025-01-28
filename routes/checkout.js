const express = require("express");
const router = express.Router();
const Database = require("better-sqlite3");
const db = new Database("./db/products.db");

// Render checkout-sidan
router.get("/", (req, res) => {
  const cart = req.session.cart || []; // Kontrollera att kundvagnen finns
  let total = 0;

  // Berika kundvagnen med data från databasen
  const enrichedCart = cart.map((item) => {
    const product = db
      .prepare("SELECT * FROM products WHERE id = ?")
      .get(parseInt(item.productId, 10)); // Hämta produkten baserat på ID

    if (product) {
      const price = parseFloat(product.price) || 0; // Säkerställ att priset är numeriskt
      total += price * item.quantity; // Lägg till totalpris

      return {
        ...item,
        name: product.productName, // Produktens namn från databasen
        price, // Pris från databasen
        image: product.image || "/images/placeholder.png", // Bild från databasen
      };
    } else {
      console.error(`Produkt med ID '${item.productId}' hittades inte i databasen.`);
      return {
        ...item,
        name: "Unknown Product",
        price: 0,
        image: "/images/placeholder.png", // Fallback-bild
      };
    }
  });

  console.log("Enriched Cart Data:", enrichedCart);
  console.log("Total Price:", total);

  // Skicka data till checkout.ejs
  res.render("checkout", {
    cart: enrichedCart,
    total: total.toFixed(2), // Totalpris med två decimaler
  });
});

module.exports = router;
