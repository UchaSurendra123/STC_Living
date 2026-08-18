// const nodemailer = require('nodemailer');

// const sendMail = async ({ to, subject, text, html }) => {
//   const port = Number(process.env.SMTP_PORT) || 465;

//   const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST || 'smtp.gmail.com',
//     port: port,
//     secure: port === 465, // true for port 465, false for 587
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//     tls: {
//       // Prevents "self-signed certificate in certificate chain" errors caused by local network proxies/antivirus
//       rejectUnauthorized: false,
//     },
//   });

//   const mailOptions = {
//     from: `"STC Living" <${process.env.SMTP_USER}>`,
//     to,
//     subject,
//     text,
//     html,
//   };

//   return await transporter.sendMail(mailOptions);
// };

// module.exports = sendMail;



const nodemailer = require('nodemailer');

const port = Number(process.env.SMTP_PORT) || 465;

// Initialize transporter ONCE outside the request handler (reuses pool connection in Vercel)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: port,
  secure: port === 465, // true for port 465, false for port 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // MUST be a 16-character Google App Password
  },
  tls: {
    rejectUnauthorized: false,
  },
  // Essential socket timeouts for Serverless Functions
  connectionTimeout: 10000, // 10 seconds
  greetingTimeout: 5000,    // 5 seconds
  socketTimeout: 10000,     // 10 seconds
});

const sendMail = async ({ to, subject, text, html }) => {
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