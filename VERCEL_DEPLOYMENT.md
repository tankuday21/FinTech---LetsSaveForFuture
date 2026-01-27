# Vercel Deployment Guide

## Part 1: Deploy Your App to Vercel

### Step 1: Prepare Your Project

1. **Make sure your code is pushed to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Create vercel.json in root directory** (already done below)

### Step 2: Deploy Frontend (React App)

1. **Go to Vercel**: https://vercel.com
2. **Sign up/Login** with GitHub
3. **Click "Add New Project"**
4. **Import your GitHub repository**: `FinTech---LetsSaveForFuture`
5. **Configure Project**:
   - **Framework Preset**: Create React App
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

6. **Add Environment Variables**:
   Click "Environment Variables" and add:
   ```
   REACT_APP_SUPABASE_URL = https://xjvkbjopptkfgbapgjel.supabase.co
   REACT_APP_SUPABASE_ANON_KEY = your_anon_key_here
   ```

7. **Click "Deploy"** 🚀

### Step 3: Deploy Backend (Node.js API)

1. **Create a new project** in Vercel
2. **Import same repository**
3. **Configure Project**:
   - **Framework Preset**: Other
   - **Root Directory**: `server`
   - **Build Command**: Leave empty
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

4. **Add Environment Variables**:
   ```
   PORT = 5000
   SUPABASE_URL = https://xjvkbjopptkfgbapgjel.supabase.co
   SUPABASE_SERVICE_KEY = your_service_key_here
   ```

5. **Click "Deploy"**

### Step 4: Update Frontend to Use Deployed Backend

After backend is deployed, you'll get a URL like: `https://your-backend.vercel.app`

Update your frontend environment variables:
- Go to your frontend project in Vercel
- Settings → Environment Variables
- Add: `REACT_APP_API_URL = https://your-backend.vercel.app`

---

## Part 2: Connect Custom Domain

### Option A: Buy Domain Through Vercel (Easiest)

1. **Go to your project** in Vercel Dashboard
2. **Click "Settings"** → **"Domains"**
3. **Click "Buy a domain"**
4. **Search for your domain** (e.g., finlearn.io)
5. **Complete purchase** (Vercel handles everything automatically)
6. **Done!** Domain is automatically configured ✅

**Pros**: Zero configuration, instant setup, managed by Vercel
**Cons**: Slightly more expensive than other registrars

---

### Option B: Buy Domain from External Registrar (Namecheap, GoDaddy, etc.)

#### Step 1: Buy Your Domain

Popular registrars:
- **Namecheap** (recommended, affordable)
- **GoDaddy**
- **Google Domains**
- **Hostinger**

#### Step 2: Add Domain to Vercel

1. **Go to Vercel Dashboard** → Your Project
2. **Click "Settings"** → **"Domains"**
3. **Enter your domain** (e.g., finlearn.io)
4. **Click "Add"**

Vercel will show you DNS records to configure.

#### Step 3: Configure DNS Records

**For Root Domain (finlearn.io):**

Go to your domain registrar's DNS settings and add:

**Type**: A Record
**Name**: @ (or leave blank)
**Value**: `76.76.21.21`
**TTL**: Automatic or 3600

**For www Subdomain (www.finlearn.io):**

**Type**: CNAME
**Name**: www
**Value**: `cname.vercel-dns.com`
**TTL**: Automatic or 3600

#### Step 4: Wait for DNS Propagation

- Usually takes 5-30 minutes
- Can take up to 48 hours in rare cases
- Check status in Vercel Dashboard

#### Step 5: Enable HTTPS (Automatic)

Vercel automatically provisions SSL certificate once DNS is configured.

---

## Part 3: Specific Registrar Instructions

### Namecheap:

1. Login to Namecheap
2. Go to **Domain List** → Click **Manage** on your domain
3. Go to **Advanced DNS** tab
4. Click **Add New Record**
5. Add the A and CNAME records from above
6. Save changes

### GoDaddy:

1. Login to GoDaddy
2. Go to **My Products** → **Domains**
3. Click **DNS** next to your domain
4. Click **Add** to add new records
5. Add the A and CNAME records
6. Save

### Google Domains:

1. Login to Google Domains
2. Click on your domain
3. Go to **DNS** tab
4. Scroll to **Custom resource records**
5. Add the A and CNAME records
6. Save

---

## Part 4: Update Supabase Configuration

After your domain is live:

1. **Go to Supabase Dashboard**
2. **Authentication** → **URL Configuration**
3. **Update Site URL** to: `https://yourdomain.com`
4. **Add Redirect URLs**:
   - `https://yourdomain.com/dashboard`
   - `https://yourdomain.com/reset-password`
   - `https://www.yourdomain.com/dashboard` (if using www)

---

## Part 5: Verify Deployment

### Check Frontend:
- Visit: `https://yourdomain.com`
- Should see login page
- Check browser console for errors

### Check Backend:
- Visit: `https://your-backend.vercel.app/api/health`
- Should return: `{"status":"ok","message":"Server is running"}`

### Test Authentication:
1. Try signing up with a test email
2. Check browser console for logs
3. Verify user appears in Supabase Dashboard

---

## Troubleshooting

### Issue: "Domain not found"
**Solution**: DNS not propagated yet. Wait 30 minutes and try again.

### Issue: "Invalid Host header"
**Solution**: Vercel handles this automatically. If issue persists, check your vercel.json configuration.

### Issue: Environment variables not working
**Solution**: 
- Redeploy after adding environment variables
- Make sure variables start with `REACT_APP_` for frontend
- Check spelling and values

### Issue: 404 on page refresh
**Solution**: Already handled by vercel.json rewrites configuration.

### Issue: CORS errors
**Solution**: Update backend CORS configuration to allow your domain.

---

## Cost Breakdown

### Vercel:
- **Hobby Plan**: FREE
  - Unlimited deployments
  - Automatic HTTPS
  - 100GB bandwidth/month
  - Perfect for hackathons and small projects

- **Pro Plan**: $20/month (only if you need more)

### Domain:
- **.io domain**: $30-40/year
- **.com domain**: $10-15/year
- **.app domain**: $15-20/year
- **.co domain**: $20-30/year

### Total Cost:
- **Free tier**: $0 (using Vercel subdomain)
- **With custom domain**: $10-40/year (domain only)

---

## Quick Commands Reference

```bash
# Push to GitHub
git add .
git commit -m "Deploy to Vercel"
git push origin main

# Check deployment status
# Go to: https://vercel.com/dashboard

# View logs
# Vercel Dashboard → Your Project → Deployments → Click deployment → View Logs
```

---

## Next Steps After Deployment

1. ✅ Test all features on production
2. ✅ Enable email confirmation in Supabase
3. ✅ Set up custom email templates
4. ✅ Add analytics (Google Analytics, Vercel Analytics)
5. ✅ Set up error monitoring (Sentry)
6. ✅ Configure rate limiting
7. ✅ Add SEO meta tags
8. ✅ Create favicon and social media preview images

---

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Vercel Support**: https://vercel.com/support
- **Domain Help**: Contact your registrar's support

Good luck with your deployment! 🚀
