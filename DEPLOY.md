# Deploy ourFIT to Your Phone

## Option 1: Local Network (Same WiFi) - Quick Testing

### Step 1: Find Your Mac's IP Address
1. Open **System Settings** → **Network**
2. Click on your WiFi connection
3. Note your **IP Address** (looks like `192.168.x.x` or `10.0.x.x`)

OR run in terminal:
```bash
ipconfig getifaddr en0
```

### Step 2: Start Dev Server on Network
```bash
npm run dev -- -H 0.0.0.0
```

This makes the server accessible on your local network.

### Step 3: Access on Phone
1. Make sure your phone is on the **same WiFi network** as your Mac
2. Open your phone's browser
3. Go to: `http://YOUR_IP_ADDRESS:3000`
   - Example: `http://192.168.1.100:3000`

**Note:** You may need to allow incoming connections in your Mac's firewall settings.

---

## Option 2: Deploy to Vercel (Recommended) - Best for Sharing

Vercel is free and gives you a public URL that works anywhere!

### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy
```bash
cd /Users/aurobindvenu/ourfit-app
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No
- **Project name?** → `ourfit-app` (or press enter)
- **Directory?** → `./` (press enter)
- **Override settings?** → No

### Step 4: Add Environment Variables
After first deploy, add your Supabase credentials:

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
# Paste your Supabase URL when prompted

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# Paste your Supabase anon key when prompted
```

### Step 5: Redeploy
```bash
vercel --prod
```

### Step 6: Access on Phone
You'll get a URL like: `https://ourfit-app.vercel.app`
- Open this URL on your phone's browser
- Works on any network, anywhere!

**Pro Tip:** You can also use Vercel's mobile app to manage deployments.

---

## Option 3: ngrok (Quick Tunnel)

### Step 1: Install ngrok
```bash
brew install ngrok
# OR download from ngrok.com
```

### Step 2: Start Dev Server
```bash
npm run dev
```

### Step 3: Create Tunnel
In a new terminal:
```bash
ngrok http 3000
```

### Step 4: Access on Phone
ngrok will give you a URL like: `https://abc123.ngrok.io`
- Open this URL on your phone
- Works on any network!

**Note:** Free ngrok URLs change each time. For a permanent URL, you need a paid plan.

---

## Option 4: Build for Production (Advanced)

### Step 1: Build the App
```bash
npm run build
```

### Step 2: Start Production Server
```bash
npm start
```

Then use Option 1, 2, or 3 above to access it.

---

## Quick Comparison

| Method | Speed | Cost | Permanent URL | Best For |
|--------|-------|------|---------------|----------|
| Local Network | ⚡ Fast | Free | No | Quick testing |
| Vercel | ⚡ Fast | Free | ✅ Yes | Production/Demo |
| ngrok | ⚡ Fast | Free* | No* | Quick sharing |
| Production Build | 🐌 Slower | Free | Depends | Full control |

**Recommendation:** Use **Vercel** for the best experience - it's free, fast, and gives you a permanent URL perfect for showing off your MVP!

---

## Troubleshooting

**"Can't connect" on local network:**
- Check firewall settings (System Settings → Network → Firewall)
- Make sure phone and Mac are on same WiFi
- Try disabling VPN if active

**Vercel deployment errors:**
- Make sure all environment variables are set
- Check build logs: `vercel logs`
- Ensure `package.json` has correct scripts

**ngrok not working:**
- Make sure dev server is running on port 3000
- Check ngrok status: `ngrok status`
