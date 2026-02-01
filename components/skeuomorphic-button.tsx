"use client";

import { type ButtonHTMLAttributes, forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SkeuomorphicButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const SkeuomorphicButton = forwardRef<HTMLButtonElement, SkeuomorphicButtonProps>(
  ({ className, variant = "primary", size = "md", children, asChild, ...props }, ref) => {
    const baseStyles = `
      relative inline-flex items-center justify-center
      font-mono uppercase tracking-wider font-bold
      transition-all duration-150 ease-out
      active:translate-y-[2px] active:shadow-none
      disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0
    `;

    const variantStyles = {
      primary: `
        bg-primary text-primary-foreground
        border-2 border-primary
        shadow-[4px_4px_0px_0px_var(--neon-dim),inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-2px_0_rgba(0,0,0,0.3)]
        hover:shadow-[6px_6px_0px_0px_var(--neon-dim),inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-2px_0_rgba(0,0,0,0.3)]
        hover:bg-[#45ff26]
        active:shadow-[2px_2px_0px_0px_var(--neon-dim)]
      `,
      secondary: `
        bg-secondary text-secondary-foreground
        border-2 border-steel
        shadow-[4px_4px_0px_0px_var(--steel),inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-2px_0_rgba(0,0,0,0.4)]
        hover:shadow-[6px_6px_0px_0px_var(--steel),inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-2px_0_rgba(0,0,0,0.4)]
        hover:bg-steel hover:text-foreground
        active:shadow-[2px_2px_0px_0px_var(--steel)]
      `,
      outline: `
        bg-transparent text-primary
        border-2 border-primary
        shadow-[4px_4px_0px_0px_var(--neon),inset_0_0_0_1px_transparent]
        hover:shadow-[6px_6px_0px_0px_var(--neon)]
        hover:bg-primary/10
        active:shadow-[2px_2px_0px_0px_var(--neon)]
      `,
      ghost: `
        bg-transparent text-foreground
        border-2 border-transparent
        hover:border-primary hover:text-primary
        shadow-none
      `,
    };

    const sizeStyles = {
      sm: "px-4 py-2 text-xs",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base",
    };

    const buttonClasses = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

    if (asChild) {
      return (
        <Link ref={ref as any} className={buttonClasses} {...(props as any)}>
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={buttonClasses}
        {...props}
      >
        {children}
      </button>
    );
  }
);

SkeuomorphicButton.displayName = "SkeuomorphicButton";

export default SkeuomorphicButton;
