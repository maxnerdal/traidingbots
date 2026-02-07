# Deployment Guide - TradingBots Application

## Prerequisites
1. GitHub account (you already have this)
2. Domain name (to be purchased)
3. Vercel account (free) - for frontend
4. Railway account (free tier, then $5/month) - for backend + database

---

## Step 1: Deploy Backend to Railway (30 minutes)

### 1.1 Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub
3. Authorize Railway to access your repositories

### 1.2 Deploy Backend
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your repository
4. Select **tradingbots-backend** directory
5. Railway will auto-detect Spring Boot

### 1.3 Add PostgreSQL Database
1. In your project, click **"+ New"**
2. Select **"Database"** → **"PostgreSQL"**
3. Railway automatically creates the database

### 1.4 Configure Environment Variables
Click on your backend service → **"Variables"** tab, add:

```
SPRING_PROFILES_ACTIVE=prod
DATABASE_URL=${{Postgres.DATABASE_URL}}
JWT_SECRET=<generate-a-secure-256-bit-key>
COINGECKO_API_KEY=CG-kxMUh2nR3Dzk6bgoycVRQSVb
CORS_ALLOWED_ORIGINS=https://yourdomain.com
```

**Generate JWT Secret:**
```bash
openssl rand -base64 32
```

### 1.5 Get Backend URL
- Railway will provide a URL like: `tradingbots-backend-production-xxxx.up.railway.app`
- Copy this URL (you'll need it for frontend)

---

## Step 2: Deploy Frontend to Vercel (15 minutes)

### 2.1 Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub
3. Authorize Vercel

### 2.2 Deploy Frontend
1. Click **"Add New..."** → **"Project"**
2. Import your GitHub repository
3. Vercel auto-detects Vite
4. **Root Directory:** Set to `tradingbots-frontend`
5. Click **"Deploy"**

### 2.3 Add Environment Variable
In Vercel project → **"Settings"** → **"Environment Variables"**:

```
VITE_API_URL=https://your-railway-backend-url.up.railway.app/api
```

Replace with your actual Railway backend URL from Step 1.5

### 2.4 Redeploy
After adding environment variable:
- Go to **"Deployments"** tab
- Click **"..."** on latest deployment → **"Redeploy"**

---

## Step 3: Configure Custom Domain (10 minutes)

### 3.1 Buy Domain
- GoDaddy, Namecheap, or Google Domains
- Example: `tradingbots.com` (~$12/year)

### 3.2 Point Domain to Vercel (Frontend)
In Vercel:
1. Go to project **"Settings"** → **"Domains"**
2. Add your domain: `tradingbots.com`
3. Vercel shows DNS records to add

In your domain registrar:
1. Add the DNS records Vercel provided
2. Wait 5-60 minutes for DNS propagation

### 3.3 Point Subdomain to Railway (Backend)
In Railway:
1. Click backend service → **"Settings"** → **"Networking"**
2. Click **"Generate Domain"** or add custom domain
3. Add subdomain: `api.tradingbots.com`

In your domain registrar:
1. Add CNAME record:
   - **Name:** `api`
   - **Value:** Your Railway domain

### 3.4 Update CORS in Railway
Go back to Railway → Backend service → **"Variables"**:
```
CORS_ALLOWED_ORIGINS=https://tradingbots.com,https://www.tradingbots.com
```

### 3.5 Update Frontend API URL in Vercel
Vercel → **"Environment Variables"**:
```
VITE_API_URL=https://api.tradingbots.com/api
```

Redeploy after changing.

---

## Step 4: Test Your Deployment

1. Visit `https://yourdomain.com`
2. Try logging in with demo user
3. Check that all features work
4. Monitor Railway logs for errors

---

## Costs Summary

| Service | Cost |
|---------|------|
| Domain | $10-15/year |
| Vercel (Frontend) | **FREE** |
| Railway (Backend + DB) | **FREE** for $5 credit, then ~$5-10/month |

**Total:** ~$5-10/month after free tier

---

## Troubleshooting

### Frontend can't connect to backend
- Check VITE_API_URL in Vercel environment variables
- Verify CORS_ALLOWED_ORIGINS in Railway includes your domain
- Check Railway logs for errors

### Database connection errors
- Verify DATABASE_URL is set correctly in Railway
- Check PostgreSQL database is running

### 401 Unauthorized errors
- Check JWT_SECRET is set in Railway
- Verify token is being sent from frontend

---

## Local Development Still Works!

Your local setup is unchanged:
- `npm run dev` → uses `http://localhost:8080/api`
- Production → uses your deployed backend URL

No code changes needed to switch between environments!

---

Need help? Check:
- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs
