/**
 * STC Living — Backend Server
 * Express API serving the contact form and product catalog,
 * plus static hosting for the frontend during local development.
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const contactRoutes = require('./routes/contact');
const productRoutes = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 5000;

/* ---------- middleware ---------- */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------- serve the frontend (optional, for local single-server setup) ---------- */
app.use(express.static(path.join(__dirname, '..', 'frontend')));

/* ---------- API routes ---------- */
app.use('/api/contact', contactRoutes);
app.use('/api/products', productRoutes);

/* ---------- health check ---------- */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'STC Living API', time: new Date().toISOString() });
});

/* ---------- fallback: send index.html for any non-API GET (simple SPA-friendly routing) ---------- */
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

/* ---------- error handler ---------- */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`STC Living server running at http://localhost:${PORT}`);
});
