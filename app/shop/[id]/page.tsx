import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import SkeuomorphicButton from '@/components/skeuomorphic-button'
import { Heart, Flame, MapPin, Shield, Truck } from 'lucide-react'

export default async function ProductPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  
  const { data: product, error } = await supabase
    .from('products')
    .select(`
      *,
      seller:profiles!products_seller_id_fkey (
        id,
        username,
        full_name,
        avatar_url,
        rating,
        location
      )
    `)
    .eq('id', params.id)
    .single()

  if (error || !product) {
    notFound()
  }

  const { data: { user } } = await supabase.auth.getUser()
  const isOwner = user?.id === product.seller_id

  return (
    <main className="min-h-screen bg-background pt-20 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square border-2 border-steel bg-concrete overflow-hidden">
              {product.images && product.images[0] ? (
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  className="object-cover"
                  priority
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              ) : null}
              <div className="absolute inset-0 flex items-center justify-center text-steel">
                <span className="text-8xl font-black">FIT</span>
              </div>
              {product.is_hot && (
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-2 flex items-center gap-2 z-10">
                  <Flame className="w-4 h-4" />
                  <span className="text-xs font-mono font-bold uppercase">Hot Item</span>
                </div>
              )}
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(1, 5).map((img: string, idx: number) => (
                  <div key={idx} className="relative aspect-square border border-steel bg-concrete">
                    <Image src={img} alt={`${product.title} ${idx + 2}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-xs font-mono text-primary uppercase tracking-wider mb-2">
                {product.category}
              </p>
              <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">
                {product.title}
              </h1>
              {product.description && (
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="border-2 border-primary bg-primary/5 p-6">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-4xl md:text-5xl font-black text-primary font-mono">
                  ₹{Number(product.price).toLocaleString()}
                </span>
                {product.original_price && (
                  <span className="text-xl text-muted-foreground line-through">
                    ₹{Number(product.original_price).toLocaleString()}
                  </span>
                )}
              </div>
              {product.original_price && (
                <p className="text-sm text-primary font-mono">
                  {Math.round((1 - product.price / product.original_price) * 100)}% OFF
                </p>
              )}
            </div>

            {/* Details */}
            <div className="space-y-4 border-2 border-steel bg-concrete p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono uppercase text-muted-foreground">Condition</span>
                <span className="text-foreground font-semibold">{product.condition?.replace('_', ' ').toUpperCase() || 'GOOD'}</span>
              </div>
              {product.size && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono uppercase text-muted-foreground">Size</span>
                  <span className="text-foreground font-semibold">{product.size}</span>
                </div>
              )}
              {product.brand && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono uppercase text-muted-foreground">Brand</span>
                  <span className="text-foreground font-semibold">{product.brand}</span>
                </div>
              )}
              {product.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">{product.location}, Bangalore</span>
                </div>
              )}
            </div>

            {/* Seller Info */}
            <div className="border-2 border-steel bg-concrete p-6">
              <p className="text-xs font-mono uppercase text-muted-foreground mb-3">Seller</p>
              <div className="flex items-center gap-4">
                {product.seller?.avatar_url ? (
                  <Image
                    src={product.seller.avatar_url}
                    alt={product.seller.full_name || product.seller.username || 'Seller'}
                    width={48}
                    height={48}
                    className="rounded border-2 border-primary"
                  />
                ) : (
                  <div className="w-12 h-12 border-2 border-primary bg-primary/10 flex items-center justify-center">
                    <span className="text-xl font-black text-primary">S</span>
                  </div>
                )}
                <div>
                  <p className="font-bold text-foreground">
                    {product.seller?.full_name || product.seller?.username || 'Seller'}
                  </p>
                  {product.seller?.rating && (
                    <p className="text-sm text-muted-foreground">
                      ⭐ {Number(product.seller.rating).toFixed(1)} Rating
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            {!isOwner ? (
              <div className="space-y-4">
                <SkeuomorphicButton variant="primary" size="lg" className="w-full">
                  Buy Now
                </SkeuomorphicButton>
                {product.swap_preferred && (
                  <SkeuomorphicButton variant="outline" size="lg" className="w-full">
                    Request Swap
                  </SkeuomorphicButton>
                )}
                <button
                  type="button"
                  className="w-full p-4 border-2 border-steel bg-concrete text-foreground hover:border-primary transition-colors flex items-center justify-center gap-2"
                >
                  <Heart className="w-5 h-5" />
                  <span className="font-mono uppercase tracking-wider">Add to Wishlist</span>
                </button>
              </div>
            ) : (
              <SkeuomorphicButton variant="outline" size="lg" className="w-full" asChild>
                <Link href={`/sell/edit/${product.id}`}>Edit Listing</Link>
              </SkeuomorphicButton>
            )}

            {/* Trust Badges */}
            <div className="flex items-center gap-4 pt-4 border-t-2 border-steel">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4" />
                <span>Verified Seller</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="w-4 h-4" />
                <span>Same-day Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
