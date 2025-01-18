const express = require("express");
const Database = require("better-sqlite3");
const router = express.Router();

// Anslut till SQLite-databasen
const db = new Database("./db/products.db", { verbose: console.log });

// Route för att hantera sökningen
router.get("/search", (req, res) => {
  const searchQuery = req.query.q;

  if (!searchQuery || searchQuery.trim() === "") {
    return res.render("search-page", { 
      title: "Sökresultat", 
      query: "", 
      results: [], 
      message: "Ange ett sökord för att hitta produkter." 
    });
  }

  try {
    const sql = `
      SELECT id, productName, price, image, secondaryImage1, brand, productDescription, isNew, category
      FROM products
      WHERE productName LIKE ?`;
    const results = db.prepare(sql).all(`%${searchQuery}%`);

    console.log("Search Results:", results);

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
