import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Flame } from 'lucide-react'
import SkeuomorphicButton from '@/components/skeuomorphic-button'

export default async function ShopPage() {
  const supabase = await createClient()
  
  const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      profiles:seller_id (
        username,
        full_name
      )
    `)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(20)

  if (error) {
    console.error('Error fetching products:', error)
  }

  return (
    <main className="min-h-screen bg-background pt-20 pb-12 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-black text-foreground mb-4">
            SHOP
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover unique pre-loved pieces from Bangalore's finest. Every purchase saves 2.5kg CO2.
          </p>
        </div>

        {/* Products Grid */}
        {products && products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product: any) => (
              <Link
                key={product.id}
                href={`/shop/${product.id}`}
                className="group relative border-2 border-steel bg-concrete transition-all duration-300 hover:border-primary hover:shadow-[8px_8px_0px_0px_var(--neon)] overflow-hidden"
              >
                {/* Image */}
                <div className="relative aspect-square bg-concrete">
                  {product.images && product.images[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  ) : null}
                  <div className="absolute inset-0 flex items-center justify-center text-steel">
                    <span className="text-4xl font-black">FIT</span>
                  </div>

                  {/* Hot Badge */}
                  {product.is_hot && (
                    <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 flex items-center gap-1 z-10">
                      <Flame className="w-3 h-3" />
                      <span className="text-[10px] font-mono font-bold uppercase">Hot</span>
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      // TODO: Add to wishlist
                    }}
                    className="absolute top-2 right-2 p-2 bg-background/80 border border-steel text-muted-foreground hover:text-primary hover:border-primary transition-colors z-10"
                  >
                    <Heart className="w-4 h-4" />
                  </button>

                  {/* Discount Tag */}
                  {product.original_price && product.original_price > product.price && (
                    <div className="absolute bottom-2 left-2 bg-background/90 border border-primary px-2 py-1 z-10">
                      <span className="text-xs font-mono font-bold text-primary">
                        {Math.round((1 - product.price / product.original_price) * 100)}% OFF
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4 bg-concrete border-t-2 border-steel group-hover:border-primary transition-colors">
                  <p className="text-[10px] md:text-xs font-mono text-primary uppercase tracking-wider mb-1">
                    {product.category}
                  </p>
                  <h3 className="font-bold text-foreground text-sm md:text-base mb-1 truncate">
                    {product.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    by {product.profiles?.username || product.profiles?.full_name || 'Seller'}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-black text-primary font-mono text-lg md:text-xl">
                      ₹{Number(product.price).toLocaleString()}
                    </span>
                    {product.original_price && (
                      <span className="text-xs text-muted-foreground line-through">
                        ₹{Number(product.original_price).toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border-2 border-steel bg-concrete">
            <p className="text-xl text-muted-foreground mb-4">No products available yet</p>
            <SkeuomorphicButton variant="outline" size="md" asChild>
              <Link href="/sell">Be the first to list</Link>
            </SkeuomorphicButton>
          </div>
        )}
      </div>
    </main>
  )
}
