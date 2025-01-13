const express = require("express");
const Database = require("better-sqlite3"); // Importera better-sqlite3
const router = express.Router();

// Anslut till SQLite-databasen
const db = new Database("./db/products.db", { verbose: console.log });

// Route för att hantera sökningen
router.get("/search", (req, res) => {
  const searchQuery = req.query.q; // Hämta sökfrågan från URL-parametern

  if (!searchQuery || searchQuery.trim() === "") {
    return res.render("search-page", { 
      title: "Sökresultat", 
      query: "", 
      results: [], 
      message: "Ange ett sökord för att hitta produkter." 
    });
  }

  try {
    // Sök efter produkter som matchar sökfrågan
    const sql = `
      SELECT productName, price, image, brand, productDescription, isNew, category
      FROM products
      WHERE productName LIKE ?`;
    const results = db.prepare(sql).all(`%${searchQuery}%`);

    // Rendera söksidan med resultaten
    res.render("search-page", { 
      title: "Sökresultat", 
      query: searchQuery, 
      results, 
      message: results.length ? "" : "Inga produkter hittades."
    });
  } catch (err) {
    console.error(err);
    res.status(500).render("search-page", { 
      title: "Sökresultat", 
      query: searchQuery, 
      results: [], 
      message: "Ett fel inträffade." 
    });
  }
});

module.exports = router;
