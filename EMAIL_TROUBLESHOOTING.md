# Email Troubleshooting Guide

## Current Issue: Emails Not Being Sent

### Problem
Assessment completion emails are not being delivered because SMTP credentials were not configured properly.

### Solution Applied
Commented out placeholder SMTP credentials in `.env` file. The system now runs in **test mode**.

---

## Current Setup (Test Mode)

**Status**: ✅ Emails are being logged to console with preview URLs

When you complete an assessment, check your **server console** for:
```
⚠️  Email service: No SMTP configured - emails will be logged only
   Configure SMTP_USER and SMTP_PASS in .env to send real emails

📧 transactional email sent successfully: <message-id>
Preview URL: https://ethereal.email/message/xxxxx
```

**To view test emails**:
1. Complete an assessment
2. Check server console for `Preview URL`
3. Click the URL to view the email in browser

---

## Setup Real Email Delivery (Gmail)

### Step 1: Enable 2-Factor Authentication
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification**

### Step 2: Generate App Password
1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. Select **Mail** and **Other (Custom name)**
3. Name it "MENTIS Backend"
4. Click **Generate**
5. **Copy the 16-character password** (you won't see it again)

### Step 3: Update .env File
```bash
# Uncomment and update these lines in backend/.env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-actual-email@gmail.com      # Your Gmail address
SMTP_PASS=xxxx xxxx xxxx xxxx               # The app password from Step 2
ADMIN_EMAIL=your-actual-email@gmail.com     # Where admin notifications go
FRONTEND_URL=http://localhost:5173          # Your frontend URL
```

### Step 4: Restart Server
```bash
cd backend
npm start
```

You should see:
```
📧 Email service: Using configured SMTP
✔ MongoDB Connected: ...
✔ Server running in development mode on port 5000
```

### Step 5: Test
1. Complete an assessment
2. Check your inbox for emails:
   - "Assessment Submitted - Results Coming Soon"
   - "Your Career Report is Ready!"
3. Check admin email for notification

---

## Alternative: Use SendGrid (Recommended for Production)

### Why SendGrid?
- More reliable than Gmail
- Higher sending limits
- Better deliverability
- Free tier: 100 emails/day

### Setup:
1. Sign up at [SendGrid](https://sendgrid.com/)
2. Create API key
3. Update `.env`:
```bash
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

---

## Troubleshooting

### Issue: "Invalid login" error
**Solution**: 
- Verify 2FA is enabled on Gmail
- Regenerate app password
- Make sure you copied the password correctly (no spaces)
- Try removing spaces: `SMTP_PASS=xxxxxxxxxxxxxxxx`

### Issue: Emails going to spam
**Solution**:
- Use SendGrid or professional email service
- Set up SPF/DKIM records (production only)
- Avoid using Gmail for production

### Issue: "Connection timeout"
**Solution**:
- Check firewall isn't blocking port 587
- Try port 465 with `secure: true`
- Verify internet connection

### Issue: Emails still not sending
**Check**:
1. Server console for error messages
2. User exists and has email address
3. SMTP credentials are correct
4. No typos in .env variable names

---

## Email Flow After Assessment

When a user completes the assessment, **3 emails are triggered**:

1. **Assessment Submitted** (to user)
   - Confirms submission received
   - "Your results are being processed"

2. **Career Report Ready** (to user)
   - Includes download link to results
   - "Your report is ready to view"

3. **Admin Notification** (to admin email)
   - User completed assessment
   - Includes user details and result ID

---

## Verification Checklist

After configuring SMTP, verify:

- [ ] Server starts without errors
- [ ] Console shows "Using configured SMTP"
- [ ] Complete test assessment
- [ ] User receives 2 emails (submitted + report ready)
- [ ] Admin receives notification email
- [ ] Links in emails work correctly
- [ ] Emails don't go to spam

---

## Quick Test Command

Test email sending without completing full assessment:

```javascript
// In backend directory
node -e "
require('dotenv').config();
const { sendAssessmentSubmittedEmail } = require('./src/services/emailService');
sendAssessmentSubmittedEmail('Test User', 'your-email@example.com')
  .then(r => console.log('✅ Email sent:', r))
  .catch(e => console.error('❌ Error:', e));
"
```

---

**Need Help?**
- Check server console for detailed error messages
- Review [EMAIL_SETUP_GUIDE.md](./EMAIL_SETUP_GUIDE.md)
- Contact: tech@mentisera.pk
