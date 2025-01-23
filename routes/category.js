const express = require("express");
const router = express.Router();
const path = require("path");
const Database = require("better-sqlite3");

const dbPath = path.join(__dirname, "..", "db", "products.db");
const db = new Database(dbPath);

router.get("/details/:id", (req, res) => {
  const productId = req.params.id;

  const productStmt = db.prepare("SELECT * FROM products WHERE id = ?");
  const product = productStmt.get(productId);

  if (!product) {
    return res.status(404).send("Could not find products.");
  }

  const isSizeVisible = !!product.size;

  let relatedProducts = [];
  if (product.category) {
    const relatedStmt = db.prepare(`
      SELECT * FROM products
      WHERE category = ?
        AND id != ?
    `);
    relatedProducts = relatedStmt.all(product.category, product.id);
  }

  res.render("product-details", {
    title: product.productName,
    product: product,
    isSizeVisible: isSizeVisible,
    relatedProducts: relatedProducts,
  });
});

router.get("/:slug", (req, res) => {
  const slug = req.params.slug;
  const query = db.prepare("SELECT * FROM products WHERE category = ?");
  const products = query.all(slug);

  res.render("category", {
    title: `Category: ${slug}`,
    products: products,
    slug: slug,
  });
});

module.exports = router;
