"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import SkeuomorphicButton from "@/components/skeuomorphic-button";
import { ArrowRight, Mail, Lock, User } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    
    // Sign up user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    if (authData.user) {
      // Create profile
      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: authData.user.id,
          username: username || null,
          full_name: fullName || null,
          user_type: "buyer",
        });

      if (profileError) {
        setError(profileError.message);
        setLoading(false);
      } else {
        router.push("/");
        router.refresh();
      }
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="flex items-center gap-2 justify-center mb-4">
              <span className="text-4xl font-black tracking-tighter text-foreground">
                our
              </span>
              <span className="text-4xl font-black tracking-tighter text-primary">
                FIT
              </span>
            </div>
          </Link>
          <h1 className="text-3xl font-black text-foreground mb-2">Join the Revolution</h1>
          <p className="text-muted-foreground">Start your circular fashion journey</p>
        </div>

        {/* Signup Form */}
        <div className="border-2 border-steel bg-concrete p-8">
          <form onSubmit={handleSignup} className="space-y-6">
            {error && (
              <div className="p-4 bg-destructive/10 border-2 border-destructive text-destructive text-sm font-mono">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm font-mono uppercase tracking-wider text-foreground">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-background border-2 border-steel text-foreground placeholder:text-muted-foreground font-mono focus:outline-none focus:border-primary focus:shadow-[0_0_10px_var(--neon)] transition-all"
                  placeholder="Your Name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-mono uppercase tracking-wider text-foreground">
                Username (optional)
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-background border-2 border-steel text-foreground placeholder:text-muted-foreground font-mono focus:outline-none focus:border-primary focus:shadow-[0_0_10px_var(--neon)] transition-all"
                  placeholder="@username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-mono uppercase tracking-wider text-foreground">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-background border-2 border-steel text-foreground placeholder:text-muted-foreground font-mono focus:outline-none focus:border-primary focus:shadow-[0_0_10px_var(--neon)] transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-mono uppercase tracking-wider text-foreground">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full pl-12 pr-4 py-3 bg-background border-2 border-steel text-foreground placeholder:text-muted-foreground font-mono focus:outline-none focus:border-primary focus:shadow-[0_0_10px_var(--neon)] transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <SkeuomorphicButton
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
              <ArrowRight className="ml-2 w-5 h-5" />
            </SkeuomorphicButton>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline font-semibold">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
