import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#080D1C",
          light: "#F5F7FB",
        },
        surface: {
          DEFAULT: "rgba(22, 32, 62, 0.65)",
          hover: "rgba(30, 44, 84, 0.75)",
          light: "#FFFFFF",
          "light-hover": "#F0F4FA",
        },
        perseus: {
          violet: "#6558F5",
          indigo: "#4F46E5",
          blue: "#38BDF8",
          cyan: "#06B6D4",
          purple: "#8B5CF6",
          dark: "#080D1C",
          card: "#0F172A",
          glass: "rgba(18, 26, 50, 0.65)",
          border: "rgba(255, 255, 255, 0.12)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        glow: "0 0 25px -5px rgba(101, 88, 245, 0.4)",
        "glow-cyan": "0 0 25px -5px rgba(56, 189, 248, 0.4)",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;

