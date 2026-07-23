const nodemailer = require('nodemailer');

/**
 * Sends an email via SMTP using credentials from environment variables.
 * Used by contactController to notify the sales team of new enquiries.
 */
async function sendMail({ to, subject, text }) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  return transporter.sendMail({
    from: `"STC Living Website" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text
  });
}

module.exports = sendMail;
