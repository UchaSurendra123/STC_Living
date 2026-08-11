const path = require('path');
// Explicitly tell dotenv where to find the .env file (one folder up in /backend)
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const sendMail = require('./sendMail');

async function runTest() {
  console.log('--- SMTP Debug Information ---');
  console.log('SMTP_HOST:', process.env.SMTP_HOST);
  console.log('SMTP_PORT:', process.env.SMTP_PORT);
  console.log('SMTP_USER:', process.env.SMTP_USER);
  console.log('NOTIFY_EMAIL:', process.env.NOTIFY_EMAIL);
  console.log('------------------------------');

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('❌ Error: SMTP_USER or SMTP_PASS is missing in your .env file!');
    return;
  }

  try {
    console.log('Attempting to send email...');
    const result = await sendMail({
      to: process.env.NOTIFY_EMAIL || 'namratha@stcliving.in',
      subject: 'Test Email from STC Living Backend',
      text: 'If you receive this email, your Nodemailer and SMTP setup is working correctly!'
    });
    console.log('✅ Success! Email sent successfully.');
    console.log('Response details:', result.response);
  } catch (error) {
    console.error('❌ Email sending failed with error:');
    console.error(error);
  }
}

runTest();