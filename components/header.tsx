"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, ShoppingBag, User, Search, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import SkeuomorphicButton from "./skeuomorphic-button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b-2 border-primary">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative">
              <span className="text-2xl md:text-3xl font-black tracking-tighter text-foreground">
                our
              </span>
              <span className="text-2xl md:text-3xl font-black tracking-tighter text-primary">
                FIT
              </span>
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary shadow-[0_0_10px_var(--neon)]" />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/shop" className="text-sm font-mono uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
              Shop
            </Link>
            <Link href="/sell" className="text-sm font-mono uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
              Sell
            </Link>
            <Link href="/shop" className="text-sm font-mono uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
              Swap
            </Link>
            <Link href="/#community" className="text-sm font-mono uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
              Community
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/shop" className="p-2 text-muted-foreground hover:text-primary transition-colors">
              <Search className="w-5 h-5" />
            </Link>
            {user ? (
              <>
                <Link href="/profile" className="p-2 text-muted-foreground hover:text-primary transition-colors">
                  <User className="w-5 h-5" />
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="p-2 text-muted-foreground hover:text-primary transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <Link href="/login" className="p-2 text-muted-foreground hover:text-primary transition-colors">
                <User className="w-5 h-5" />
              </Link>
            )}
            <Link href="/shop" className="p-2 text-muted-foreground hover:text-primary transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b-2 border-primary">
            <nav className="flex flex-col p-4 gap-4">
              <Link href="/shop" className="text-lg font-mono uppercase tracking-widest text-foreground hover:text-primary transition-colors py-2 border-b border-border">
                Shop
              </Link>
              <Link href="/sell" className="text-lg font-mono uppercase tracking-widest text-foreground hover:text-primary transition-colors py-2 border-b border-border">
                Sell
              </Link>
              <Link href="/shop" className="text-lg font-mono uppercase tracking-widest text-foreground hover:text-primary transition-colors py-2 border-b border-border">
                Swap
              </Link>
              <Link href="/#community" className="text-lg font-mono uppercase tracking-widest text-foreground hover:text-primary transition-colors py-2 border-b border-border">
                Community
              </Link>
              <div className="flex items-center gap-4 pt-4">
                {user ? (
                  <>
                    <SkeuomorphicButton variant="outline" size="sm" asChild>
                      <Link href="/profile">
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </Link>
                    </SkeuomorphicButton>
                    <SkeuomorphicButton variant="primary" size="sm" onClick={handleLogout}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </SkeuomorphicButton>
                  </>
                ) : (
                  <SkeuomorphicButton variant="primary" size="sm" asChild>
                    <Link href="/login">
                      <User className="w-4 h-4 mr-2" />
                      Login
                    </Link>
                  </SkeuomorphicButton>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
