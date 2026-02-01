# Vercel Deployment Checklist

## Pre-Deployment Steps

### 1. ✅ Test Build Locally
```bash
npm run build
```
If this fails, fix errors before deploying.

### 2. ✅ Environment Variables in Vercel

Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**

Add these (for ALL environments: Production, Preview, Development):
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

**Important:** 
- ✅ Check all three checkboxes (Production, Preview, Development)
- ✅ No trailing spaces
- ✅ No quotes around values
- ✅ Copy exact values from Supabase dashboard

### 3. ✅ Verify Build Script
In `package.json`, ensure:
```json
"scripts": {
  "build": "next build"
}
```

### 4. ✅ Check for TypeScript Errors
```bash
npx tsc --noEmit
```

## Deployment Steps

### Option A: Deploy via CLI
```bash
# Login (if not already)
vercel login

# Deploy
vercel --prod
```

### Option B: Deploy via Dashboard
1. Go to Vercel dashboard
2. Click **Deployments**
3. Click **⋯** (three dots) on latest deployment
4. Click **Redeploy**

## Common Issues & Fixes

### Issue 1: Build Fails with "Module not found"
**Fix:** 
```bash
rm -rf node_modules package-lock.json
npm install
git add package-lock.json
git commit -m "Update dependencies"
vercel --prod
```

### Issue 2: "Environment variable not found"
**Fix:**
1. Double-check env vars are set in Vercel dashboard
2. Make sure you selected ALL environments
3. Redeploy after adding env vars

### Issue 3: "404 Not Found" after deployment
**Possible causes:**
- Middleware blocking requests
- Missing routes
- Build output issues

**Fix:**
1. Check build logs in Vercel dashboard
2. Look for errors in "Build Logs" tab
3. Verify `middleware.ts` is in root directory
4. Check that `app/page.tsx` exists

### Issue 4: TypeScript Errors
**Fix:**
```bash
# Fix TypeScript errors locally first
npx tsc --noEmit

# Then deploy
vercel --prod
```

### Issue 5: "Cannot find module"
**Fix:**
- Ensure all dependencies are in `package.json`
- Run `npm install` locally
- Commit `package-lock.json`

## Debugging Deployment

### Check Build Logs
1. Go to Vercel dashboard
2. Click on failed deployment
3. Click **Build Logs** tab
4. Look for error messages

### Check Function Logs
1. Go to Vercel dashboard
2. Click **Functions** tab
3. Check for runtime errors

### Test Locally First
```bash
# Build
npm run build

# Start production server
npm start

# Test on http://localhost:3000
```

## Quick Fix Commands

```bash
# Clean and rebuild
rm -rf .next node_modules
npm install
npm run build

# Deploy
vercel --prod --force
```

## Still Not Working?

1. **Check Vercel Status:** https://www.vercel-status.com/
2. **Check Build Output:** Look for specific error messages
3. **Try Fresh Deploy:**
   ```bash
   vercel --prod --force --yes
   ```
4. **Check Node Version:** Vercel should auto-detect, but verify in Settings → General

## Success Indicators

✅ Build completes without errors
✅ Deployment shows "Ready" status
✅ Visiting URL shows landing page
✅ No 404 errors in browser console
✅ No errors in Vercel function logs
