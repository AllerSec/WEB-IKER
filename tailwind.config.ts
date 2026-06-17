import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: { center: true, padding: "2rem", screens: { "2xl": "1280px" } },
    extend: {
      colors: {
        bg: {
          deep: "#000A15",
          panel: "#04162A",
        },
        ink: {
          DEFAULT: "#FFFFFF",
          soft: "#B7DEFF",
          eyebrow: "#DFEEFF",
        },
        accent: {
          blue: "#30A6FF",
          glow: "rgba(48,166,255,0.5)",
          danger: "#FF2244",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-host)", "system-ui", "sans-serif"],
        hero: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.7s ease-out forwards",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        spin: "spin 18s linear infinite",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
