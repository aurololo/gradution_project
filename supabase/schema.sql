-- ourFIT Database Schema
-- Circular Fashion Marketplace: Seller, Artist, Buyer

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  location TEXT, -- Bangalore area (Koramangala, Indiranagar, etc.)
  bio TEXT,
  user_type TEXT CHECK (user_type IN ('buyer', 'seller', 'artist', 'all')) DEFAULT 'buyer',
  rating DECIMAL(3,2) DEFAULT 5.00,
  total_sales INTEGER DEFAULT 0,
  total_purchases INTEGER DEFAULT 0,
  total_swaps INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Products table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  seller_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  artist_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL, -- NULL if not upcycled
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL, -- DENIM, TOPS, BOTTOMS, OUTERWEAR, FOOTWEAR, ETHNIC, ACCESSORIES
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  condition TEXT CHECK (condition IN ('new', 'like_new', 'good', 'fair')) DEFAULT 'good',
  size TEXT,
  brand TEXT,
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  status TEXT CHECK (status IN ('draft', 'active', 'sold', 'swapped', 'archived')) DEFAULT 'draft',
  is_upcycled BOOLEAN DEFAULT FALSE,
  is_hot BOOLEAN DEFAULT FALSE,
  swap_preferred BOOLEAN DEFAULT FALSE, -- Seller prefers swap over sale
  location TEXT, -- Pickup location in Bangalore
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Orders table (for purchases)
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  buyer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  seller_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  status TEXT CHECK (status IN ('pending', 'paid', 'shipped', 'delivered', 'cancelled')) DEFAULT 'pending',
  payment_method TEXT, -- 'upi', 'cash_on_pickup', etc.
  shipping_address TEXT,
  tracking_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Swaps table (for direct trades)
CREATE TABLE IF NOT EXISTS public.swaps (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  initiator_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  initiator_product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  recipient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  recipient_product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  status TEXT CHECK (status IN ('pending', 'accepted', 'rejected', 'completed', 'cancelled')) DEFAULT 'pending',
  meetup_location TEXT,
  meetup_time TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Artist bids (for upcycling requests)
CREATE TABLE IF NOT EXISTS public.artist_bids (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  artist_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  bid_amount DECIMAL(10,2), -- Artist's bid to upcycle
  message TEXT,
  status TEXT CHECK (status IN ('pending', 'accepted', 'rejected')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Reviews/Vouches table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  reviewer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  reviewee_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  swap_id UUID REFERENCES public.swaps(id) ON DELETE SET NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Wishlist table
CREATE TABLE IF NOT EXISTS public.wishlist (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(user_id, product_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_seller ON public.products(seller_id);
CREATE INDEX IF NOT EXISTS idx_products_status ON public.products(status);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_hot ON public.products(is_hot);
CREATE INDEX IF NOT EXISTS idx_orders_buyer ON public.orders(buyer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_swaps_initiator ON public.swaps(initiator_id);
CREATE INDEX IF NOT EXISTS idx_swaps_status ON public.swaps(status);

-- Row Level Security (RLS) Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.swaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artist_bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read all, update own
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Products: Everyone can read active products, sellers can manage own
CREATE POLICY "Active products are viewable by everyone" ON public.products
  FOR SELECT USING (status = 'active' OR seller_id = auth.uid());

CREATE POLICY "Sellers can insert own products" ON public.products
  FOR INSERT WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Sellers can update own products" ON public.products
  FOR UPDATE USING (auth.uid() = seller_id);

-- Orders: Users can see their own orders
CREATE POLICY "Users can view own orders" ON public.orders
  FOR SELECT USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

CREATE POLICY "Buyers can create orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = buyer_id);

-- Swaps: Users can see swaps they're involved in
CREATE POLICY "Users can view own swaps" ON public.swaps
  FOR SELECT USING (auth.uid() = initiator_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can create swaps" ON public.swaps
  FOR INSERT WITH CHECK (auth.uid() = initiator_id);

-- Wishlist: Users can manage own wishlist
CREATE POLICY "Users can view own wishlist" ON public.wishlist
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own wishlist" ON public.wishlist
  FOR ALL USING (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_swaps_updated_at BEFORE UPDATE ON public.swaps
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
