# Fix Vercel ".next directory not found" Error

## The Problem
Vercel can't find the `.next` directory, which means the build is either:
1. Failing before creating `.next`
2. Looking in the wrong place
3. Not detecting Next.js correctly

## Solution 1: Check Vercel Project Settings

### In Vercel Dashboard:
1. Go to **Settings** → **General**
2. Check **Framework Preset**: Should be **Next.js**
3. Check **Root Directory**: Should be **`./`** (root)
4. Check **Build Command**: Should be **`npm run build`**
5. Check **Output Directory**: Should be **`.next`** or leave empty (auto-detect)

### If Root Directory is wrong:
- Change it to **`./`** (the root of your repo)
- Save and redeploy

## Solution 2: Delete and Re-link Project

Sometimes Vercel gets confused. Try:

```bash
# Remove Vercel link
rm -rf .vercel

# Re-link
vercel link

# Deploy fresh
vercel --prod
```

## Solution 3: Check Build Logs

1. Go to Vercel Dashboard → **Deployments**
2. Click on the failed deployment
3. Click **Build Logs** tab
4. Look for errors like:
   - "Build failed"
   - "Command failed"
   - TypeScript errors
   - Missing dependencies

## Solution 4: Test Build Locally First

```bash
# Clean everything
rm -rf .next node_modules package-lock.json

# Reinstall
npm install

# Test build
npm run build

# If this fails, fix errors before deploying
```

## Solution 5: Force Vercel to Re-detect

1. Go to Vercel Dashboard → **Settings** → **General**
2. Scroll to **Framework Preset**
3. Change it to **"Other"**
4. Save
5. Change it back to **"Next.js"**
6. Save
7. Redeploy

## Solution 6: Manual Build Command Override

In Vercel Dashboard → **Settings** → **General**:
- **Build Command**: `npm run build`
- **Output Directory**: Leave empty (auto)
- **Install Command**: `npm install`

## Solution 7: Check for Build Errors

Common issues that prevent `.next` from being created:

### TypeScript Errors
```bash
npx tsc --noEmit
```
Fix any errors shown.

### Missing Dependencies
```bash
npm install
git add package-lock.json
git commit -m "Update dependencies"
```

### Environment Variable Issues
Make sure all required env vars are set in Vercel dashboard.

## Quick Fix Checklist

- [ ] Test `npm run build` locally - does it succeed?
- [ ] Check Vercel project settings - is Root Directory correct?
- [ ] Check Build Logs in Vercel - what's the actual error?
- [ ] Verify Framework Preset is "Next.js"
- [ ] Ensure environment variables are set
- [ ] Try deleting `.vercel` folder and re-linking

## If Build Succeeds Locally But Fails on Vercel

1. **Check Node version:**
   - Vercel Settings → General → Node.js Version
   - Should match your local version (or use latest LTS)

2. **Check package-lock.json:**
   - Make sure it's committed to git
   - Vercel uses this for consistent installs

3. **Check for platform-specific issues:**
   - Some packages don't work on Vercel's build environment
   - Check build logs for specific package errors

## Still Not Working?

Share the **exact error message** from Vercel Build Logs, and I can help debug further!
