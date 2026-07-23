const rateLimit = require('express-rate-limit');

/**
 * Limits contact-form submissions to 10 requests per 15 minutes
 * per IP address to prevent spam/abuse.
 */
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many enquiries submitted. Please try again later.' }
});

module.exports = { contactLimiter };
