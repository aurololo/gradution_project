"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ArrowRight, Flame } from "lucide-react";
import SkeuomorphicButton from "./skeuomorphic-button";

const drops = [
  {
    id: 1,
    name: "Vintage Levis 501",
    seller: "@denim.archive",
    price: 2499,
    originalPrice: 7999,
    category: "DENIM",
    hot: true,
    image: "/images/product-levis.jpg",
  },
  {
    id: 2,
    name: "Y2K Cargo Pants",
    seller: "@streetwear.blr",
    price: 1299,
    originalPrice: 3499,
    category: "BOTTOMS",
    hot: false,
    image: "/images/product-cargo.jpg",
  },
  {
    id: 3,
    name: "Oversized Band Tee",
    seller: "@vintage.finds",
    price: 899,
    originalPrice: 2499,
    category: "TOPS",
    hot: true,
    image: "/images/product-bandtee.jpg",
  },
  {
    id: 4,
    name: "90s Windbreaker",
    seller: "@retro.king",
    price: 1899,
    originalPrice: 5499,
    category: "OUTERWEAR",
    hot: false,
    image: "/images/product-windbreaker.jpg",
  },
  {
    id: 5,
    name: "Chunky Platform Boots",
    seller: "@sole.sisters",
    price: 3499,
    originalPrice: 8999,
    category: "FOOTWEAR",
    hot: true,
    image: "/images/product-boots.jpg",
  },
  {
    id: 6,
    name: "Kurta Set - Block Print",
    seller: "@desi.thrift",
    price: 1599,
    originalPrice: 4999,
    category: "ETHNIC",
    hot: false,
    image: "/images/product-kurta.jpg",
  },
];

export default function FeaturedDrops() {
  return (
    <section id="swap" className="py-16 md:py-24 px-4 bg-industrial relative">
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
      }} />

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-primary mb-4 block">
              // Fresh Drops
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-balance">
              <span className="text-primary drop-shadow-[0_0_20px_var(--neon)]">HOT</span>
              <span className="text-foreground"> ON THE STREET</span>
            </h2>
          </div>
          <SkeuomorphicButton variant="outline" size="md" asChild>
            <Link href="/shop">
              View All
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </SkeuomorphicButton>
        </div>

        {/* Asymmetrical Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {drops.map((item, index) => {
            // Create asymmetrical layout
            const spanClasses = [
              "col-span-2 md:col-span-2 lg:col-span-2 row-span-2",
              "col-span-1 md:col-span-1 lg:col-span-2",
              "col-span-1 md:col-span-1 lg:col-span-2",
              "col-span-2 md:col-span-1 lg:col-span-2 row-span-2",
              "col-span-1 md:col-span-2 lg:col-span-2",
              "col-span-1 md:col-span-1 lg:col-span-2",
            ][index];

            const isLarge = index === 0 || index === 3;

            return (
              <Link
                href={`/shop/${item.id}`}
                key={item.id}
                className={`
                  ${spanClasses}
                  group relative
                  border-2 border-steel bg-concrete
                  transition-all duration-300
                  hover:border-primary hover:z-10
                  hover:shadow-[8px_8px_0px_0px_var(--neon)]
                  overflow-hidden
                  block
                `}
              >
                {/* Image Area */}
                <div className={`relative ${isLarge ? 'aspect-[3/4]' : 'aspect-square'} bg-background`}>
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />

                  {/* Hot Badge */}
                  {item.hot && (
                    <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 flex items-center gap-1 z-10">
                      <Flame className="w-3 h-3" />
                      <span className="text-[10px] font-mono font-bold uppercase">Hot</span>
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    className="absolute top-2 right-2 p-2 bg-background/80 border border-steel text-muted-foreground hover:text-primary hover:border-primary transition-colors z-10"
                  >
                    <Heart className="w-4 h-4" />
                  </button>

                  {/* Discount Tag */}
                  <div className="absolute bottom-2 left-2 bg-background/90 border border-primary px-2 py-1 z-10">
                    <span className="text-xs font-mono font-bold text-primary">
                      {Math.round((1 - item.price / item.originalPrice) * 100)}% OFF
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-3 md:p-4 bg-concrete border-t-2 border-steel group-hover:border-primary transition-colors">
                  <p className="text-[10px] md:text-xs font-mono text-primary uppercase tracking-wider mb-1">
                    {item.category}
                  </p>
                  <h3 className={`font-bold text-foreground ${isLarge ? 'text-base md:text-lg' : 'text-sm'} mb-1 truncate`}>
                    {item.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">{item.seller}</p>
                  <div className="flex items-baseline gap-2">
                    <span className={`font-black text-primary font-mono ${isLarge ? 'text-xl md:text-2xl' : 'text-lg'}`}>
                      ₹{item.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground line-through">
                      ₹{item.originalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA Bar */}
        <div className="mt-12 p-6 md:p-8 border-2 border-primary bg-primary/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl md:text-2xl font-black text-foreground mb-2">
              Got something to swap?
            </h3>
            <p className="text-sm text-muted-foreground">
              Trade directly with sellers. No money needed.
            </p>
          </div>
          <SkeuomorphicButton variant="primary" size="lg" asChild>
            <Link href="/shop">Start Swapping</Link>
          </SkeuomorphicButton>
        </div>
      </div>
    </section>
  );
}
