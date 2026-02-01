# Vercel 404 Error - Troubleshooting Guide

## Common Causes & Solutions

### 1. Missing Environment Variables ⚠️ (Most Common)

**Problem:** Supabase credentials not set in Vercel

**Solution:**
1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add these two variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Your Supabase anon key
4. **Redeploy** your project:
   ```bash
   vercel --prod
   ```

### 2. Build Failed

**Check build logs:**
1. Go to Vercel dashboard → **Deployments**
2. Click on the failed deployment
3. Check the **Build Logs** tab
4. Look for error messages

**Common build errors:**
- TypeScript errors → Fix in code
- Missing dependencies → Run `npm install` locally and commit `package-lock.json`
- Environment variable errors → See #1 above

### 3. Routing Issues

**Problem:** Middleware blocking requests

**Solution:** The middleware has been updated to handle missing env vars gracefully. If you still see issues:
1. Check that `middleware.ts` is in the root directory
2. Verify the matcher pattern includes your routes

### 4. Wrong Deployment Region

**Problem:** Deploying to wrong region

**Solution:** 
- Check `vercel.json` has correct region (bom1 for Mumbai)
- Or deploy without specifying region

## Quick Fix Checklist

- [ ] Environment variables set in Vercel dashboard
- [ ] Environment variables added to **Production**, **Preview**, and **Development**
- [ ] Redeployed after adding env vars
- [ ] Build succeeds (check logs)
- [ ] No TypeScript errors
- [ ] `package.json` has correct build script

## Step-by-Step Fix

### Step 1: Get Your Supabase Credentials
1. Go to [supabase.com](https://supabase.com)
2. Open your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL**
   - **anon/public key**

### Step 2: Add to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Select your project
3. **Settings** → **Environment Variables**
4. Click **Add New**
5. Add both variables:
   ```
   Name: NEXT_PUBLIC_SUPABASE_URL
   Value: https://xxxxx.supabase.co
   ```
   ```
   Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
   Value: eyJhbGc...
   ```
6. Select **Production**, **Preview**, and **Development**
7. Click **Save**

### Step 3: Redeploy
```bash
vercel --prod
```

Or trigger redeploy from Vercel dashboard:
1. Go to **Deployments**
2. Click **⋯** (three dots) on latest deployment
3. Click **Redeploy**

### Step 4: Verify
1. Wait for deployment to complete
2. Visit your Vercel URL
3. Should see the landing page (even without Supabase setup)

## Testing Without Supabase

The app is now configured to work even without Supabase:
- Public pages (/, /shop) will work
- Auth pages will show but won't function
- Protected pages will redirect to login

This allows you to test the UI deployment first, then add Supabase later.

## Still Getting 404?

1. **Check the exact URL:**
   - Make sure you're visiting the root: `https://your-app.vercel.app/`
   - Not a subdirectory

2. **Check deployment status:**
   - Go to Vercel dashboard
   - Is the deployment "Ready" or "Error"?

3. **Check build output:**
   - Look for `.next` folder in build logs
   - Should see "Build completed" message

4. **Try redeploying:**
   ```bash
   vercel --prod --force
   ```

## Need Help?

Check Vercel logs:
```bash
vercel logs
```

Or check build output in dashboard → Deployments → Build Logs
