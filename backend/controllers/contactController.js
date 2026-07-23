const nodemailer = require('nodemailer');
const Enquiry = require('../models/Enquiry');
const sendMail = require('../utils/sendMail');

/**
 * Handles a new enquiry from the contact form.
 * Stores it in-memory (swap for a real DB in production) and,
 * if SMTP credentials are configured, emails the sales team.
 */
async function submitEnquiry(req, res) {
  try {
    const { propertyName, contactName, phone, email, message } = req.body;

    const enquiry = Enquiry.create({ propertyName, contactName, phone, email, message });

    // Attempt email notification — non-blocking failure so the
    // enquiry is still saved even if SMTP isn't configured yet.
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        await sendMail({
          to: process.env.NOTIFY_EMAIL || 'namratha@stcliving.in',
          subject: `New enquiry from ${contactName}${propertyName ? ' — ' + propertyName : ''}`,
          text: [
            `Property: ${propertyName || 'N/A'}`,
            `Name: ${contactName}`,
            `Phone: ${phone}`,
            `Email: ${email}`,
            `Message: ${message || 'N/A'}`
          ].join('\n')
        });
      } catch (mailErr) {
        console.error('Email notification failed:', mailErr.message);
      }
    }

    return res.status(201).json({ success: true, enquiry });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: 'Could not process enquiry' });
  }
}

module.exports = { submitEnquiry };
