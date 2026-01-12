import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Custom Mirrorless colors
        accent: {
          DEFAULT: "#00f0ff", // Bright Cyan
          foreground: "#000000",
        },
        "neon-blue": "#2979ff",
      },
      boxShadow: {
        "glow-accent": "0 0 20px -5px rgba(0, 240, 255, 0.5)",
      },
    },
  },
  plugins: [],
};
export default config;
