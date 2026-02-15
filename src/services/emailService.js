const nodemailer = require('nodemailer');
const { templates } = require('./emailTemplates');

/**
 * Email Service for MENTIS AI
 * Handles all transactional and promotional email sending
 */

// Email type definitions
const EMAIL_TYPES = {
  TRANSACTIONAL: 'transactional', // System emails - cannot unsubscribe
  PROMOTIONAL: 'promotional'        // Marketing emails - opt-in only
};

// Email configuration
const createTransporter = () => {
  // Check if SMTP credentials are provided
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    // Use configured SMTP (works in both dev and production)
    console.log('📧 Email service: Using configured SMTP');
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  } else {
    // Fallback: Create test account on the fly for development
    console.log('⚠️  Email service: No SMTP configured - emails will be logged only');
    console.log('   Configure SMTP_USER and SMTP_PASS in .env to send real emails');
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: 'test@mentisera.pk',
        pass: 'testpassword',
      },
    });
  }
};

// Send email function
const sendEmail = async (to, template, emailType = EMAIL_TYPES.TRANSACTIONAL) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: '"MENTIS Career Guide" <hello@mentisera.pk>',
      to: to,
      subject: template.subject,
      html: template.html,
      attachments: template.attachments || []
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log(`📧 ${emailType} email sent successfully:`, info.messageId);
    
    // For development, log the preview URL
    if (process.env.NODE_ENV !== 'production') {
      console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    }
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email sending error:', error);
   return { success: false, error: error.message };
  }
};

/**
 * PHASE 2: Transactional Email Functions
 */

// T1: Welcome + Email Verification Email
const sendWelcomeVerificationEmail = async (name, email, verificationToken) => {
  const verificationUrl = `${process.env.FRONTEND_URL || 'https://mentis-ai-tau.vercel.app'}/auth/verify?token=${verificationToken}`;
  const template = templates.welcomeVerification(name, verificationUrl);
  return await sendEmail(email, template, EMAIL_TYPES.TRANSACTIONAL);
};

// T3: Account Created Confirmation Email
const sendAccountCreatedEmail = async (name, email) => {
  const template = templates.accountCreated(name);
  return await sendEmail(email, template, EMAIL_TYPES.TRANSACTIONAL);
};

// T5: Assessment Started Email
const sendAssessmentStartedEmail = async (name, email) => {
  const template = templates.assessmentStarted(name);
  return await sendEmail(email, template, EMAIL_TYPES.TRANSACTIONAL);
};

// T7: Assessment Submitted Email
const sendAssessmentSubmittedEmail = async (name, email) => {
  const submittedAt = new Date().toLocaleString();
  const template = templates.assessmentSubmitted(name, submittedAt);
  return await sendEmail(email, template, EMAIL_TYPES.TRANSACTIONAL);
};

// T10: Career Report Ready Email (with PDF)
const sendCareerReportEmail = async (name, email, pdfBuffer = null, reportUrl = null) => {
  const template = templates.careerReportReady(name, pdfBuffer, reportUrl);
  return await sendEmail(email, template, EMAIL_TYPES.TRANSACTIONAL);
};

/**
 * PHASE 4: Admin Notification Functions
 */

// Admin notification: New user signup
const sendAdminSignupNotification = async (userName, userEmail, userId) => {
  const template = templates.adminSignupNotification(userName, userEmail, userId);
  const adminEmail = process.env.ADMIN_EMAIL || 'support@mentisera.pk';
  return await sendEmail(adminEmail, template, EMAIL_TYPES.TRANSACTIONAL);
};

// Admin notification: Assessment completed
const sendAdminAssessmentNotification = async (userName, userEmail, userId, resultId) => {
  const template = templates.adminAssessmentNotification(userName, userEmail, userId, resultId);
  const adminEmail = process.env.ADMIN_EMAIL || 'support@mentisera.pk';
  return await sendEmail(adminEmail, template, EMAIL_TYPES.TRANSACTIONAL);
};

/**
 * Legacy functions - kept for backward compatibility
 * These will be deprecated in favor of the new template system
 */

// Legacy: Simple welcome email (deprecated - use sendWelcomeVerificationEmail instead)
const sendWelcomeEmail = async (name, email) => {
  console.warn('⚠️  sendWelcomeEmail is deprecated. Use sendWelcomeVerificationEmail instead.');
  // For now, send account created email as fallback
  return await sendAccountCreatedEmail(name, email);
};

// Legacy: Assessment results email (deprecated - use sendCareerReportEmail instead)
const sendAssessmentResultsEmail = async (name, email, pdfBuffer) => {
  console.warn('⚠️  sendAssessmentResultsEmail is deprecated. Use sendCareerReportEmail instead.');
  return await sendCareerReportEmail(name, email, pdfBuffer);
};

module.exports = {
  // Email type constants
  EMAIL_TYPES,
  
  // Core email function
  sendEmail,
  
  // New MVP email functions
  sendWelcomeVerificationEmail,
  sendAccountCreatedEmail,
  sendAssessmentStartedEmail,
  sendAssessmentSubmittedEmail,
  sendCareerReportEmail,
  sendAdminSignupNotification,
  sendAdminAssessmentNotification,
  
  // Legacy functions (for backward compatibility)
  sendWelcomeEmail,
  sendAssessmentResultsEmail
};
