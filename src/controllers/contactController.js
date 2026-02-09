const { sendEmail, emailTemplates } = require('../services/emailService');

// Handle contact form submission
const submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address'
      });
    }

    // Send auto-reply to user
    const autoReplyTemplate = emailTemplates.contactAutoReply(name);
    await sendEmail(email, autoReplyTemplate);

    // Send notification to admin
    const adminNotificationTemplate = emailTemplates.contactAdminNotification(
      name,
      email,
      subject,
      message
    );
    await sendEmail(
      process.env.ADMIN_EMAIL || 'support@mentisera.pk',
      adminNotificationTemplate
    );

    // Save contact submission to database (optional)
    // You can add a Contact model and save the submission here

    res.status(200).json({
      success: true,
      message: 'Message sent successfully! We will get back to you soon.'
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.'
    });
  }
};

// Send PDF via email
const sendPDFEmail = async (req, res) => {
  try {
    const { name, email, documentType, pdfBuffer } = req.body;

    if (!name || !email || !documentType) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and document type are required'
      });
    }

    const pdfTemplate = emailTemplates.pdfDelivery(name, documentType, pdfBuffer);
    const result = await sendEmail(email, pdfTemplate);

    if (result.success) {
      res.status(200).json({
        success: true,
        message: 'PDF sent to your email successfully!'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to send PDF. Please try again.'
      });
    }
  } catch (error) {
    console.error('PDF email error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send PDF email'
    });
  }
};

module.exports = {
  submitContactForm,
  sendPDFEmail
};
