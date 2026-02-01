# How to Kill Stuck Next.js Dev Server

## Quick Fix (Run in Terminal)

```bash
# Find and kill processes on port 3000
lsof -ti:3000 | xargs kill -9

# Remove the lock file
rm -f .next/dev/lock

# Now you can start dev server again
npm run dev
```

## Alternative: One-liner

```bash
kill -9 $(lsof -ti:3000) 2>/dev/null; rm -f .next/dev/lock; npm run dev
```

## If That Doesn't Work

### Option 1: Find Node Processes
```bash
ps aux | grep "next dev" | grep -v grep
```

Then kill the process IDs manually:
```bash
kill -9 <PID>
```

### Option 2: Kill All Node Processes (Nuclear Option)
```bash
pkill -9 node
```

**Warning:** This kills ALL Node processes, so close other Node apps first!

### Option 3: Restart Your Terminal
Sometimes the simplest solution is to:
1. Close your terminal
2. Open a new one
3. Run `npm run dev` again

## Prevention

To avoid this in the future:
- Always use `Ctrl+C` to stop the dev server properly
- Don't close terminal without stopping the server first
- If you must force quit, run the kill commands above before restarting
