// // // // const nodemailer = require('nodemailer');
// // // // const Enquiry = require('../models/Enquiry');
// // // // const sendMail = require('../utils/sendMail');

// // // // /**
// // // //  * Handles a new enquiry from the contact form.
// // // //  * Stores it in-memory (swap for a real DB in production) and,
// // // //  * if SMTP credentials are configured, emails the sales team.
// // // //  */
// // // // async function submitEnquiry(req, res) {
// // // //   try {
// // // //     const { propertyName, contactName, phone, email, message } = req.body;

// // // //     const enquiry = Enquiry.create({ propertyName, contactName, phone, email, message });

// // // //     // Attempt email notification — non-blocking failure so the
// // // //     // enquiry is still saved even if SMTP isn't configured yet.
// // // //     if (process.env.SMTP_USER && process.env.SMTP_PASS) {
// // // //       try {
// // // //         await sendMail({
// // // //           to: process.env.NOTIFY_EMAIL || 'namratha@stcliving.in',
// // // //           subject: `New enquiry from ${contactName}${propertyName ? ' — ' + propertyName : ''}`,
// // // //           text: [
// // // //             `Property: ${propertyName || 'N/A'}`,
// // // //             `Name: ${contactName}`,
// // // //             `Phone: ${phone}`,
// // // //             `Email: ${email}`,
// // // //             `Message: ${message || 'N/A'}`
// // // //           ].join('\n')
// // // //         });
// // // //       } catch (mailErr) {
// // // //         console.error('Email notification failed:', mailErr.message);
// // // //       }
// // // //     }

// // // //     return res.status(201).json({ success: true, enquiry });
// // // //   } catch (err) {
// // // //     console.error(err);
// // // //     return res.status(500).json({ success: false, error: 'Could not process enquiry' });
// // // //   }
// // // // }

// // // // module.exports = { submitEnquiry };






// // // const Enquiry = require('../models/Enquiry');
// // // const sendMail = require('../utils/sendMail');
// // // const config = require('../config/config'); 

// // // async function submitEnquiry(req, res) {
// // //   try {
// // //     const { propertyName, contactName, phone, email, message } = req.body;

// // //     // 1. Save enquiry
// // //     const enquiry = Enquiry.create({ propertyName, contactName, phone, email, message });

// // //     // 2. Check SMTP credentials
// // //     if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
// // //       console.warn('⚠️ SMTP_USER or SMTP_PASS missing in environment variables. Email was NOT sent.');
// // //     } else {
// // //       try {
// // //         await sendMail({
// // //           to: config.notifyEmail,
// // //           subject: `New enquiry from ${contactName}${propertyName ? ' — ' + propertyName : ''}`,
// // //           text: [
// // //             `Property: ${propertyName || 'N/A'}`,
// // //             `Name: ${contactName}`,
// // //             `Phone: ${phone}`,
// // //             `Email: ${email}`,
// // //             `Message: ${message || 'N/A'}`
// // //           ].join('\n')
// // //         });
// // //         console.log(`✅ Enquiry email sent successfully to ${config.notifyEmail}`);
// // //       } catch (mailErr) {
// // //         console.error('❌ Email notification failed:', mailErr.message);
// // //       }
// // //     }

// // //     return res.status(201).json({ success: true, enquiry });
// // //   } catch (err) {
// // //     console.error(err);
// // //     return res.status(500).json({ success: false, error: 'Could not process enquiry' });
// // //   }
// // // }

// // // module.exports = { submitEnquiry };





// // const Enquiry = require('../models/Enquiry');
// // const sendMail = require('../utils/sendMail');

// // async function submitEnquiry(req, res) {
// //   try {
// //     // Log incoming body to terminal so you can see what the frontend sends
// //     console.log('📥 Incoming enquiry request body:', req.body);

// //     const { propertyName, contactName, name, phone, email, message } = req.body;

// //     // Handle cases where frontend sends 'name' instead of 'contactName'
// //     const finalContactName = contactName || name || 'Anonymous User';

// //     // 1. Save enquiry
// //     const enquiry = Enquiry.create({ 
// //       propertyName, 
// //       contactName: finalContactName, 
// //       phone, 
// //       email, 
// //       message 
// //     });

// //     const recipientEmail = process.env.NOTIFY_EMAIL || 'namratha@stcliving.in';

