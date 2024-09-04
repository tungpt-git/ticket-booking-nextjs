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
    themes: ["light", "dark"],
  },
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderColor: {
        light: {
          primary: "#e5e7eb",
        },
        dark: {
          primary: "olkch(25.3267% 0.015896 252.417568)",
        },
      },
      colors: {
        seat: {
          normal: {
            DEFAULT: "rgb(64 64 64)",
            selected: "rgb(59 130 246)",
          },
          vip: {
            DEFAULT: "rgb(180 83 9)",
            selected: "rgb(59 130 246)",
          },
          multiple: {
            DEFAULT: "rgb(162 28 175)",
            selected: "rgb(59 130 246)",
          },
          disabled: "rgb(225 29 72)",
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
