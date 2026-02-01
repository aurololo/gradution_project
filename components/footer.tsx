"use client";

import { Recycle, ArrowUp } from "lucide-react";

const footerLinks = {
  shop: [
    { label: "Women", href: "#" },
    { label: "Men", href: "#" },
    { label: "Kids", href: "#" },
    { label: "Accessories", href: "#" },
    { label: "Ethnic Wear", href: "#" },
  ],
  sell: [
    { label: "Start Selling", href: "#" },
    { label: "Seller Guidelines", href: "#" },
    { label: "Pricing Tips", href: "#" },
    { label: "Shipping Info", href: "#" },
  ],
  community: [
    { label: "Swap Events", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Success Stories", href: "#" },
    { label: "Sustainability", href: "#" },
  ],
  company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Press", href: "#" },
  ],
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-industrial border-t-2 border-primary pt-16 pb-8 px-4 relative">
      {/* Back to Top Button */}
      <button
        type="button"
        onClick={scrollToTop}
        className="absolute -top-6 right-4 md:right-8 w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center border-2 border-primary shadow-[4px_4px_0px_0px_var(--neon-dim)] hover:shadow-[6px_6px_0px_0px_var(--neon-dim)] active:shadow-[2px_2px_0px_0px_var(--neon-dim)] active:translate-y-[2px] transition-all"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      <div className="container mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-3xl font-black tracking-tighter text-foreground">our</span>
              <span className="text-3xl font-black tracking-tighter text-primary">FIT</span>
            </div>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              {"Bangalore's"} first circular fashion marketplace. Buy pre-loved, sell your style, swap with the community.
            </p>
            <div className="flex items-center gap-2 p-3 border border-primary/30 bg-primary/5 w-fit">
              <Recycle className="w-5 h-5 text-primary" />
              <span className="text-xs font-mono text-primary">
                2,500+ tons CO2 saved
              </span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-mono uppercase tracking-widest text-primary mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <span className="hidden md:inline text-steel">|</span>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <span className="hidden md:inline text-steel">|</span>
              <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
              <span className="hidden md:inline text-steel">|</span>
              <a href="#" className="hover:text-primary transition-colors">Authenticity Guarantee</a>
            </div>

            {/* Copyright */}
            <p className="text-xs text-muted-foreground font-mono">
              © 2026 ourFIT. Made with {"<3"} in Bangalore.
            </p>
          </div>
        </div>

        {/* Bottom Branding Strip */}
        <div className="mt-8 pt-8 border-t border-steel">
          <div className="flex items-center justify-center overflow-hidden">
            <div className="text-[8vw] md:text-[6vw] font-black tracking-tighter text-steel/20 whitespace-nowrap select-none">
              WEAR IT. SHARE IT. REPEAT.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
