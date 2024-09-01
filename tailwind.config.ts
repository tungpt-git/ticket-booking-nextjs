import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  mode: "jit",
  content: [
    "./node_modules/flowbite-react/lib/**/*.js",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#3B82F6",
          secondary: "#9333EA",
          accent: "#10B981",
          neutral: "oklch(93% 0 0)",
          "base-100": "#ffffff",
          info: "#3B82F6",
          success: "#22C55E",
          warning: "#F59E0B",
          error: "#EF4444",
        },
      },
    ],
  },
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
        seat: {
          normal: {
            DEFAULT: "#737373",
            selected: "#3B82F6",
          },
          vip: {
            DEFAULT: "#F59E0B",
            selected: "#3B82F6",
          },
          multiple: {
            DEFAULT: "#D946EF",
            selected: "#3B82F6",
          },
          disabled: "#737373",
        },
      },
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }: any) => {
      matchUtilities(
        {
          "animation-delay": (value: any) => {
            return {
              "animation-delay": value,
            };
          },
        },
        {
          values: theme("transitionDelay"),
        }
      );
    }),
    require("daisyui"),
  ],
};
export default config;
