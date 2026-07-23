const products = require('../models/products.json');

function getAllProducts(req, res) {
  res.json({ count: products.length, products });
}

function getProductsByCategory(req, res) {
  const { category } = req.query;
  const filtered = products.filter(
    (p) => p.category.toLowerCase() === String(category).toLowerCase()
  );
  res.json({ count: filtered.length, products: filtered });
}

module.exports = { getAllProducts, getProductsByCategory };
