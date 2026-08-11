// // const express = require('express');
// // const router = express.Router();
// // const { body } = require('express-validator');
// // const { submitEnquiry } = require('../controllers/contactController');
// // const validateRequest = require('../middleware/validateRequest');
// // const { contactLimiter } = require('../middleware/rateLimiter');

// // /**
// //  * POST /api/contact
// //  * Body: { propertyName, contactName, phone, email, message }
// //  */
// // router.post(
// //   '/',
// //   contactLimiter,
// //   [
// //     body('contactName').trim().notEmpty().withMessage('Name is required'),
// //     body('email').trim().isEmail().withMessage('A valid email is required'),
// //     body('phone').trim().notEmpty().withMessage('Phone number is required'),
// //     body('propertyName').optional().trim(),
// //     body('message').optional().trim()
// //   ],
// //   validateRequest,
// //   submitEnquiry
// // );

// // module.exports = router;




// const express = require('express');
// const router = express.Router();
// const { body } = require('express-validator');
// const { submitEnquiry } = require('../controllers/contactController');
// const validateRequest = require('../middleware/validateRequest');
// const { contactLimiter } = require('../middleware/rateLimiter');

// router.post(
//   '/',
//   contactLimiter,
//   [
//     // Accept either 'contactName' or 'name' from the frontend
//     body().custom((value, { req }) => {
//       if (!req.body.contactName && !req.body.name) {
//         throw new Error('Name is required');
//       }
//       return true;
//     }),
//     body('email').trim().isEmail().withMessage('A valid email is required'),
//     body('phone').trim().notEmpty().withMessage('Phone number is required'),
//     body('propertyName').optional().trim(),
//     body('message').optional().trim()
//   ],
//   validateRequest,
//   submitEnquiry
// );

// module.exports = router;





const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { submitEnquiry } = require('../controllers/contactController');
const validateRequest = require('../middleware/validateRequest');
const { contactLimiter } = require('../middleware/rateLimiter');

router.post(
  '/',
  contactLimiter,
  [
    // Accept either 'contactName' or 'name' from frontend
    body().custom((value, { req }) => {
      if (!req.body.contactName && !req.body.name) {
        throw new Error('Name is required');
      }
      return true;
    }),
    body('email').trim().isEmail().withMessage('A valid email is required'),
    // Made optional so missing phone fields won't throw a 400 error
    body('phone').optional().trim(),
    body('propertyName').optional().trim(),
    body('message').optional().trim()
  ],
  validateRequest,
  submitEnquiry
);

module.exports = router;