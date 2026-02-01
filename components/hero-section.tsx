"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Recycle, TrendingUp } from "lucide-react";
import SkeuomorphicButton from "./skeuomorphic-button";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen pt-20 pb-12 px-4 overflow-hidden">
      {/* Industrial Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 50px, var(--steel) 50px, var(--steel) 51px),
            repeating-linear-gradient(90deg, transparent, transparent 50px, var(--steel) 50px, var(--steel) 51px)
          `
        }} />
      </div>

      {/* Neon Glow Effects */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />

      <div className="container mx-auto relative z-10">
        {/* Asymmetrical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 min-h-[80vh] items-center">
          
          {/* Main Content - Spans 7 columns on desktop */}
          <div className="md:col-span-7 space-y-6 md:space-y-8 order-2 md:order-1">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary text-primary font-mono text-xs uppercase tracking-widest">
              <Recycle className="w-4 h-4" />
              <span>Circular Fashion Revolution</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight text-balance">
              <span className="text-foreground">WEAR IT.</span>
              <br />
              <span className="text-primary drop-shadow-[0_0_30px_var(--neon)]">SHARE IT.</span>
              <br />
              <span className="text-foreground">REPEAT.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              {"Bangalore's"} first <span className="text-primary font-semibold">desi-street</span> circular fashion marketplace. 
              Buy pre-loved, sell your style, swap with the community. 
              <span className="text-foreground font-medium"> Fashion that keeps moving.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <SkeuomorphicButton variant="primary" size="lg" asChild>
                <Link href="/shop">
                  Start Shopping
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </SkeuomorphicButton>
              <SkeuomorphicButton variant="outline" size="lg" asChild>
                <Link href="/sell">
                  Sell Your Fit
                </Link>
              </SkeuomorphicButton>
            </div>

            {/* Stats Strip */}
            <div className="flex flex-wrap gap-6 pt-6 border-t-2 border-border">
              <div className="space-y-1">
                <p className="text-3xl md:text-4xl font-black text-primary font-mono">15K+</p>
                <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Active Sellers</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl md:text-4xl font-black text-foreground font-mono">50K+</p>
                <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Items Listed</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl md:text-4xl font-black text-primary font-mono">2.5T</p>
                <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">KG CO2 Saved</p>
              </div>
            </div>
          </div>

          {/* Hero Visual - Asymmetrical Cards */}
          <div className="md:col-span-5 relative order-1 md:order-2 mb-8 md:mb-0">
            <div className="relative h-[400px] md:h-[600px]">
              {/* Background Card */}
              <div className="absolute top-8 right-0 w-[85%] h-[70%] bg-concrete border-2 border-steel transform rotate-3">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl md:text-8xl font-black text-steel/50 font-mono transform -rotate-12">
                    FIT
                  </div>
                </div>
              </div>
              
              {/* Main Card */}
              <div className="absolute top-0 left-0 w-[85%] h-[75%] bg-industrial border-2 border-primary transform -rotate-2 overflow-hidden">
                <Image
                  src="/images/hero-jacket.jpg"
                  alt="Vintage Denim Jacket - Featured Item"
                  fill
                  className="object-cover"
                  priority
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                {/* Fallback when image fails */}
                <div className="absolute inset-0 flex items-center justify-center bg-industrial">
                  <div className="text-center">
                    <div className="text-6xl md:text-8xl font-black text-steel/50 font-mono mb-4">FIT</div>
                    <p className="text-sm font-mono text-primary uppercase">Featured Item</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/90 to-transparent">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-mono uppercase text-primary tracking-wider">Trending Now</p>
                      <p className="text-lg font-bold text-foreground">Vintage Denim Jacket</p>
                      <p className="text-sm text-muted-foreground">by @streetstyle.blr</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-primary font-mono">₹1,499</p>
                      <p className="text-xs line-through text-muted-foreground">₹4,999</p>
                    </div>
                  </div>
                </div>
                {/* Neon Border Glow */}
                <div className="absolute inset-0 border-2 border-primary shadow-[inset_0_0_20px_var(--neon),0_0_20px_var(--neon)]" />
              </div>

              {/* Floating Badge */}
              <div className="absolute bottom-4 right-4 md:bottom-8 md:right-0 bg-primary text-primary-foreground px-4 py-2 transform rotate-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs font-mono font-bold uppercase">70% Off</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scrolling Marquee */}
        <div className="mt-12 md:mt-16 overflow-hidden border-y-2 border-border py-4">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-8 mx-8">
                <span className="text-xl md:text-2xl font-black text-muted-foreground">SUSTAINABLE</span>
                <span className="text-primary">●</span>
                <span className="text-xl md:text-2xl font-black text-primary">PRE-LOVED</span>
                <span className="text-muted-foreground">●</span>
                <span className="text-xl md:text-2xl font-black text-muted-foreground">CIRCULAR</span>
                <span className="text-primary">●</span>
                <span className="text-xl md:text-2xl font-black text-primary">DESI-STREET</span>
                <span className="text-muted-foreground">●</span>
                <span className="text-xl md:text-2xl font-black text-muted-foreground">BANGALORE</span>
                <span className="text-primary">●</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