// //     // 2. Check SMTP variables
// //     if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
// //       console.warn('⚠️ SMTP credentials missing in .env file!');
// //     } else {
// //       try {
// //         await sendMail({
// //           to: recipientEmail,
// //           subject: `New enquiry from ${finalContactName}${propertyName ? ' — ' + propertyName : ''}`,
// //           text: [
// //             `Property: ${propertyName || 'N/A'}`,
// //             `Name: ${finalContactName}`,
// //             `Phone: ${phone || 'N/A'}`,
// //             `Email: ${email || 'N/A'}`,
// //             `Message: ${message || 'N/A'}`
// //           ].join('\n')
// //         });
// //         console.log(`✅ Enquiry email sent successfully to ${recipientEmail}`);
// //       } catch (mailErr) {
// //         console.error('❌ Email notification failed:', mailErr);
// //       }
// //     }

// //     return res.status(201).json({ success: true, enquiry });
// //   } catch (err) {
// //     console.error('❌ Controller error:', err);
// //     return res.status(500).json({ success: false, error: 'Could not process enquiry' });
// //   }
// // }

// // module.exports = { submitEnquiry };







// const Enquiry = require('../models/Enquiry');
// const sendMail = require('../utils/sendMail');

// async function submitEnquiry(req, res) {
//   try {
//     const { propertyName, contactName, name, phone, email, message } = req.body;
//     const finalContactName = contactName || name || 'Valued Visitor';
//     const finalPropertyName = propertyName || 'STC Living';

//     // 1. Save enquiry
//     const enquiry = Enquiry.create({ 
//       propertyName: finalPropertyName, 
//       contactName: finalContactName, 
//       phone, 
//       email, 
//       message 
//     });

//     const recipientEmail = process.env.NOTIFY_EMAIL || 'namratha@stcliving.in';

//     if (process.env.SMTP_USER && process.env.SMTP_PASS) {
//       try {
//         // Professional Plain Text Fallback
//         const textContent = `Client Enquiry\n\n` +
//           `Name: ${finalContactName}\n` +
//           `Phone: ${phone || 'N/A'}\n` +
//           `Email: ${email || 'N/A'}\n` +
//           `Property: ${finalPropertyName}\n` +
//           `Message: ${message || 'N/A'}\n`;

//         // Professional HTML Template
//         const htmlContent = `
//           <!DOCTYPE html>
//           <html>
//           <head>
//             <meta charset="utf-8">
//             <style>
//               body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f6f9; margin: 0; padding: 20px; color: #333333; }
//               .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border: 1px solid #e1e8ed; }
//               .header { background: #1a202c; color: #ffffff; padding: 24px 30px; text-align: left; }
//               .header h2 { margin: 0; font-size: 20px; font-weight: 600; letter-spacing: 0.5px; }
//               .header p { margin: 4px 0 0 0; font-size: 13px; color: #a0aec0; }
//               .content { padding: 30px; }
//               .table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
//               .table td { padding: 12px 0; border-bottom: 1px solid #edf2f7; font-size: 14px; }
//               .table td.label { font-weight: 600; color: #4a5568; width: 30%; }
//               .table td.value { color: #1a202c; font-weight: 500; }
//               .message-box { background: #f8fafc; border-left: 4px solid #3182ce; padding: 16px; border-radius: 0 6px 6px 0; margin-top: 10px; }
//               .message-box label { font-size: 12px; font-weight: 700; color: #4a5568; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 6px; }
//               .message-box p { margin: 0; font-size: 14px; color: #2d3748; line-height: 1.5; white-space: pre-line; }
//               .footer { background: #f7fafc; padding: 16px 30px; text-align: center; font-size: 12px; color: #a0aec0; border-top: 1px solid #edf2f7; }
//             </style>
//           </head>
//           <body>
//             <div class="container">
//               <div class="header">
//                 <h2>Client Enquiry</h2>
//                 <p>Received via STC Living Contact Form</p>
//               </div>
//               <div class="content">
//                 <table class="table">
//                   <tr>
//                     <td class="label">Customer Name</td>
//                     <td class="value">${finalContactName}</td>
//                   </tr>
//                   <tr>
//                     <td class="label">Phone Number</td>
//                     <td class="value"><a href="tel:${phone}" style="color: #3182ce; text-decoration: none;">${phone || 'N/A'}</a></td>
//                   </tr>
//                   <tr>
//                     <td class="label">Email Address</td>
//                     <td class="value"><a href="mailto:${email}" style="color: #3182ce; text-decoration: none;">${email || 'N/A'}</a></td>
//                   </tr>
//                   <tr>
//                     <td class="label">Property / Interest</td>
//                     <td class="value">${finalPropertyName}</td>
//                   </tr>
//                 </table>

//                 <div class="message-box">
//                   <label>Message / Note</label>
//                   <p>${message || 'No additional message provided.'}</p>
//                 </div>
//               </div>
//               <div class="footer">
//                 STC Living Automated Notification Service
//               </div>
//             </div>
//           </body>
//           </html>
//         `;

