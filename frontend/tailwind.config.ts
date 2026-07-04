import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        clinical: {
          950: "#0F2137",
          900: "#1E3A5F",
          700: "#2C5282",
          500: "#4A7BA6",
          100: "#E8F0F8",
        },
        vital: {
          DEFAULT: "#16A34A",
          light: "#DCFCE7",
          dark: "#15803D",
        },
        critical: {
          DEFAULT: "#DC2626",
          light: "#FEE2E2",
          dark: "#991B1B",
        },
        caution: {
          DEFAULT: "#D97706",
          light: "#FEF3C7",
        },
        canvas: "#F7F8FA",
        ink: "#111827",
        line: "#E2E5EA",
      },
      fontFamily: {
        display: ["var(--font-baloo)", "sans-serif"],
        body: ["var(--font-hind)", "sans-serif"],
        mono: ["var(--font-roboto-mono)", "monospace"],
      },
      keyframes: {
        pulseLine: {
          "0%, 100%": { transform: "scaleY(1)" },
          "50%": { transform: "scaleY(1.6)" },
        },
        beat: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
      },
      animation: {
        pulseLine: "pulseLine 1.2s ease-in-out infinite",
        beat: "beat 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
