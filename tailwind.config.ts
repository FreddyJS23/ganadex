import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        background: "url('../../public/fondo.webp')",
        backgroundLogin: "url('../../public/background-login.png')",
        "background-dark": "url('../../public/fondo-dark.webp')",
      },
      fontFamily: {
        bebasNue: ["var(--font-bebasNue)"],
        nunito: ["var(--font-nunito)", "sans-serif"],
      },
    },
  },
  daisyui: {
    darkTheme: "ganadexThemeDark",
    themes: [
      {
        ganadexTheme: {
          primary: "#AF842D",
          secondary: "#22FF1E",
          "base-100": "#fafafa",
          /*  header table */
          "base-200": "#E2E8F0",
          /*  body table */
          neutral: "#F8FAFC",
          info: "#22d3ee",
          success: "#00c400",
          warning: "#ff8900",
          error: "#d70c41",
        },
        ganadexThemeDark: {
          primary: "#22FF1E",
          secondary: "#AF842D",
          "base-100": "#0F172A",
          /*  header table */
          "base-200": "#334155",
          /*  body table */
          neutral: "#0F172A",
          info: "#22d3ee",
          success: "#00c400",
          warning: "#ff8900",
          error: "#d70c41",
        },
      },
    ],
  },
  plugins: [
    require("daisyui"),
    require("tailwind-scrollbar")({ nocompatible: true }),
    nextui({
      themes: {
        light: {
          colors: {
            background: "#fafafa",
            primary: {
              DEFAULT: "#AF842D",
              foreground: "#fafafa",
            },
            secondary: {
              DEFAULT: "#22FF1E",
              foreground: "#fafafa",
            },
          }, // light theme colors
        },
        dark: {
          colors: {
            background: "#0F172A",
            primary: {
              DEFAULT: "#22FF1E",
              foreground: "#0F172A",
            },
            secondary: {
              DEFAULT: "#AF842D",
              foreground: "#0F172A",
            },
          }, // dark theme colors
        },
      },
    }),
  ],
};
export default config;
