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
        background: "#F5F0F0",
        card: "#FFFFFF",
        text: "#2D2D2D",
        muted: "#8A8A8A",
        nyota: "#B8C6E8",
        hirono: "#7A9E9F",
        lulu: "#F5B5C0",
        sparkle: "#FFD54F",
      },
      fontFamily: {
        heading: ["var(--font-quicksand)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 16px rgba(45,45,45,0.07)",
        "card-hover": "0 8px 32px rgba(45,45,45,0.13)",
        box: "0 16px 48px rgba(45,45,45,0.18)",
        "box-hover": "0 24px 64px rgba(45,45,45,0.24)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        "float-b": "float 4s ease-in-out 0.6s infinite",
        "float-c": "float 4s ease-in-out 1.2s infinite",
        "float-d": "float 4s ease-in-out 1.8s infinite",
        "fade-up": "fadeUp 0.6s ease forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
