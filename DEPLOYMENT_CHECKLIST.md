# 🚀 Deployment Checklist

## Before Deployment

- [ ] Code is working locally
- [ ] All environment variables are documented
- [ ] Git repository is up to date
- [ ] `.env` files are in `.gitignore` (already done)
- [ ] Supabase authentication is configured and tested

## Vercel Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 2. Deploy Frontend
- [ ] Go to https://vercel.com
- [ ] Sign in with GitHub
- [ ] Click "Add New Project"
- [ ] Import `FinTech---LetsSaveForFuture` repository
- [ ] Set Root Directory: `client`
- [ ] Framework: Create React App
- [ ] Add environment variables:
  - `REACT_APP_SUPABASE_URL`
  - `REACT_APP_SUPABASE_ANON_KEY`
- [ ] Click Deploy
- [ ] Copy deployment URL (e.g., `your-app.vercel.app`)

### 3. Deploy Backend (Optional - if you need API)
- [ ] Create new project in Vercel
- [ ] Import same repository
- [ ] Set Root Directory: `server`
- [ ] Framework: Other
- [ ] Add environment variables:
  - `PORT`
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_KEY`
- [ ] Click Deploy

### 4. Custom Domain Setup

#### Option A: Buy through Vercel (Easiest)
- [ ] Go to Project Settings → Domains
- [ ] Click "Buy a domain"
- [ ] Search and purchase domain
- [ ] Done! (Auto-configured)

#### Option B: Use External Registrar
- [ ] Buy domain from Namecheap/GoDaddy/etc
- [ ] Add domain in Vercel (Settings → Domains)
- [ ] Copy DNS records from Vercel
- [ ] Add DNS records to your registrar:
  - A Record: @ → 76.76.21.21
  - CNAME: www → cname.vercel-dns.com
- [ ] Wait 5-30 minutes for DNS propagation
- [ ] Verify domain is working

### 5. Update Supabase
- [ ] Go to Supabase Dashboard
- [ ] Authentication → URL Configuration
- [ ] Update Site URL to your domain
- [ ] Add redirect URLs:
  - `https://yourdomain.com/dashboard`
  - `https://yourdomain.com/reset-password`

### 6. Test Production
- [ ] Visit your domain
- [ ] Test signup
- [ ] Test login
- [ ] Test forgot password
- [ ] Test dashboard access
- [ ] Check browser console for errors
- [ ] Test on mobile device

## Post-Deployment

- [ ] Enable email confirmation in Supabase (for production)
- [ ] Set up custom email templates
- [ ] Add Google Analytics (optional)
- [ ] Add favicon
- [ ] Test all features thoroughly
- [ ] Share with friends for feedback

## Domain Recommendations

**Top Picks:**
1. FinLearn.io - $35/year
2. MoneyQuest.app - $20/year
3. PaisaLearn.com - $12/year

**Where to Buy:**
- Namecheap (recommended)
- GoDaddy
- Google Domains

## Estimated Costs

- Vercel Hosting: **FREE** (Hobby plan)
- Domain: **$10-40/year**
- Supabase: **FREE** (up to 50,000 users)

**Total: $10-40/year** 🎉

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs
- Check `VERCEL_DEPLOYMENT.md` for detailed guide

---

**Ready to deploy?** Start with Step 1! 🚀
