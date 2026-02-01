import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import SkeuomorphicButton from '@/components/skeuomorphic-button'
import { ShoppingBag, RefreshCw, Users, Package, Heart } from 'lucide-react'

export default async function ProfilePage() {
  let user = null
  let profile = null
  let myProducts = null
  let myOrders = null

  try {
    const supabase = await createClient()
    const authResult = await supabase.auth.getUser()
    user = authResult.data.user

    if (!user) {
      redirect('/login')
    }

    const profileResult = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    profile = profileResult.data

    const productsResult = await supabase
      .from('products')
      .select('*')
      .eq('seller_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10)

    myProducts = productsResult.data

    const ordersResult = await supabase
      .from('orders')
      .select('*, products(*)')
      .eq('buyer_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10)

    myOrders = ordersResult.data
  } catch (err) {
    console.error('Error loading profile:', err)
    redirect('/login')
  }

  return (
    <main className="min-h-screen bg-background pt-20 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Profile Header */}
        <div className="border-2 border-primary bg-concrete p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {profile?.avatar_url ? (
              <Image
                src={profile.avatar_url}
                alt={profile.full_name || profile.username || 'Profile'}
                width={120}
                height={120}
                className="border-4 border-primary"
              />
            ) : (
              <div className="w-30 h-30 border-4 border-primary bg-primary/10 flex items-center justify-center">
                <span className="text-5xl font-black text-primary">
                  {profile?.full_name?.[0] || profile?.username?.[0] || 'U'}
                </span>
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-black text-foreground mb-2">
                {profile?.full_name || profile?.username || 'User'}
              </h1>
              {profile?.username && (
                <p className="text-lg text-primary font-mono mb-2">@{profile.username}</p>
              )}
              {profile?.location && (
                <p className="text-muted-foreground mb-4">{profile.location}, Bangalore</p>
              )}
              {profile?.bio && (
                <p className="text-muted-foreground">{profile.bio}</p>
              )}
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="px-4 py-2 border-2 border-steel bg-background">
                  <p className="text-xs font-mono uppercase text-muted-foreground">Rating</p>
                  <p className="text-2xl font-black text-primary">
                    {profile?.rating ? Number(profile.rating).toFixed(1) : '5.0'}
                  </p>
                </div>
                <div className="px-4 py-2 border-2 border-steel bg-background">
                  <p className="text-xs font-mono uppercase text-muted-foreground">Sales</p>
                  <p className="text-2xl font-black text-foreground">{profile?.total_sales || 0}</p>
                </div>
                <div className="px-4 py-2 border-2 border-steel bg-background">
                  <p className="text-xs font-mono uppercase text-muted-foreground">Purchases</p>
                  <p className="text-2xl font-black text-foreground">{profile?.total_purchases || 0}</p>
                </div>
                <div className="px-4 py-2 border-2 border-steel bg-background">
                  <p className="text-xs font-mono uppercase text-muted-foreground">Swaps</p>
                  <p className="text-2xl font-black text-foreground">{profile?.total_swaps || 0}</p>
                </div>
              </div>
            </div>
            <SkeuomorphicButton variant="outline" size="md" asChild>
              <Link href="/profile/edit">Edit Profile</Link>
            </SkeuomorphicButton>
          </div>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* My Listings */}
          <div className="border-2 border-steel bg-concrete p-6">
            <div className="flex items-center gap-3 mb-6">
              <Package className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-black text-foreground">My Listings</h2>
            </div>
            {myProducts && myProducts.length > 0 ? (
              <div className="space-y-4">
                {myProducts.map((product: any) => (
                  <Link
                    key={product.id}
                    href={`/shop/${product.id}`}
                    className="block p-4 border-2 border-steel bg-background hover:border-primary transition-colors"
                  >
                    <p className="font-bold text-foreground mb-1">{product.title}</p>
                    <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                    <p className="text-lg font-black text-primary font-mono">
                      ₹{Number(product.price).toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Status: <span className="uppercase">{product.status}</span>
                    </p>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No listings yet</p>
                <SkeuomorphicButton variant="outline" size="sm" asChild>
                  <Link href="/sell">List Your First Item</Link>
                </SkeuomorphicButton>
              </div>
            )}
          </div>

          {/* My Orders */}
          <div className="border-2 border-steel bg-concrete p-6">
            <div className="flex items-center gap-3 mb-6">
              <ShoppingBag className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-black text-foreground">My Orders</h2>
            </div>
            {myOrders && myOrders.length > 0 ? (
              <div className="space-y-4">
                {myOrders.map((order: any) => (
                  <div
                    key={order.id}
                    className="p-4 border-2 border-steel bg-background"
                  >
                    <p className="font-bold text-foreground mb-1">
                      {order.products?.title || 'Product'}
                    </p>
                    <p className="text-lg font-black text-primary font-mono mb-2">
                      ₹{Number(order.amount).toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Status: <span className="uppercase">{order.status}</span>
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No orders yet</p>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="border-2 border-steel bg-concrete p-6">
            <h2 className="text-2xl font-black text-foreground mb-6">Quick Actions</h2>
            <div className="space-y-4">
              <SkeuomorphicButton variant="primary" size="md" className="w-full" asChild>
                <Link href="/sell">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  List New Item
                </Link>
              </SkeuomorphicButton>
              <SkeuomorphicButton variant="outline" size="md" className="w-full" asChild>
                <Link href="/shop">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Browse Shop
                </Link>
              </SkeuomorphicButton>
              <SkeuomorphicButton variant="outline" size="md" className="w-full" asChild>
                <Link href="/swap">
                  <Users className="w-4 h-4 mr-2" />
                  Find Swaps
                </Link>
              </SkeuomorphicButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
