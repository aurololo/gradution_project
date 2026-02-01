"use client";

import { ShoppingBag, RefreshCw, Users, Shield, Leaf, Zap } from "lucide-react";

const features = [
  {
    icon: ShoppingBag,
    title: "BUY",
    description: "Score unique pre-loved pieces at a fraction of retail. Curated street style from Bangalore's finest.",
    accent: true,
    size: "large",
  },
  {
    icon: RefreshCw,
    title: "SELL",
    description: "Turn your closet into cash. List in seconds, reach thousands.",
    accent: false,
    size: "small",
  },
  {
    icon: Users,
    title: "SWAP",
    description: "Trade directly with the community. Your old fit is someone's new favorite.",
    accent: true,
    size: "small",
  },
  {
    icon: Shield,
    title: "VERIFIED",
    description: "Every seller vetted. Every item authenticated. Trust the process.",
    accent: false,
    size: "medium",
  },
  {
    icon: Leaf,
    title: "SUSTAINABLE",
    description: "Each purchase saves 2.5kg of CO2. Fashion that doesn't cost the earth.",
    accent: true,
    size: "medium",
  },
  {
    icon: Zap,
    title: "INSTANT",
    description: "Same-day delivery across Bangalore. Local pickups available.",
    accent: false,
    size: "small",
  },
];

export default function FeaturesGrid() {
  return (
    <section id="shop" className="py-16 md:py-24 px-4 bg-industrial relative">
      {/* Diagonal stripes background */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `repeating-linear-gradient(
          45deg,
          transparent,
          transparent 10px,
          var(--steel) 10px,
          var(--steel) 20px
        )`
      }} />

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs font-mono uppercase tracking-widest text-primary">Why ourFIT</span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-center text-balance">
            <span className="text-foreground">THE </span>
            <span className="text-primary drop-shadow-[0_0_20px_var(--neon)]">CIRCULAR</span>
            <span className="text-foreground"> WAY</span>
          </h2>
        </div>

        {/* Asymmetrical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colSpan = feature.size === "large" ? "md:col-span-3" : 
                           feature.size === "medium" ? "md:col-span-3" : "md:col-span-2";
            
            return (
              <div
                key={feature.title}
                className={`
                  ${colSpan}
                  group relative p-6 md:p-8
                  border-2 ${feature.accent ? 'border-primary' : 'border-steel'}
                  bg-concrete
                  transition-all duration-300
                  hover:translate-x-1 hover:-translate-y-1
                  ${feature.accent ? 'hover:shadow-[8px_8px_0px_0px_var(--neon)]' : 'hover:shadow-[8px_8px_0px_0px_var(--steel)]'}
                `}
              >
                {/* Index number */}
                <span className="absolute top-2 right-2 text-6xl md:text-7xl font-black text-steel/30 font-mono leading-none select-none">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className="relative z-10 space-y-4">
                  <div className={`
                    w-12 h-12 md:w-16 md:h-16 flex items-center justify-center
                    border-2 ${feature.accent ? 'border-primary bg-primary/10' : 'border-steel bg-steel/10'}
                    transition-all duration-300
                    group-hover:${feature.accent ? 'shadow-[0_0_20px_var(--neon)]' : ''}
                  `}>
                    <Icon className={`w-6 h-6 md:w-8 md:h-8 ${feature.accent ? 'text-primary' : 'text-foreground'}`} />
                  </div>

                  <h3 className={`text-2xl md:text-3xl font-black ${feature.accent ? 'text-primary' : 'text-foreground'}`}>
                    {feature.title}
                  </h3>

                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Corner accent */}
                {feature.accent && (
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-primary" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
