import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50: "#f0fdfa",
          100: "#e0f2f1",
          200: "#b2dfdb",
          300: "#80cbc4",
          400: "#4db6ac",
          500: "#26a69a",
          600: "#009688",
          700: "#00838f",
          800: "#00695c",
          900: "#004d40",
          DEFAULT: "#00838f",
        },
        brand: {
          teal: "#00838f",
          "teal-dark": "#006064",
          "teal-light": "#e0f2f1",
          yellow: "#ffda55",
          "yellow-dark": "#fbc02d",
          coral: "#e53935",
          cream: "#fdfbf7",
          "cream-alt": "#f7f4ed",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 1px 4px -1px rgba(0, 0, 0, 0.03)",
        "card-hover": "0 8px 24px -4px rgba(0, 131, 143, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.06)",
        header: "0 2px 10px rgba(0, 0, 0, 0.08)",
      },
      borderRadius: {
        card: "12px",
      },
    },
  },
  plugins: [],
};

export default config;

