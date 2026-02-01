# Vercel Settings Guide - Where to Find Everything

## If Root Directory is Not Visible

The Root Directory setting might be:
1. **Hidden** - Only shows for monorepos or specific setups
2. **In a different location** - Check these places:

### Alternative Locations:

#### Option 1: Project Settings → Build & Development Settings
1. Go to **Settings** tab
2. Look for **"Build & Development Settings"** section
3. Root Directory might be there

#### Option 2: Deployment Settings
1. Go to **Deployments** tab
2. Click on a deployment
3. Look for **"Settings"** or **"Configure"** button
4. Root Directory might be there

#### Option 3: It's Auto-Detected (Good!)
If you don't see Root Directory, Vercel is probably auto-detecting it correctly. The issue is likely something else.

## What to Check Instead

Since Root Directory isn't visible, check these:

### 1. Framework Preset
- **Settings** → **General**
- **Framework Preset**: Should say **"Next.js"**
- If it says "Other" or something else, that's the problem!

### 2. Build Command
- **Settings** → **General** → **Build & Development Settings**
- **Build Command**: Should be `npm run build` or empty (auto)
- **Output Directory**: Should be empty or `.next`

### 3. Environment Variables
- **Settings** → **Environment Variables**
- Make sure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
- Check all three environments: Production, Preview, Development

## Alternative: Use vercel.json

Since Root Directory might not be visible, we can set it in `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "framework": "nextjs",
  "installCommand": "npm install"
}
```

This file is already in your project root, so Vercel should read it.

## Check Build Logs Instead

The real issue is probably in the build logs:

1. Go to **Deployments** tab
2. Click on the **failed deployment** (red X)
3. Click **"Build Logs"** tab
4. Scroll through and look for:
   - Red error messages
   - "Command failed"
   - TypeScript errors
   - Missing dependencies

**This will tell you the actual problem!**

## Quick Test

Try this to see what Vercel sees:

1. In Vercel Dashboard → **Deployments**
2. Click **"Create Deployment"** or **"Redeploy"**
3. Watch the build logs in real-time
4. Look for where it fails

## Most Likely Issues (If Root Directory is Auto)

1. **Build is failing** - Check build logs
2. **Missing env vars** - Check Environment Variables
3. **TypeScript errors** - Fix in code
4. **Wrong Framework Preset** - Should be "Next.js"

## What to Do Right Now

1. **Check Framework Preset** in Settings → General
2. **Check Build Logs** in the failed deployment
3. **Share the error** from build logs with me

The Root Directory is probably fine (auto-detected). The issue is likely in the build process itself!
