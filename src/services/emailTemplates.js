/**
 * Email Templates for MENTIS AI
 * System-wide consistent email layout and templates
 */

/**
 * Main email layout wrapper
 * All emails use this consistent layout for branding
 */
const emailLayout = (content, options = {}) => {
  const {
    showDashboardCTA = false,
    dashboardUrl = 'https://mentis-ai-tau.vercel.app/dashboard',
    includeUnsubscribe = false,
    unsubscribeUrl = null,
    emailType = 'transactional' // 'transactional' or 'promotional'
  } = options;

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MENTIS Career Guide</title>
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; 
            line-height: 1.6; 
            color: #334155; 
            background-color: #f8fafc;
            margin: 0;
            padding: 0;
          }
          .email-container { 
            max-width: 600px; 
            margin: 20px auto; 
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header { 
            background: linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%); 
            color: white; 
            padding: 40px 30px; 
            text-align: center;
          }
          .header-logo {
            font-size: 28px;
            font-weight: 700;
            margin: 0 0 8px 0;
            letter-spacing: -0.5px;
          }
          .header-tagline {
            font-size: 14px;
            margin: 0;
            opacity: 0.95;
            font-weight: 400;
          }
          .content { 
            background: #ffffff; 
            padding: 40px 30px;
          }
          .footer { 
            background: #f1f5f9; 
            padding: 30px; 
            text-align: center; 
            font-size: 13px; 
            color: #64748b; 
            border-top: 1px solid #e2e8f0;
          }
          .button { 
            display: inline-block; 
            padding: 14px 32px; 
            background: linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%); 
            color: white !important; 
            text-decoration: none; 
            border-radius: 8px; 
            margin: 20px 0;
            font-weight: 600;
            font-size: 16px;
            transition: transform 0.2s;
          }
          .button:hover {
            transform: translateY(-2px);
          }
          .footer-links {
            margin: 15px 0;
          }
          .footer-links a {
            color: #14b8a6;
            text-decoration: none;
            margin: 0 10px;
          }
          .footer-links a:hover {
            text-decoration: underline;
          }
          .security-notice {
            background: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 12px 16px;
            margin: 20px 0;
            border-radius: 4px;
            font-size: 14px;
          }
          .unsubscribe {
            margin-top: 15px;
            font-size: 12px;
            color: #94a3b8;
          }
          .unsubscribe a {
            color: #64748b;
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <!-- Header -->
          <div class="header">
            <div class="header-logo">MENTIS Career Guide</div>
            <div class="header-tagline">by MENTISERA • Career decisions, backed by data.</div>
          </div>

          <!-- Main Content -->
          <div class="content">
            ${content}
            
            ${showDashboardCTA ? `
              <div style="text-align: center; margin-top: 30px;">
                <a href="${dashboardUrl}" class="button">Open Dashboard</a>
                <p style="font-size: 14px; color: #64748b; margin-top: 10px;">
                  Or visit: <a href="${dashboardUrl}" style="color: #14b8a6;">${dashboardUrl}</a>
                </p>
              </div>
            ` : ''}
          </div>

          <!-- Footer -->
          <div class="footer">
            <div style="margin-bottom: 15px;">
              <strong>MENTIS</strong> - AI-Powered Career Guidance Platform
            </div>
            
            <div class="footer-links">
              <a href="https://mentis-ai-tau.vercel.app/privacy-policy">Privacy Policy</a> •
              <a href="https://mentis-ai-tau.vercel.app/terms-and-conditions">Terms & Conditions</a> •
              <a href="https://mentis-ai-tau.vercel.app/contact">Contact</a>
            </div>

            <div style="margin-top: 15px; color: #94a3b8;">
              Support: <a href="mailto:support@mentisera.pk" style="color: #14b8a6;">support@mentisera.pk</a>
            </div>

            <div style="margin-top: 20px; font-size: 12px; color: #94a3b8;">
              © ${new Date().getFullYear()} MENTIS. Powered by MENTISERA (SMC-Private) Limited<br>
              SECP Registration No: 0312201 | <a href="https://mentisera.pk" style="color: #14b8a6;">mentisera.pk</a>
            </div>

            ${includeUnsubscribe && unsubscribeUrl ? `
              <div class="unsubscribe">
                <a href="${unsubscribeUrl}">Unsubscribe from promotional emails</a>
              </div>
            ` : ''}

            ${!includeUnsubscribe && emailType === 'transactional' ? `
              <div style="margin-top: 15px; font-size: 11px; color: #94a3b8;">
                <div class="security-notice">
                  🔒 <strong>Security Notice:</strong> This is a transactional email regarding your account activity. 
                  You cannot unsubscribe from these important system notifications.
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      </body>
    </html>
  `;
};

/**
 * Email template definitions
 */
const templates = {
  /**
   * T1: Welcome + Email Verification Email
   * Trigger: User signup
   */
  welcomeVerification: (name, verificationUrl) => {
    const content = `
      <h1 style="color: #14b8a6; margin-top: 0;">Welcome to MENTIS, ${name}! 🎉</h1>
      
      <p style="font-size: 16px;">
        Thank you for joining <strong>MENTIS</strong> - your AI-powered career co-pilot. 
        We're excited to help you discover and achieve your career potential!
      </p>

      <div style="background: #f0fdfa; border-left: 4px solid #14b8a6; padding: 20px; margin: 25px 0; border-radius: 4px;">
        <h3 style="margin-top: 0; color: #14b8a6;">📧 Verify Your Email Address</h3>
        <p style="margin-bottom: 15px;">
          To activate your account and access all features, please verify your email address:
        </p>
        <div style="text-align: center;">
          <a href="${verificationUrl}" class="button" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%); color: white !important; text-decoration: none; border-radius: 8px; font-weight: 600;">
            Verify Email Address
          </a>
        </div>
        <p style="margin-top: 15px; font-size: 14px; color: #64748b;">
          Or copy and paste this link: <br>
          <a href="${verificationUrl}" style="color: #14b8a6; word-break: break-all;">${verificationUrl}</a>
        </p>
      </div>

      <div class="security-notice">
        <strong>🔒 Security:</strong> This link expires in 24 hours. If you didn't create this account, please ignore this email.
      </div>

      <h3 style="color: #14b8a6;">What You Can Do After Verification:</h3>
      <ul style="line-height: 1.8;">
        <li>📝 <strong>Take Career Assessment</strong> - Discover careers matching your strengths</li>
        <li>🎯 <strong>Get AI Recommendations</strong> - Personalized career suggestions</li>
        <li>🛤️ <strong>Access Learning Paths</strong> - 90-day roadmaps to your goals</li>
        <li>📊 <strong>Track Your Progress</strong> - Monitor your career journey</li>
      </ul>

      <p>Need help? Contact us at <a href="mailto:support@mentisera.pk" style="color: #14b8a6;">support@mentisera.pk</a></p>
      
      <p>
        Best regards,<br>
        <strong>The MENTIS Team</strong>
      </p>
    `;

    return {
      subject: 'Welcome to MENTIS - Verify Your Email',
      html: emailLayout(content, { emailType: 'transactional' })
    };
  },

  /**
   * T3: Account Created Confirmation Email
   * Trigger: Email verified OR signup completion
   */
  accountCreated: (name) => {
    const content = `
      <h1 style="color: #14b8a6; margin-top: 0;">✅ Your Account is Ready!</h1>
      
      <p style="font-size: 16px;">
        Hi ${name},
      </p>

      <p>
        Great news! Your <strong>MENTIS</strong> account has been successfully created and verified. 
        You now have full access to our AI-powered career guidance platform.
      </p>

      <div style="background: linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%); color: white; padding: 25px; border-radius: 8px; text-align: center; margin: 25px 0;">
        <h2 style="color: white; margin: 0 0 10px 0;">🚀 You're All Set!</h2>
        <p style="margin: 0; opacity: 0.95;">Your personalized career journey starts now</p>
      </div>

      <h3 style="color: #14b8a6;">Next Steps:</h3>
      <ol style="line-height: 2;">
        <li><strong>Take Your Career Assessment</strong><br>
          <span style="color: #64748b; font-size: 14px;">Answer 30 psychometric questions to discover your ideal careers</span>
        </li>
        <li><strong>Review Your Results</strong><br>
          <span style="color: #64748b; font-size: 14px;">Get AI-powered recommendations based on your unique profile</span>
        </li>
        <li><strong>Explore Learning Paths</strong><br>
          <span style="color: #64748b; font-size: 14px;">Access curated 90-day roadmaps with actionable steps</span>
        </li>
        <li><strong>Track Your Progress</strong><br>
          <span style="color: #64748b; font-size: 14px;">Monitor milestones and achievements in your dashboard</span>
        </li>
      </ol>

      <p>
        Questions or need guidance? We're here to help at 
        <a href="mailto:support@mentisera.pk" style="color: #14b8a6;">support@mentisera.pk</a>
      </p>
      
      <p>
        Welcome aboard!<br>
        <strong>The MENTIS Team</strong>
      </p>
    `;

    return {
      subject: '✅ Your MENTIS Account is Active',
      html: emailLayout(content, { 
        showDashboardCTA: true,
        emailType: 'transactional'
      })
    };
  },

  /**
   * T5: Assessment Started Email
   * Trigger: User begins assessment
   */
  assessmentStarted: (name) => {
    const content = `
      <h1 style="color: #14b8a6; margin-top: 0;">📝 Assessment Started</h1>
      
      <p style="font-size: 16px;">
        Hi ${name},
      </p>

      <p>
        You've started your <strong>MENTIS Career Assessment</strong>. Great first step toward discovering your ideal career path!
      </p>

      <div style="background: #f0f9ff; border-left: 4px solid #06b6d4; padding: 20px; margin: 25px 0; border-radius: 4px;">
        <h3 style="margin-top: 0; color: #06b6d4;">💡 Good to Know</h3>
        <ul style="margin: 0; padding-left: 20px;">
          <li><strong>Your progress is automatically saved</strong> - Feel free to take breaks</li>
          <li><strong>30 questions total</strong> - Takes about 10-15 minutes</li>
          <li><strong>No right or wrong answers</strong> - Answer honestly for best results</li>
          <li><strong>Results are instant</strong> - Get your report immediately after completion</li>
        </ul>
      </div>

      <h3 style="color: #14b8a6;">What Happens After You Submit:</h3>
      <ol style="line-height: 2;">
        <li>✅ Instant AI-powered career analysis</li>
        <li>📊 Personalized career recommendations</li>
        <li>📄 Downloadable PDF report</li>
        <li>🛤️ Access to tailored learning paths</li>
      </ol>

      <p>
        Need help completing the assessment? Contact us at 
        <a href="mailto:support@mentisera.pk" style="color: #14b8a6;">support@mentisera.pk</a>
      </p>
      
      <p>
        Good luck!<br>
        <strong>The MENTIS Team</strong>
      </p>
    `;

    return {
      subject: '📝 Your MENTIS Assessment is In Progress',
      html: emailLayout(content, { 
        showDashboardCTA: true,
        dashboardUrl: 'https://mentis-ai-tau.vercel.app/assessment',
        emailType: 'transactional'
      })
    };
  },

  /**
   * T7: Assessment Submitted Email
   * Trigger: User submits assessment (before results are ready)
   */
  assessmentSubmitted: (name, submittedAt) => {
    const content = `
      <h1 style="color: #14b8a6; margin-top: 0;">🎉 Assessment Submitted!</h1>
      
      <p style="font-size: 16px;">
        Hi ${name},
      </p>

      <p>
        Congratulations on completing your <strong>MENTIS Career Assessment</strong>! 
        Your responses have been successfully submitted.
      </p>

      <div style="background: linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%); color: white; padding: 25px; border-radius: 8px; text-align: center; margin: 25px 0;">
        <h2 style="color: white; margin: 0 0 10px 0;">✨ Submitted Successfully</h2>
        <p style="margin: 0; opacity: 0.95;">Submitted on: ${submittedAt}</p>
      </div>

      <div style="background: #f0f9ff; border-left: 4px solid #06b6d4; padding: 20px; margin: 25px 0; border-radius: 4px;">
        <h3 style="margin-top: 0; color: #06b6d4;">📊 Your Results Are Being Processed</h3>
        <p style="margin: 0;">
          Our AI is analyzing your responses to generate personalized career recommendations. 
          Your detailed report will be available in your dashboard shortly.
        </p>
      </div>

      <h3 style="color: #14b8a6;">What's Included in Your Report:</h3>
      <ul style="line-height: 1.8;">
        <li>📈 <strong>RIASEC Profile Analysis</strong> - Your personality-career fit scores</li>
        <li>🎯 <strong>Top Career Matches</strong> - AI-recommended careers aligned with your profile</li>
        <li>💪 <strong>Strengths & Interests</strong> - What makes you unique</li>
        <li>🛤️ <strong>Learning Roadmaps</strong> - 90-day actionable plans</li>
        <li>📚 <strong>Skill Development Guide</strong> - Areas to focus on</li>
      </ul>

      <p>
        You'll receive another email once your comprehensive report is ready to download.
      </p>
      
      <p>
        Thank you for using MENTIS!<br>
        <strong>The MENTIS Team</strong>
      </p>
    `;

    return {
      subject: '🎉 Assessment Submitted - Results Coming Soon',
      html: emailLayout(content, { 
        showDashboardCTA: true,
        dashboardUrl: 'https://mentis-ai-tau.vercel.app/results',
        emailType: 'transactional'
      })
    };
  },

  /**
   * T10: Career Report Ready Email (PDF Delivery)
   * Trigger: Assessment result generated
   */
  careerReportReady: (name, pdfBuffer = null, reportUrl = null) => {
    const content = `
      <h1 style="color: #14b8a6; margin-top: 0;">🎉 Your Career Report is Ready!</h1>
      
      <p style="font-size: 16px;">
        Hi ${name},
      </p>

      <p>
        <strong>Exciting news!</strong> Your personalized MENTIS Career Assessment Report has been generated 
        and is ready for you to explore.
      </p>

      <div style="background: linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%); color: white; padding: 30px; border-radius: 8px; text-align: center; margin: 25px 0;">
        <h2 style="color: white; margin: 0 0 15px 0;">📊 Your Personalized Career Report</h2>
        ${pdfBuffer ? `
          <p style="margin: 0; opacity: 0.95;">Your PDF report is attached to this email</p>
        ` : reportUrl ? `
          <div style="margin-top: 20px;">
            <a href="${reportUrl}" style="display: inline-block; padding: 12px 28px; background: white; color: #14b8a6; text-decoration: none; border-radius: 8px; font-weight: 600;">
              Download Your Report
            </a>
          </div>
        ` : ''}
      </div>

      <h3 style="color: #14b8a6;">📄 What's Inside Your Report:</h3>
      <ul style="line-height: 1.8;">
        <li><strong>RIASEC Profile Analysis</strong> - Your personality-career compatibility scores</li>
        <li><strong>Top 5 Career Recommendations</strong> - AI-matched careers based on your strengths</li>
        <li><strong>Detailed Career Descriptions</strong> - What each career entails</li>
        <li><strong>Skills Assessment</strong> - Your current strengths and areas for development</li>
        <li><strong>90-Day Learning Roadmap</strong> - Actionable steps to achieve your goals</li>
        <li><strong>Recommended Resources</strong> - Courses, certifications, and learning materials</li>
      </ul>

      <h3 style="color: #14b8a6;">🚀 Next Steps:</h3>
      <ol style="line-height: 2;">
        <li><strong>Review Your Report</strong><br>
          <span style="color: #64748b; font-size: 14px;">Understand your career matches and why they fit your profile</span>
        </li>
        <li><strong>Explore Learning Paths</strong><br>
          <span style="color: #64748b; font-size: 14px;">Access detailed roadmaps for your top career choices</span>
        </li>
        <li><strong>Start Taking Action</strong><br>
          <span style="color: #64748b; font-size: 14px;">Follow the recommended steps in your 90-day plan</span>
        </li>
        <li><strong>Track Your Progress</strong><br>
          <span style="color: #64748b; font-size: 14px;">Use your dashboard to monitor milestones and achievements</span>
        </li>
      </ol>

      <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 25px 0; border-radius: 4px;">
        <strong>💡 Pro Tip:</strong> Share your results with parents, teachers, or career counselors 
        to get additional guidance and support on your journey.
      </div>

      <p>
        Have questions about your results? We're here to help at 
        <a href="mailto:support@mentisera.pk" style="color: #14b8a6;">support@mentisera.pk</a>
      </p>
      
      <p>
        Wishing you success on your career journey!<br>
        <strong>The MENTIS Team</strong>
      </p>
    `;

    return {
      subject: '🎉 Your MENTIS Career Report is Ready!',
      html: emailLayout(content, { 
        showDashboardCTA: true,
        dashboardUrl: 'https://mentis-ai-tau.vercel.app/results',
        emailType: 'transactional'
      }),
      attachments: pdfBuffer ? [{
        filename: 'MENTIS_Career_Assessment_Report.pdf',
        content: pdfBuffer,
        contentType: 'application/pdf'
      }] : []
    };
  },

  /**
   * Admin notification templates
   */
  adminSignupNotification: (userName, userEmail, userId) => {
    const content = `
      <h2 style="color: #14b8a6; margin-top: 0;">🆕 New User Registration</h2>
      
      <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #14b8a6; font-weight: bold; width: 30%;">Name:</td>
            <td style="padding: 8px 0;">${userName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #14b8a6; font-weight: bold;">Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${userEmail}" style="color: #06b6d4;">${userEmail}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #14b8a6; font-weight: bold;">User ID:</td>
            <td style="padding: 8px 0;"><code style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px;">${userId}</code></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #14b8a6; font-weight: bold;">Registered:</td>
            <td style="padding: 8px 0;">${new Date().toLocaleString()}</td>
          </tr>
        </table>
      </div>

      <p style="font-style: italic; color: #64748b;">
        ✅ Welcome email with verification link has been sent to the user.
      </p>
    `;

    return {
      subject: `🆕 New User Signup - ${userName}`,
      html: emailLayout(content, { emailType: 'transactional' })
    };
  },

  adminAssessmentNotification: (userName, userEmail, userId, resultId) => {
    const content = `
      <h2 style="color: #14b8a6; margin-top: 0;">📊 Assessment Completed</h2>
      
      <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #14b8a6; font-weight: bold; width: 30%;">User:</td>
            <td style="padding: 8px 0;">${userName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #14b8a6; font-weight: bold;">Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${userEmail}" style="color: #06b6d4;">${userEmail}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #14b8a6; font-weight: bold;">User ID:</td>
            <td style="padding: 8px 0;"><code style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px;">${userId}</code></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #14b8a6; font-weight: bold;">Result ID:</td>
            <td style="padding: 8px 0;"><code style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px;">${resultId}</code></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #14b8a6; font-weight: bold;">Completed:</td>
            <td style="padding: 8px 0;">${new Date().toLocaleString()}</td>
          </tr>
        </table>
      </div>

      <p style="font-style: italic; color: #64748b;">
        ✅ Assessment results and PDF report have been sent to the user via email.
      </p>
    `;

    return {
      subject: `📊 Assessment Completed - ${userName}`,
      html: emailLayout(content, { emailType: 'transactional' })
    };
  },

  /**
   * PDF Delivery Email
   * Trigger: User requests PDF report via email
   */
  pdfDelivery: (name, documentType) => {
    const content = `
      <h1 style="color: #14b8a6; margin-top: 0;">Your ${documentType} is Ready! 📄</h1>
      
      <p style="font-size: 16px;">
        Hi <strong>${name}</strong>,
      </p>

      <p>
        Your <strong>${documentType}</strong> has been generated and is attached to this email.
      </p>

      <div style="background: #f0fdfa; border-left: 4px solid #14b8a6; padding: 20px; margin: 25px 0; border-radius: 4px;">
        <p style="margin: 0;">
          📎 <strong>Attachment:</strong> ${documentType}.pdf
        </p>
      </div>

      <p style="color: #64748b;">
        If you have any questions about your report or need assistance, please don't hesitate to reach out to our support team.
      </p>

      <p style="margin-top: 30px;">
        Best regards,<br>
        <strong>The MENTIS Team</strong>
      </p>
    `;

    return {
      subject: `📄 Your ${documentType} is Ready - MENTIS`,
      html: emailLayout(content, { emailType: 'transactional' })
    };
  }
};

module.exports = {
  emailLayout,
  templates
};
