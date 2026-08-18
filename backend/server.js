// /**
//  * STC Living — Backend Server
//  * Express API serving the contact form and product catalog,
//  * plus static hosting for the frontend during local development.
//  */

// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// require('dotenv').config();

// const contactRoutes = require('./routes/contact');
// const productRoutes = require('./routes/products');

// const app = express();
// const PORT = process.env.PORT || 5000;

// /* ---------- middleware ---------- */
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// /* ---------- serve the frontend (optional, for local single-server setup) ---------- */
// app.use(express.static(path.join(__dirname, '..', 'frontend')));

// /* ---------- API routes ---------- */
// app.use('/api/contact', contactRoutes);
// app.use('/api/products', productRoutes);

// /* ---------- health check ---------- */
// app.get('/api/health', (req, res) => {
//   res.json({ status: 'ok', service: 'STC Living API', time: new Date().toISOString() });
// });

// /* ---------- fallback: send index.html for any non-API GET (simple SPA-friendly routing) ---------- */
// app.get('*', (req, res, next) => {
//   if (req.path.startsWith('/api')) return next();
//   res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
// });

// /* ---------- error handler ---------- */
// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
// });

// app.listen(PORT, () => {
//   console.log(`STC Living server running at http://localhost:${PORT}`);
// });








/**
 * STC Living — Backend Server
 * Express API serving the contact form and product catalog,
 * plus static hosting for the frontend during local development.
 */

// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// require('dotenv').config();

// const contactRoutes = require('./routes/contact');
// const productRoutes = require('./routes/products');

// const app = express();
// const PORT = process.env.PORT || 5000;

// /* ---------- middleware ---------- */
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// /* ---------- serve the frontend (optional, for local single-server setup) ---------- */
// app.use(express.static(path.join(__dirname, '..', 'frontend')));

// /* ---------- API routes ---------- */
// app.use('/api/contact', contactRoutes);
// app.use('/api/products', productRoutes);

// /* ---------- health check ---------- */
// app.get('/api/health', (req, res) => {
//   res.json({ status: 'ok', service: 'STC Living API', time: new Date().toISOString() });
// });

// /* ---------- fallback: send index.html for any non-API GET (simple SPA-friendly routing) ---------- */
// app.get('*', (req, res, next) => {
//   if (req.path.startsWith('/api')) return next();
//   res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
// });

// /* ---------- error handler ---------- */
// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
// });

// /* ---------- start server locally (ignored on Vercel) ---------- */
// if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
//   app.listen(PORT, () => {
//     console.log(`STC Living server running at http://localhost:${PORT}`);
//   });
// }

// /* ---------- export Express app for Vercel Serverless Function ---------- */
// module.exports = app;







const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const contactRoutes = require('./routes/contact');
const productRoutes = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 5000;

/* ---------- trust proxy (Required for Vercel + express-rate-limit) ---------- */
app.set('trust proxy', 1);

/* ---------- middleware ---------- */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------- serve the frontend (for local development) ---------- */
app.use(express.static(path.join(__dirname, '..', 'frontend')));

/* ---------- API routes ---------- */
app.use('/api/contact', contactRoutes);
app.use('/api/products', productRoutes);

/* ---------- health check ---------- */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'STC Living API', time: new Date().toISOString() });
});

/* ---------- fallback: handle non-API routes safely ---------- */
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  
  // On Vercel, static frontend files are served directly via vercel.json routes
  if (process.env.VERCEL) {
    return res.status(404).json({ error: 'API route not found' });
  }

  // Local fallback to index.html
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

/* ---------- error handler ---------- */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

/* ---------- start server locally (ignored on Vercel) ---------- */
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`STC Living server running at http://localhost:${PORT}`);
  });
}

/* ---------- export Express app for Vercel Serverless Function ---------- */
module.exports = app;