//         await sendMail({
//           to: recipientEmail,
//           subject: `New Enquiry: ${finalContactName} (${finalPropertyName})`,
//           text: textContent,
//           html: htmlContent
//         });

//       } catch (mailErr) {
//         console.error('❌ Email notification failed:', mailErr);
//       }
//     }

//     return res.status(201).json({ success: true, enquiry });
//   } catch (err) {
//     console.error('❌ Controller error:', err);
//     return res.status(500).json({ success: false, error: 'Could not process enquiry' });
//   }
// }

// module.exports = { submitEnquiry };




const Enquiry = require('../models/Enquiry');
const sendMail = require('../utils/sendMail');

async function submitEnquiry(req, res) {
  try {
    const { propertyName, contactName, name, phone, email, message } = req.body;
    const finalContactName = contactName || name || 'Valued Visitor';
    const finalPropertyName = propertyName || 'STC Living';

    // 1. Save enquiry
    const enquiry = Enquiry.create({ 
      propertyName: finalPropertyName, 
      contactName: finalContactName, 
      phone, 
      email, 
      message 
    });

    const recipientEmail = process.env.NOTIFY_EMAIL || 'namratha@stcliving.in';

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        // Professional Plain Text Fallback
        const textContent = `New Client Enquiry\n\n` +
          `Name: ${finalContactName}\n` +
          `Phone: ${phone || 'N/A'}\n` +
          `Email: ${email || 'N/A'}\n` +
          `Property: ${finalPropertyName}\n` +
          `Message: ${message || 'N/A'}\n`;

        // Professional HTML Template
        const htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f6f9; margin: 0; padding: 20px; color: #333333; }
              .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border: 1px solid #e1e8ed; }
              .header { background: #1a202c; color: #ffffff; padding: 24px 30px; text-align: left; }
              .header h2 { margin: 0; font-size: 20px; font-weight: 600; letter-spacing: 0.5px; }
              .header p { margin: 4px 0 0 0; font-size: 13px; color: #a0aec0; }
              .content { padding: 30px; }
              .table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
              .table td { padding: 12px 0; border-bottom: 1px solid #edf2f7; font-size: 14px; }
              .table td.label { font-weight: 600; color: #4a5568; width: 30%; }
              .table td.value { color: #1a202c; font-weight: 500; }
              .message-box { background: #f8fafc; border-left: 4px solid #3182ce; padding: 16px; border-radius: 0 6px 6px 0; margin-top: 10px; }
              .message-box label { font-size: 12px; font-weight: 700; color: #4a5568; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 6px; }
              .message-box p { margin: 0; font-size: 14px; color: #2d3748; line-height: 1.5; white-space: pre-line; }
              .footer { background: #f7fafc; padding: 16px 30px; text-align: center; font-size: 12px; color: #a0aec0; border-top: 1px solid #edf2f7; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>New Client Enquiry Notification</h2>
                <p>Submitted via STC Living Official Portal</p>
              </div>
              <div class="content">
                <table class="table">
                  <tr>
                    <td class="label">Customer Name</td>
                    <td class="value">${finalContactName}</td>
                  </tr>
                  <tr>
                    <td class="label">Phone Number</td>
                    <td class="value"><a href="tel:${phone}" style="color: #3182ce; text-decoration: none;">${phone || 'N/A'}</a></td>
                  </tr>
                  <tr>
                    <td class="label">Email Address</td>
                    <td class="value"><a href="mailto:${email}" style="color: #3182ce; text-decoration: none;">${email || 'N/A'}</a></td>
                  </tr>
                  <tr>
                    <td class="label">Property / Interest</td>
                    <td class="value">${finalPropertyName}</td>
                  </tr>
                </table>

                <div class="message-box">
                  <label>Customer Message</label>
                  <p>${message || 'No additional message provided.'}</p>
                </div>
              </div>
              <div class="footer">
                STC Living — Automated System Notification
              </div>
            </div>
          </body>
          </html>
        `;

        await sendMail({
          to: recipientEmail,
          subject: `New Client Enquiry: ${finalContactName} — ${finalPropertyName}`,
          text: textContent,
          html: htmlContent
        });

      } catch (mailErr) {
        console.error('❌ Email notification failed:', mailErr);
      }
    }

    return res.status(201).json({ success: true, enquiry });
  } catch (err) {
    console.error('❌ Controller error:', err);
    return res.status(500).json({ success: false, error: 'Could not process enquiry' });
  }
}

module.exports = { submitEnquiry };