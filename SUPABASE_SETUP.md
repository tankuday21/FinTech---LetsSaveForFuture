# Supabase Setup Guide

## Step 1: Enable Email Authentication

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `xjvkbjopptkfgbapgjel`
3. Navigate to **Authentication** → **Providers**
4. Find **Email** provider and ensure it's **ENABLED**
5. Configure the following settings:

### Email Provider Settings:
- **Enable Email provider**: ✅ ON
- **Confirm email**: You can disable this for testing (enable for production)
- **Secure email change**: Recommended to enable
- **Secure password change**: Recommended to enable

## Step 2: Configure Email Templates (Optional for Testing)

1. Go to **Authentication** → **Email Templates**
2. You can customize:
   - Confirmation email
   - Magic Link email
   - Password reset email

## Step 3: Configure Site URL

1. Go to **Authentication** → **URL Configuration**
2. Set **Site URL** to: `http://localhost:3000`
3. Add **Redirect URLs**:
   - `http://localhost:3000/dashboard`
   - `http://localhost:3000/reset-password`

## Step 4: Test Authentication

### Test Signup:
1. Go to http://localhost:3000/signup
2. Fill in the form with a valid email
3. Click "Create account"
4. Check browser console for logs
5. Check Supabase Dashboard → Authentication → Users to see if user was created

### Test Login:
1. Go to http://localhost:3000/login
2. Use the credentials you just created
3. You should be redirected to /dashboard

## Troubleshooting

### Issue: "Email not confirmed"
**Solution**: 
- Go to Supabase Dashboard → Authentication → Providers → Email
- Disable "Confirm email" for testing
- OR check your email inbox for confirmation link

### Issue: "Invalid login credentials"
**Solution**:
- Make sure the user exists in Supabase Dashboard → Authentication → Users
- Check if email confirmation is required
- Verify password is correct (minimum 6 characters)

### Issue: "User already registered"
**Solution**:
- The email is already in use
- Try logging in instead
- OR use a different email

### Issue: Environment variables not loading
**Solution**:
- Restart the development server: `npm run dev`
- Verify `client/.env` file exists and has correct values
- Check that variables start with `REACT_APP_`

## Verify Connection

Open browser console and check for:
- ✅ "Supabase connected successfully!"
- ✅ "Signup successful:" or "Login successful:"
- ❌ Any error messages

## Current Configuration

Your Supabase project:
- **URL**: https://xjvkbjopptkfgbapgjel.supabase.co
- **Project**: xjvkbjopptkfgbapgjel
- **Region**: Check your Supabase dashboard

## Next Steps After Setup

Once authentication is working:
1. Enable email confirmation for production
2. Customize email templates
3. Set up proper redirect URLs for production domain
4. Configure password requirements
5. Set up rate limiting
