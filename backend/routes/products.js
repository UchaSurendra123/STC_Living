const express = require('express');
const router = express.Router();
const { getAllProducts, getProductsByCategory } = require('../controllers/productController');

/**
 * GET /api/products             -> full catalog
 * GET /api/products?category=bed|bath -> filtered catalog
 */
router.get('/', (req, res) => {
  const { category } = req.query;
  if (category) return getProductsByCategory(req, res);
  return getAllProducts(req, res);
});

module.exports = router;
