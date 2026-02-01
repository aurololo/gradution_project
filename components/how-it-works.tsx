"use client";

import Link from "next/link";
import { Camera, Tag, Truck, Wallet } from "lucide-react";
import SkeuomorphicButton from "./skeuomorphic-button";

const steps = [
  {
    icon: Camera,
    step: "01",
    title: "SNAP IT",
    description: "Take photos of your pre-loved pieces. Our AI helps you style the shot.",
  },
  {
    icon: Tag,
    step: "02",
    title: "LIST IT",
    description: "Set your price or swap preference. We suggest competitive rates.",
  },
  {
    icon: Truck,
    step: "03",
    title: "SHIP IT",
    description: "We handle pickup. Free packaging. Zero hassle.",
  },
  {
    icon: Wallet,
    step: "04",
    title: "EARN IT",
    description: "Get paid instantly via UPI. Or score your next fit through swap.",
  },
];

export default function HowItWorks() {
  return (
    <section id="sell" className="py-16 md:py-24 px-4 bg-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 md:w-64 md:h-64 border-2 border-primary/20 transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-48 h-48 md:w-96 md:h-96 border-2 border-primary/20 transform translate-x-1/2 translate-y-1/2 rotate-45" />

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-12 md:mb-20 max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-widest text-primary mb-4 block">
            // How it works
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.9] text-balance">
            <span className="text-foreground">SELL YOUR</span>
            <br />
            <span className="text-primary drop-shadow-[0_0_20px_var(--neon)]">CLOSET</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl">
            Turn last season's fits into this season's cash. Four simple steps to declutter and earn.
          </p>
        </div>

        {/* Steps - Asymmetrical Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div
                key={step.step}
                className={`
                  relative group
                  ${isEven ? 'lg:mt-0' : 'lg:mt-12'}
                `}
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-0.5 bg-primary z-20" />
                )}

                {/* Card */}
                <div className="relative border-2 border-steel bg-concrete p-6 md:p-8 h-full transition-all duration-300 hover:border-primary hover:shadow-[8px_8px_0px_0px_var(--neon)]">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-2 bg-primary text-primary-foreground px-3 py-1 font-mono font-black text-sm">
                    {step.step}
                  </div>

                  {/* Icon Container - Skeuomorphic */}
                  <div className="w-16 h-16 mb-6 relative bg-industrial border-2 border-steel flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.5),inset_0_-1px_2px_rgba(255,255,255,0.1)]">
                    <Icon className="w-8 h-8 text-primary drop-shadow-[0_0_10px_var(--neon)]" />
                    {/* Button-like highlight */}
                    <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
                  </div>

                  <h3 className="text-xl md:text-2xl font-black text-foreground mb-3">
                    {step.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>

                  {/* Hover Indicator */}
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary transition-all duration-300 group-hover:w-full" />
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <SkeuomorphicButton variant="primary" size="lg" asChild>
            <Link href="/sell">Start Selling Now</Link>
          </SkeuomorphicButton>
          <span className="text-muted-foreground text-sm">or</span>
          <SkeuomorphicButton variant="ghost" size="lg" asChild>
            <Link href="/shop">Browse Shop</Link>
          </SkeuomorphicButton>
        </div>
      </div>
    </section>
  );
}
