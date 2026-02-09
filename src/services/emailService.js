const nodemailer = require('nodemailer');

// Email configuration
const createTransporter = () => {
  // Check if SMTP credentials are provided
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    // Use configured SMTP (works in both dev and production)
    console.log('📧 Email service: Using configured SMTP');
    return nodemailer.createTransporter({
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
    return nodemailer.createTransporter({
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

// Email templates
const emailTemplates = {
  welcomeEmail: (name, email) => ({
    subject: 'Welcome to MENTIS - Your AI Career Guide',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #334155; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e2e8f0; }
            .footer { background: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%); color: white; text-decoration: none; border-radius: 8px; margin: 20px 0; }
            .feature-box { background: #f1f5f9; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #14b8a6; }
            h1 { margin: 0; font-size: 24px; }
            h2 { color: #14b8a6; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Welcome to MENTIS!</h1>
              <p style="margin: 5px 0 0 0;">AI-Powered Career Guidance Platform</p>
            </div>
            <div class="content">
              <p>Dear ${name},</p>
              <p>Welcome to <strong>MENTIS</strong> - your personal AI-powered career co-pilot! We're thrilled to have you on board.</p>
              
              <h2>What You Can Do Now</h2>
              <div class="feature-box">
                <strong>📝 Take Your Career Assessment</strong><br>
                Answer psychometric questions to discover careers that match your strengths and interests.
              </div>
              <div class="feature-box">
                <strong>🎯 Get Personalized Recommendations</strong><br>
                Receive AI-powered career suggestions based on your unique profile.
              </div>
              <div class="feature-box">
                <strong>🛤️ Explore Learning Paths</strong><br>
                Access 90-day roadmaps with actionable steps to achieve your career goals.
              </div>
              <div class="feature-box">
                <strong>📊 Track Your Progress</strong><br>
                Monitor your career exploration journey in your dashboard.
              </div>

              <div style="text-align: center;">
                <a href="https://mentis-ai-tau.vercel.app/dashboard" class="button">Go to Dashboard</a>
              </div>

              <p><strong>Need Help?</strong><br>
              If you have any questions, feel free to contact us at <a href="mailto:support@mentis.app" style="color: #14b8a6;">support@mentis.app</a></p>
              
              <p>Best regards,<br><strong>The MENTIS Team</strong></p>
            </div>
            <div class="footer">
              <p>© 2026 MENTIS. Powered by MENTISERA (SMC-Private) Limited</p>
              <p><a href="https://mentisera.pk" style="color: #14b8a6;">mentisera.pk</a> | SECP Registration No: 0312201</p>
            </div>
          </div>
        </body>
      </html>
    `
  }),

  assessmentResultsEmail: (name, email, pdfAttachment) => ({
    subject: '🎉 Your MENTIS Career Assessment Results Are Ready!',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #334155; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e2e8f0; }
            .footer { background: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%); color: white; text-decoration: none; border-radius: 8px; margin: 20px 0; }
            .highlight-box { background: linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
            h1 { margin: 0; font-size: 24px; }
            h2 { color: #14b8a6; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📊 Your Results Are Ready!</h1>
            </div>
            <div class="content">
              <p>Dear ${name},</p>
              <p>Congratulations on completing your <strong>MENTIS Career Assessment</strong>! 🎉</p>
              
              <div class="highlight-box">
                <h2 style="color: white; margin-top: 0;">Your Personalized Career Report</h2>
                <p style="margin: 10px 0;">Your detailed assessment report is attached to this email.</p>
              </div>

              <h2>What's Inside Your Report:</h2>
              <ul>
                <li>✅ <strong>Your Strengths & Interests</strong> - Understand what makes you unique</li>
                <li>🎯 <strong>Top Career Matches</strong> - AI-recommended careers aligned with your profile</li>
                <li>📚 <strong>Skills to Develop</strong> - Identify gaps and growth opportunities</li>
                <li>🛤️ <strong>90-Day Learning Roadmap</strong> - Actionable steps to achieve your goals</li>
              </ul>

              <h2>Next Steps:</h2>
              <ol>
                <li>📥 Download your report (attached as PDF)</li>
                <li>🔍 Explore recommended career paths in detail</li>
                <li>📖 Follow your personalized learning roadmap</li>
                <li>📈 Track your progress in your dashboard</li>
              </ol>

              <div style="text-align: center;">
                <a href="https://mentis-ai-tau.vercel.app/results" class="button">View Results Dashboard</a>
              </div>

              <p><strong>Questions or Need Guidance?</strong><br>
              Our team is here to help! Contact us at <a href="mailto:support@mentis.app" style="color: #14b8a6;">support@mentis.app</a></p>
              
              <p>Wishing you success on your career journey!<br><strong>The MENTIS Team</strong></p>
            </div>
            <div class="footer">
              <p>© 2026 MENTIS. Powered by MENTISERA (SMC-Private) Limited</p>
              <p><a href="https://mentisera.pk" style="color: #14b8a6;">mentisera.pk</a> | SECP Registration No: 0312201</p>
            </div>
          </div>
        </body>
      </html>
    `,
    attachments: pdfAttachment ? [{
      filename: 'MENTIS_Career_Assessment_Report.pdf',
      content: pdfAttachment,
      contentType: 'application/pdf'
    }] : []
  }),

  adminSignupNotification: (userName, userEmail, userId) => ({
    subject: `🆕 New User Signup - ${userName}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #334155; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e2e8f0; }
            .info-box { background: #f1f5f9; padding: 15px; border-radius: 8px; margin: 15px 0; }
            .label { font-weight: bold; color: #14b8a6; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 New User Registration</h1>
            </div>
            <div class="content">
              <h2 style="color: #14b8a6;">New User Details</h2>
              <div class="info-box">
                <p><span class="label">Name:</span> ${userName}</p>
                <p><span class="label">Email:</span> <a href="mailto:${userEmail}">${userEmail}</a></p>
                <p><span class="label">User ID:</span> ${userId}</p>
                <p><span class="label">Registered:</span> ${new Date().toLocaleString()}</p>
              </div>
              <p><em>Welcome email has been sent to the user automatically.</em></p>
            </div>
          </div>
        </body>
      </html>
    `
  }),

  adminAssessmentNotification: (userName, userEmail, userId, resultId) => ({
    subject: `📊 Assessment Completed - ${userName}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #334155; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e2e8f0; }
            .info-box { background: #f1f5f9; padding: 15px; border-radius: 8px; margin: 15px 0; }
            .label { font-weight: bold; color: #14b8a6; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📝 Assessment Completed</h1>
            </div>
            <div class="content">
              <h2 style="color: #14b8a6;">User Activity</h2>
              <div class="info-box">
                <p><span class="label">User:</span> ${userName}</p>
                <p><span class="label">Email:</span> <a href="mailto:${userEmail}">${userEmail}</a></p>
                <p><span class="label">User ID:</span> ${userId}</p>
                <p><span class="label">Result ID:</span> ${resultId}</p>
                <p><span class="label">Completed:</span> ${new Date().toLocaleString()}</p>
              </div>
              <p><em>Assessment results and PDF report have been sent to the user via email.</em></p>
            </div>
          </div>
        </body>
      </html>
    `
  }),

  contactAutoReply: (name) => ({
    subject: 'Thank you for contacting MENTIS',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #334155; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e2e8f0; }
            .footer { background: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%); color: white; text-decoration: none; border-radius: 8px; margin: 20px 0; }
            h1 { margin: 0; font-size: 24px; }
            h2 { color: #14b8a6; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>MENTIS</h1>
              <p style="margin: 5px 0 0 0;">Career Guidance Platform</p>
            </div>
            <div class="content">
              <h2>Thank You for Reaching Out!</h2>
              <p>Dear ${name},</p>
              <p>We have received your message and appreciate you taking the time to contact us. Our team will review your inquiry and get back to you within 24-48 hours.</p>
              <p>In the meantime, feel free to explore our platform:</p>
              <ul>
                <li><strong>Take Assessment:</strong> Discover your ideal career paths</li>
                <li><strong>Explore Learning Paths:</strong> Access curated educational resources</li>
                <li><strong>View Career Guides:</strong> Learn about different career options</li>
              </ul>
              <a href="http://localhost:5173/dashboard" class="button">Visit Your Dashboard</a>
              <p>If you have any urgent concerns, please call us at <strong>+92 300 123 4567</strong></p>
              <p>Best regards,<br><strong>The MENTIS Team</strong></p>
            </div>
            <div class="footer">
              <p>Powered by MENTISERA | <a href="https://mentisera.pk" style="color: #14b8a6;">mentisera.pk</a></p>
              <p>This is an automated message. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `
  }),

  contactAdminNotification: (name, email, subject, message) => ({
    subject: `New Contact Form Submission from ${name}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #334155; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e2e8f0; }
            .info-box { background: #f1f5f9; padding: 15px; border-radius: 8px; margin: 15px 0; }
            .label { font-weight: bold; color: #14b8a6; }
            h2 { color: #14b8a6; margin-top: 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔔 New Contact Form Submission</h1>
            </div>
            <div class="content">
              <h2>Contact Details</h2>
              <div class="info-box">
                <p><span class="label">Name:</span> ${name}</p>
                <p><span class="label">Email:</span> <a href="mailto:${email}">${email}</a></p>
                <p><span class="label">Subject:</span> ${subject}</p>
                <p><span class="label">Submitted:</span> ${new Date().toLocaleString()}</p>
              </div>
              <h2>Message</h2>
              <div class="info-box">
                <p>${message}</p>
              </div>
              <p><em>Auto-reply has been sent to the user.</em></p>
            </div>
          </div>
        </body>
      </html>
    `
  }),

  pdfDelivery: (name, documentType, pdfBuffer) => ({
    subject: `Your ${documentType} from MENTIS`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #334155; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e2e8f0; }
            .footer { background: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-radius: 0 0 10px 10px; }
            h2 { color: #14b8a6; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📄 Your Document is Ready</h1>
            </div>
            <div class="content">
              <p>Dear ${name},</p>
              <p>Thank you for downloading <strong>${documentType}</strong> from MENTIS. Your document is attached to this email.</p>
              <p>We hope this resource helps you in your career planning journey!</p>
              <p>Best regards,<br><strong>The MENTIS Team</strong></p>
            </div>
            <div class="footer">
              <p>Powered by MENTISERA | <a href="https://mentisera.pk" style="color: #14b8a6;">mentisera.pk</a></p>
            </div>
          </div>
        </body>
      </html>
    `,
    attachments: pdfBuffer ? [{
      filename: `${documentType.replace(/\s+/g, '_')}.pdf`,
      content: pdfBuffer
    }] : []
  })
};

// Send email function
const sendEmail = async (to, template, attachments = []) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: '"MENTIS Career Guidance" <noreply@mentisera.pk>',
      to: to,
      subject: template.subject,
      html: template.html,
      attachments: template.attachments || attachments
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', info.messageId);
    
    // For development, log the preview URL
    if (process.env.NODE_ENV !== 'production') {
      console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    }
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
};

// Convenience functions for common email operations
const sendWelcomeEmail = async (name, email) => {
  const template = emailTemplates.welcomeEmail(name, email);
  return await sendEmail(email, template);
};

const sendAssessmentResultsEmail = async (name, email, pdfBuffer) => {
  const template = emailTemplates.assessmentResultsEmail(name, email, pdfBuffer);
  return await sendEmail(email, template);
};

const sendAdminSignupNotification = async (userName, userEmail, userId) => {
  const template = emailTemplates.adminSignupNotification(userName, userEmail, userId);
  const adminEmail = process.env.ADMIN_EMAIL || 'support@mentisera.pk';
  return await sendEmail(adminEmail, template);
};

const sendAdminAssessmentNotification = async (userName, userEmail, userId, resultId) => {
  const template = emailTemplates.adminAssessmentNotification(userName, userEmail, userId, resultId);
  const adminEmail = process.env.ADMIN_EMAIL || 'support@mentisera.pk';
  return await sendEmail(adminEmail, template);
};

module.exports = {
  sendEmail,
  emailTemplates,
  sendWelcomeEmail,
  sendAssessmentResultsEmail,
  sendAdminSignupNotification,
  sendAdminAssessmentNotification
};
