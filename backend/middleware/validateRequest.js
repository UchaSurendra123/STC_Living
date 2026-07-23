const { validationResult } = require('express-validator');

/**
 * Runs after express-validator checks; returns a 400 with
 * field-level error messages if validation failed.
 */
module.exports = function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};
