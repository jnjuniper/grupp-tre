const express = require("express");
const Database = require("better-sqlite3");
const router = express.Router();

const db = new Database("./db/products.db", { verbose: console.log });

router.get("/search", (req, res) => {
  const searchQuery = req.query.q;
  const sort = req.query.sort || "newest"; 

  if (!searchQuery || searchQuery.trim() === "") {
    return res.render("search-page", {
      title: "Search",
      query: "",
      results: [],
      sort,
      message: "Enter a keyword to find products."
    });
  }

  try {
    let sql = `
      SELECT id, productName, price, image, secondaryImage1, brand, productDescription, isNew, category
      FROM products
      WHERE productName LIKE ? OR category LIKE ?
    `;

    if (sort === "newest") {
      sql += " ORDER BY id DESC";
    } else if (sort === "oldest") {
      sql += " ORDER BY id ASC";
    } else if (sort === "highest") {
      sql += " ORDER BY price DESC";
    } else if (sort === "lowest") {
      sql += " ORDER BY price ASC";
    }

    const results = db.prepare(sql).all(`%${searchQuery}%`, `%${searchQuery}%`);

    res.render("search-page", {
      title: "Search",
      query: searchQuery,
      results,
      sort,
      message: results.length ? "" : "Inga produkter hittades."
    });
  } catch (err) {
    console.error(err);
    res.status(500).render("search-page", {
      title: "Search",
      query: searchQuery,
      results: [],
      sort,
      message: "Ett fel inträffade."
    });
  }
});

module.exports = router;
