# 📧 Email Configuration Guide

## Current Status
⚠️ **Email service is NOT configured** - Emails are being logged but not sent

## Quick Setup (Gmail)

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to **Security** → **2-Step Verification**
3. Follow the prompts to enable 2FA

### Step 2: Generate App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Select app: **Mail**
3. Select device: **Other (Custom name)**
4. Enter name: **MENTIS Backend**
5. Click **Generate**
6. Copy the 16-character password (format: xxxx xxxx xxxx xxxx)

### Step 3: Update .env File
Open `backend/.env` and update these values:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-actual-email@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx
ADMIN_EMAIL=your-admin-email@gmail.com
```

### Step 4: Restart Backend Server
```bash
cd backend
npm start
```

---

## Alternative: Using Ethereal (Testing Only)

If you just want to test email functionality without sending real emails:

1. Go to: https://ethereal.email/
2. Click **Create Ethereal Account**
3. Copy the credentials
4. Update `.env`:
   ```env
   SMTP_HOST=smtp.ethereal.email
   SMTP_PORT=587
   SMTP_USER=your-ethereal-username
   SMTP_PASS=your-ethereal-password
   ```
5. Emails will be captured at: https://ethereal.email/messages

---

## Verify Email is Working

After configuration, test by:
1. Signing up a new user
2. Check terminal logs for: `📧 Email sent successfully to: user@example.com`
3. Check inbox (or Ethereal) for welcome email

---

## Troubleshooting

### "Invalid login" error
- Make sure 2FA is enabled
- Use App Password, not your regular Gmail password
- Remove any spaces in the app password

### "Connection timeout"
- Check firewall/antivirus settings
- Try using port 465 with `secure: true`

### Emails going to spam
- Add SPF/DKIM records (for production)
- Use a professional email address
- Consider using SendGrid or AWS SES for production

---

## Production Recommendations

For production deployment, use a professional email service:
- **SendGrid** (free tier: 100 emails/day)
- **AWS SES** (very cheap, reliable)
- **Mailgun** (good deliverability)

These services provide better deliverability and analytics.
