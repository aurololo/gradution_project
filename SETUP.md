# ourFIT MVP Setup Guide

## Prerequisites
- Node.js 18+ installed
- A Supabase account (free tier works)

## Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 16
- Supabase client libraries
- All UI dependencies

## Step 2: Setup Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for your project to be ready (takes ~2 minutes)
3. Go to **Settings** → **API** in your Supabase dashboard
4. Copy your:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)

## Step 3: Configure Environment Variables

1. Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

2. Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Step 4: Setup Database Schema

1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Copy the contents of `supabase/schema.sql`
4. Paste and run it in the SQL Editor
5. This creates all necessary tables, indexes, and security policies

## Step 5: Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app!

## MVP Features Included

✅ **Authentication**
- Sign up / Login / Logout
- User profiles

✅ **Product Management**
- Browse all products (`/shop`)
- View product details (`/shop/[id]`)
- List new products (`/sell`)

✅ **User Dashboard**
- View profile (`/profile`)
- See your listings and orders

✅ **Landing Page**
- Beautiful brutalist design
- All CTAs connected to actual pages

## Next Steps (Phase 2)

- [ ] Implement actual buy/order flow
- [ ] Add swap functionality
- [ ] Artist upcycling workflow
- [ ] Payment integration (UPI simulation)
- [ ] Image upload to Supabase Storage
- [ ] Search and filters
- [ ] Wishlist functionality

## Troubleshooting

**"Missing Supabase credentials" error:**
- Make sure `.env.local` exists and has correct values
- Restart your dev server after adding env variables

**Database errors:**
- Ensure you've run the schema.sql in Supabase SQL Editor
- Check that RLS (Row Level Security) policies are enabled

**Build errors:**
- Run `npm install` again
- Clear `.next` folder: `rm -rf .next`

## Budget Note

Supabase free tier includes:
- 500MB database
- 1GB file storage
- 50,000 monthly active users
- Perfect for MVP! 🎉
