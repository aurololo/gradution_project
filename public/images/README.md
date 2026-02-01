# Images Directory

## Current Status
The app is set up to handle missing images gracefully. You'll see placeholder "FIT" text instead of broken image icons.

## Adding Images

### Option 1: Add Your Own Images
Place your images in this directory:
- `hero-jacket.jpg` - Hero section featured product
- `product-levis.jpg` - Product images
- `product-cargo.jpg`
- `product-bandtee.jpg`
- `product-windbreaker.jpg`
- `product-boots.jpg`
- `product-kurta.jpg`
- `avatar-priya.jpg` - User avatars
- `avatar-arjun.jpg`
- `avatar-zara.jpg`

### Option 2: Use Placeholder Service
You can use a service like:
- `https://picsum.photos/400/600` - Random images
- `https://via.placeholder.com/400x600` - Placeholder images

Update the image paths in:
- `components/hero-section.tsx`
- `components/featured-drops.tsx`
- `components/community-section.tsx`

### Option 3: Use Supabase Storage (Recommended for Production)
1. Set up Supabase Storage bucket
2. Upload images via the app
3. Store URLs in database

## Image Requirements
- **Format:** JPG, PNG, or WebP
- **Recommended size:** 800x1200px for products
- **File size:** Keep under 2MB for fast loading

The app will automatically show fallbacks if images are missing or fail to load.
