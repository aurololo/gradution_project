"use client";

import Image from "next/image";
import { Instagram, MessageCircle, Star, MapPin } from "lucide-react";
import SkeuomorphicButton from "./skeuomorphic-button";

const testimonials = [
  {
    name: "Priya M.",
    handle: "@priya.styles",
    location: "Koramangala",
    rating: 5,
    text: "Sold my entire college wardrobe in 2 weeks! The pickup service is next level. Pure desi vibes.",
    type: "seller",
    avatar: "/images/avatar-priya.jpg",
  },
  {
    name: "Arjun K.",
    handle: "@arjun.vintage",
    location: "Indiranagar",
    rating: 5,
    text: "Found a mint condition Levi's jacket for ₹1500. That's street smarts right there!",
    type: "buyer",
    avatar: "/images/avatar-arjun.jpg",
  },
  {
    name: "Zara S.",
    handle: "@zara.swaps",
    location: "HSR Layout",
    rating: 5,
    text: "Swapped my kurtas for streetwear. This is the future of fashion. Love the community!",
    type: "swapper",
    avatar: "/images/avatar-zara.jpg",
  },
];

const locations = [
  "Koramangala", "Indiranagar", "HSR Layout", "Whitefield", "Jayanagar", 
  "JP Nagar", "Malleshwaram", "Rajajinagar", "Electronic City", "Marathahalli"
];

export default function CommunitySection() {
  return (
    <section id="community" className="py-16 md:py-24 px-4 bg-background relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(var(--primary) 1px, transparent 1px),
            linear-gradient(90deg, var(--primary) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-primary mb-4 block">
            // The Movement
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-balance">
            <span className="text-foreground">JOIN THE</span>
            <br />
            <span className="text-primary drop-shadow-[0_0_30px_var(--neon)]">DESI-STREET</span>
            <br />
            <span className="text-foreground">REVOLUTION</span>
          </h2>
        </div>

        {/* Testimonials - Asymmetrical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 mb-16">
          {testimonials.map((testimonial, index) => {
            const gridClasses = [
              "md:col-span-5",
              "md:col-span-7",
              "md:col-span-6 md:col-start-4",
            ][index];

            return (
              <div
                key={testimonial.handle}
                className={`
                  ${gridClasses}
                  relative p-6 md:p-8
                  border-2 border-steel bg-concrete
                  transition-all duration-300
                  hover:border-primary
                  hover:shadow-[8px_8px_0px_0px_var(--neon)]
                `}
              >
                {/* Type Badge */}
                <div className="absolute -top-3 left-4 bg-primary text-primary-foreground px-3 py-1 text-[10px] font-mono font-bold uppercase">
                  {testimonial.type}
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-lg md:text-xl text-foreground font-medium mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 border-2 border-primary overflow-hidden">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-primary font-mono">{testimonial.handle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {testimonial.location}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Location Tags */}
        <div className="mb-16">
          <p className="text-center text-sm text-muted-foreground mb-6 font-mono uppercase tracking-wider">
            Active across Bangalore
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {locations.map((location) => (
              <span
                key={location}
                className="px-3 py-1.5 text-xs font-mono border border-steel bg-industrial text-muted-foreground hover:border-primary hover:text-primary transition-colors cursor-default"
              >
                {location}
              </span>
            ))}
          </div>
        </div>

        {/* Newsletter / App Download CTA */}
        <div className="relative p-8 md:p-12 border-2 border-primary bg-industrial">
          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary -translate-x-1 -translate-y-1" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary translate-x-1 -translate-y-1" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary -translate-x-1 translate-y-1" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary translate-x-1 translate-y-1" />

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                GET EARLY ACCESS
              </h3>
              <p className="text-muted-foreground mb-6">
                Be the first to know about exclusive drops, swap events, and community meetups in your area.
              </p>
              
              {/* Email Input - Skeuomorphic */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-background border-2 border-steel text-foreground placeholder:text-muted-foreground font-mono focus:outline-none focus:border-primary focus:shadow-[0_0_10px_var(--neon)] transition-all"
                  />
                </div>
                <SkeuomorphicButton variant="primary" size="md">
                  Join Waitlist
                </SkeuomorphicButton>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end gap-4">
              <p className="text-sm text-muted-foreground font-mono uppercase tracking-wider">
                Follow the movement
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="p-4 border-2 border-steel bg-concrete text-foreground hover:border-primary hover:text-primary hover:shadow-[4px_4px_0px_0px_var(--neon)] transition-all"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="p-4 border-2 border-steel bg-concrete text-foreground hover:border-primary hover:text-primary hover:shadow-[4px_4px_0px_0px_var(--neon)] transition-all"
                >
                  <MessageCircle className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="p-4 border-2 border-steel bg-concrete text-foreground hover:border-primary hover:text-primary hover:shadow-[4px_4px_0px_0px_var(--neon)] transition-all flex items-center justify-center"
                >
                  <span className="text-lg font-black">𝕏</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
