const EventEmitter = require('events');
const {
  sendWelcomeVerificationEmail,
  sendAccountCreatedEmail,
  sendAssessmentStartedEmail,
  sendAssessmentSubmittedEmail,
  sendCareerReportEmail,
  sendAdminSignupNotification,
  sendAdminAssessmentNotification,
  EMAIL_TYPES
} = require('./emailService');

/**
 * Email Event System for MENTIS AI  
 * Provides clean event-based email triggering
 * Decouples email sending from business logic
 */

class EmailEventEmitter extends EventEmitter {}

const emailEvents = new EmailEventEmitter();

// Event type constants
const EVENTS = {
  USER_REGISTERED: 'user.registered',
  EMAIL_VERIFIED: 'user.email_verified',
  ASSESSMENT_STARTED: 'assessment.started',
  ASSESSMENT_SUBMITTED: 'assessment.submitted',
  REPORT_READY: 'report.ready',
  ADMIN_SIGNUP: 'admin.user_signup',
  ADMIN_ASSESSMENT: 'admin.assessment_completed'
};

/**
 * Event Listeners - Map events to email functions
 */

// USER_REGISTERED: Send welcome + verification email
emailEvents.on(EVENTS.USER_REGISTERED, async (data) => {
  const { name, email, verificationToken } = data;
  try {
    await sendWelcomeVerificationEmail(name, email, verificationToken);
    console.log(`✅ [${EVENTS.USER_REGISTERED}] Welcome verification email sent to ${email}`);
  } catch (error) {
    console.error(`❌ [${EVENTS.USER_REGISTERED}] Failed to send email:`, error);
  }
});

// EMAIL_VERIFIED: Send account created confirmation
emailEvents.on(EVENTS.EMAIL_VERIFIED, async (data) => {
  const { name, email } = data;
  try {
    await sendAccountCreatedEmail(name, email);
    console.log(`✅ [${EVENTS.EMAIL_VERIFIED}] Account created email sent to ${email}`);
  } catch (error) {
    console.error(`❌ [${EVENTS.EMAIL_VERIFIED}] Failed to send email:`, error);
  }
});

// ASSESSMENT_STARTED: Send assessment started email
emailEvents.on(EVENTS.ASSESSMENT_STARTED, async (data) => {
  const { name, email } = data;
  try {
    await sendAssessmentStartedEmail(name, email);
    console.log(`✅ [${EVENTS.ASSESSMENT_STARTED}] Assessment started email sent to ${email}`);
  } catch (error) {
    console.error(`❌ [${EVENTS.ASSESSMENT_STARTED}] Failed to send email:`, error);
  }
});

// ASSESSMENT_SUBMITTED: Send assessment submitted email
emailEvents.on(EVENTS.ASSESSMENT_SUBMITTED, async (data) => {
  const { name, email } = data;
  try {
    await sendAssessmentSubmittedEmail(name, email);
    console.log(`✅ [${EVENTS.ASSESSMENT_SUBMITTED}] Assessment submitted email sent to ${email}`);
  } catch (error) {
    console.error(`❌ [${EVENTS.ASSESSMENT_SUBMITTED}] Failed to send email:`, error);
  }
});

// REPORT_READY: Send career report ready email
emailEvents.on(EVENTS.REPORT_READY, async (data) => {
  const { name, email, pdfBuffer, reportUrl } = data;
  try {
    await sendCareerReportEmail(name, email, pdfBuffer, reportUrl);
    console.log(`✅ [${EVENTS.REPORT_READY}] Career report email sent to ${email}`);
  } catch (error) {
    console.error(`❌ [${EVENTS.REPORT_READY}] Failed to send email:`, error);
  }
});

// ADMIN_SIGNUP: Notify admin of new user
emailEvents.on(EVENTS.ADMIN_SIGNUP, async (data) => {
  const { userName, userEmail, userId } = data;
  try {
    await sendAdminSignupNotification(userName, userEmail, userId);
    console.log(`✅ [${EVENTS.ADMIN_SIGNUP}] Admin notification sent for user ${userId}`);
  } catch (error) {
    console.error(`❌ [${EVENTS.ADMIN_SIGNUP}] Failed to send notification:`, error);
  }
});

// ADMIN_ASSESSMENT: Notify admin of assessment completion
emailEvents.on(EVENTS.ADMIN_ASSESSMENT, async (data) => {
  const { userName, userEmail, userId, resultId } = data;
  try {
    await sendAdminAssessmentNotification(userName, userEmail, userId, resultId);
    console.log(`✅ [${EVENTS.ADMIN_ASSESSMENT}] Admin notification sent for result ${resultId}`);
  } catch (error) {
    console.error(`❌ [${EVENTS.ADMIN_ASSESSMENT}] Failed to send notification:`, error);
  }
});

/**
 * Helper functions to emit events
 * These provide a cleaner API for triggering emails
 */

const emailEventHelpers = {
  /**
   * Trigger welcome + verification email
   */
  onUserRegistered: (name, email, verificationToken) => {
    emailEvents.emit(EVENTS.USER_REGISTERED, { name, email, verificationToken });
    emailEvents.emit(EVENTS.ADMIN_SIGNUP, { userName: name, userEmail: email, userId: 'pending' });
  },

  /**
   * Trigger account created confirmation
   */
  onEmailVerified: (name, email) => {
    emailEvents.emit(EVENTS.EMAIL_VERIFIED, { name, email });
  },

  /**
   * Trigger assessment started email
   */
  onAssessmentStarted: (name, email) => {
    emailEvents.emit(EVENTS.ASSESSMENT_STARTED, { name, email });
  },

  /**
   * Trigger assessment submitted email
   */
  onAssessmentSubmitted: (name, email) => {
    emailEvents.emit(EVENTS.ASSESSMENT_SUBMITTED, { name, email });
  },

  /**
   * Trigger career report ready email
   */
  onReportReady: (name, email, pdfBuffer = null, reportUrl = null) => {
    emailEvents.emit(EVENTS.REPORT_READY, { name, email, pdfBuffer, reportUrl });
  },

  /**
   * Trigger admin signup notification
   */
  onAdminSignup: (userName, userEmail, userId) => {
    emailEvents.emit(EVENTS.ADMIN_SIGNUP, { userName, userEmail, userId });
  },

  /**
   * Trigger admin assessment notification
   */
  onAdminAssessment: (userName, userEmail, userId, resultId) => {
    emailEvents.emit(EVENTS.ADMIN_ASSESSMENT, { userName, userEmail, userId, resultId });
  }
};

/**
 * Event logging for debugging
 */
if (process.env.NODE_ENV !== 'production') {
  emailEvents.on('newListener', (event) => {
    console.log(`📧 Email event listener added: ${event}`);
  });
}

module.exports = {
  emailEvents,
  EVENTS,
  emailEventHelpers,
  EMAIL_TYPES
};
