import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          light: "#93C5FD", // Light variant
          DEFAULT: "#3B82F6", // Default variant
          dark: "#1E40AF", // Dark variant
        },
        secondary: {
          light: "#D8B4FE",
          DEFAULT: "#9333EA",
          dark: "#6D28D9",
        },
        accent: {
          light: "#6EE7B7",
          DEFAULT: "#10B981",
          dark: "#047857",
        },
        neutral: {
          light: "#D1D5DB",
          DEFAULT: "#6B7280",
          dark: "#374151",
        },
        info: {
          light: "#93C5FD",
          DEFAULT: "#3B82F6",
          dark: "#1E40AF",
        },
        success: {
          light: "#6EE7B7",
          DEFAULT: "#22C55E",
          dark: "#15803D",
        },
        warning: {
          light: "#FDE68A",
          DEFAULT: "#F59E0B",
          dark: "#B45309",
        },
        danger: {
          light: "#FECACA",
          DEFAULT: "#EF4444",
          dark: "#B91C1C",
        },
      },
    },
  },
  plugins: [],
};
export default config;
