# Custom Email Templates for Supabase

## Step 1: Update Site URL in Supabase

1. Go to **Supabase Dashboard**: https://supabase.com/dashboard/project/xjvkbjopptkfgbapgjel
2. Click **Authentication** → **URL Configuration**
3. Update **Site URL** to your Vercel URL:
   - Example: `https://your-app.vercel.app`
   - Or your custom domain: `https://finlearn.io`
4. Add **Redirect URLs**:
   - `https://your-app.vercel.app/dashboard`
   - `https://your-app.vercel.app/*` (wildcard for all routes)

---

## Step 2: Customize Email Templates

Go to **Supabase Dashboard** → **Authentication** → **Email Templates**

### 📧 Confirm Signup Email Template

**Subject**: Welcome to FinLearn - Confirm Your Email 🎉

**Body (HTML)**:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #f5f7fa;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
      padding: 40px 30px;
      text-align: center;
    }
    .logo {
      font-size: 32px;
      font-weight: bold;
      color: #ffffff;
      margin: 0;
      letter-spacing: -0.5px;
    }
    .content {
      padding: 40px 30px;
    }
    .title {
      font-size: 24px;
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 16px 0;
    }
    .text {
      font-size: 16px;
      line-height: 1.6;
      color: #475569;
      margin: 0 0 24px 0;
    }
    .button {
      display: inline-block;
      padding: 14px 32px;
      background-color: #0ea5e9;
      color: #ffffff;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      margin: 8px 0;
      box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
    }
    .button:hover {
      background-color: #0284c7;
    }
    .features {
      background-color: #f8fafc;
      border-radius: 12px;
      padding: 24px;
      margin: 24px 0;
    }
    .feature-item {
      display: flex;
      align-items: start;
      margin-bottom: 16px;
    }
    .feature-icon {
      width: 24px;
      height: 24px;
      background-color: #e0f2fe;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 12px;
      flex-shrink: 0;
    }
    .feature-text {
      font-size: 14px;
      color: #475569;
      line-height: 1.5;
    }
    .footer {
      padding: 30px;
      text-align: center;
      background-color: #f8fafc;
      border-top: 1px solid #e2e8f0;
    }
    .footer-text {
      font-size: 14px;
      color: #64748b;
      margin: 0;
    }
    .divider {
      height: 1px;
      background-color: #e2e8f0;
      margin: 24px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1 class="logo">FinLearn</h1>
    </div>

    <!-- Content -->
    <div class="content">
      <h2 class="title">Welcome to FinLearn! 🎉</h2>
      
      <p class="text">
        Hi there! We're excited to have you join our community of learners mastering personal finance and investing.
      </p>

      <p class="text">
        To get started, please confirm your email address by clicking the button below:
      </p>

      <div style="text-align: center; margin: 32px 0;">
        <a href="{{ .ConfirmationURL }}" class="button">Confirm Email Address</a>
      </div>

      <p class="text" style="font-size: 14px; color: #64748b;">
        Or copy and paste this link into your browser:<br>
        <span style="color: #0ea5e9; word-break: break-all;">{{ .ConfirmationURL }}</span>
      </p>

      <div class="divider"></div>

      <!-- Features -->
      <div class="features">
        <h3 style="font-size: 18px; color: #1e293b; margin: 0 0 16px 0;">What's waiting for you:</h3>
        
        <div class="feature-item">
          <div class="feature-icon">📚</div>
          <div class="feature-text">
            <strong>Interactive Learning Modules</strong><br>
            Master budgeting, saving, investing, and wealth management
          </div>
        </div>

        <div class="feature-item">
          <div class="feature-icon">🎮</div>
          <div class="feature-text">
            <strong>Gamified Challenges</strong><br>
            Earn points, unlock achievements, and compete with others
          </div>
        </div>

        <div class="feature-item">
          <div class="feature-icon">📈</div>
          <div class="feature-text">
            <strong>Real-World Simulations</strong><br>
            Practice investing with virtual money in realistic scenarios
          </div>
        </div>
      </div>

      <p class="text" style="margin-top: 24px;">
        If you didn't create an account with FinLearn, you can safely ignore this email.
      </p>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p class="footer-text">
        © 2025 FinLearn. All rights reserved.<br>
        Building financial literacy, one learner at a time.
      </p>
    </div>
  </div>
</body>
</html>
```

---

### 🔐 Reset Password Email Template

**Subject**: Reset Your FinLearn Password

**Body (HTML)**:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #f5f7fa;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
      padding: 40px 30px;
      text-align: center;
    }
    .logo {
      font-size: 32px;
      font-weight: bold;
      color: #ffffff;
      margin: 0;
      letter-spacing: -0.5px;
    }
    .content {
      padding: 40px 30px;
    }
    .title {
      font-size: 24px;
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 16px 0;
    }
    .text {
      font-size: 16px;
      line-height: 1.6;
      color: #475569;
      margin: 0 0 24px 0;
    }
    .button {
      display: inline-block;
      padding: 14px 32px;
      background-color: #0ea5e9;
      color: #ffffff;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      margin: 8px 0;
      box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
    }
    .alert-box {
      background-color: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 16px;
      border-radius: 8px;
      margin: 24px 0;
    }
    .alert-text {
      font-size: 14px;
      color: #92400e;
      margin: 0;
    }
    .footer {
      padding: 30px;
      text-align: center;
      background-color: #f8fafc;
      border-top: 1px solid #e2e8f0;
    }
    .footer-text {
      font-size: 14px;
      color: #64748b;
      margin: 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1 class="logo">FinLearn</h1>
    </div>

    <!-- Content -->
    <div class="content">
      <h2 class="title">Reset Your Password 🔐</h2>
      
      <p class="text">
        We received a request to reset your password for your FinLearn account.
      </p>

      <p class="text">
        Click the button below to create a new password:
      </p>

      <div style="text-align: center; margin: 32px 0;">
        <a href="{{ .ConfirmationURL }}" class="button">Reset Password</a>
      </div>

      <p class="text" style="font-size: 14px; color: #64748b;">
        Or copy and paste this link into your browser:<br>
        <span style="color: #0ea5e9; word-break: break-all;">{{ .ConfirmationURL }}</span>
      </p>

      <div class="alert-box">
        <p class="alert-text">
          <strong>⚠️ Security Notice:</strong><br>
          This link will expire in 1 hour. If you didn't request a password reset, please ignore this email or contact support if you have concerns.
        </p>
      </div>

      <p class="text">
        For your security, we recommend choosing a strong password that:
      </p>
      <ul style="color: #475569; font-size: 14px; line-height: 1.8;">
        <li>Is at least 8 characters long</li>
        <li>Contains uppercase and lowercase letters</li>
        <li>Includes numbers and special characters</li>
        <li>Is unique to FinLearn</li>
      </ul>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p class="footer-text">
        © 2025 FinLearn. All rights reserved.<br>
        Building financial literacy, one learner at a time.
      </p>
    </div>
  </div>
</body>
</html>
```

---

### ✨ Magic Link Email Template

**Subject**: Your FinLearn Login Link

**Body (HTML)**:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #f5f7fa;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
      padding: 40px 30px;
      text-align: center;
    }
    .logo {
      font-size: 32px;
      font-weight: bold;
      color: #ffffff;
      margin: 0;
      letter-spacing: -0.5px;
    }
    .content {
      padding: 40px 30px;
    }
    .title {
      font-size: 24px;
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 16px 0;
    }
    .text {
      font-size: 16px;
      line-height: 1.6;
      color: #475569;
      margin: 0 0 24px 0;
    }
    .button {
      display: inline-block;
      padding: 14px 32px;
      background-color: #0ea5e9;
      color: #ffffff;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      margin: 8px 0;
      box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
    }
    .footer {
      padding: 30px;
      text-align: center;
      background-color: #f8fafc;
      border-top: 1px solid #e2e8f0;
    }
    .footer-text {
      font-size: 14px;
      color: #64748b;
      margin: 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1 class="logo">FinLearn</h1>
    </div>

    <!-- Content -->
    <div class="content">
      <h2 class="title">Your Login Link ✨</h2>
      
      <p class="text">
        Click the button below to securely log in to your FinLearn account:
      </p>

      <div style="text-align: center; margin: 32px 0;">
        <a href="{{ .ConfirmationURL }}" class="button">Log In to FinLearn</a>
      </div>

      <p class="text" style="font-size: 14px; color: #64748b;">
        This link will expire in 1 hour for security reasons.
      </p>

      <p class="text">
        If you didn't request this login link, you can safely ignore this email.
      </p>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p class="footer-text">
        © 2025 FinLearn. All rights reserved.<br>
        Building financial literacy, one learner at a time.
      </p>
    </div>
  </div>
</body>
</html>
```

---

## How to Apply These Templates:

1. **Go to Supabase Dashboard**
2. **Authentication** → **Email Templates**
3. **Select each template** (Confirm signup, Magic Link, Reset password)
4. **Copy the HTML code** from above
5. **Paste into the template editor**
6. **Update the subject line**
7. **Click "Save"**

---

## Important Variables:

Supabase uses these variables in templates:
- `{{ .ConfirmationURL }}` - The confirmation/action link
- `{{ .Token }}` - The token (if needed)
- `{{ .TokenHash }}` - Token hash (if needed)
- `{{ .SiteURL }}` - Your site URL

---

## Testing:

After updating:
1. Try signing up with a new email
2. Check your inbox
3. Verify the email looks professional
4. Click the confirmation link
5. Should redirect to your Vercel URL (not localhost)

---

## Pro Tips:

- Test emails in different email clients (Gmail, Outlook, etc.)
- Keep mobile responsiveness in mind
- Use inline CSS (already done above)
- Test all links before going live
- Consider adding your logo image URL in the header

Enjoy your beautiful, professional email templates! 🎨
