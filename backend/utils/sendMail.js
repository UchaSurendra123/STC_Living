const nodemailer = require('nodemailer');

const sendMail = async ({ to, subject, text, html }) => {
  const port = Number(process.env.SMTP_PORT) || 465;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: port,
    secure: port === 465, // true for port 465, false for 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      // Prevents "self-signed certificate in certificate chain" errors caused by local network proxies/antivirus
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: `"STC Living" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    html,
  };

  return await transporter.sendMail(mailOptions);
};

module.exports = sendMail;