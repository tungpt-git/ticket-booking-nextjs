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
      colors: {
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
