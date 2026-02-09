const express = require('express');
const router = express.Router();
const { submitContactForm, sendPDFEmail } = require('../controllers/contactController');

// POST /api/contact - Submit contact form
router.post('/', submitContactForm);

// POST /api/contact/send-pdf - Send PDF via email
router.post('/send-pdf', sendPDFEmail);

module.exports = router;
