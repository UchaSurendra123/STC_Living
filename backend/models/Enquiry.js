/**
 * In-memory Enquiry "model".
 * Replace with a real database (MongoDB/PostgreSQL) in production —
 * this keeps the starter project runnable with zero external services.
 */

const store = [];

const Enquiry = {
  create({ propertyName, contactName, phone, email, message }) {
    const record = {
      id: store.length + 1,
      propertyName: propertyName || null,
      contactName,
      phone,
      email,
      message: message || null,
      createdAt: new Date().toISOString()
    };
    store.push(record);
    return record;
  },
  all() {
    return store;
  }
};

module.exports = Enquiry;
