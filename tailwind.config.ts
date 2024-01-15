import type { Config } from 'tailwindcss'


const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode:'class',
  
    daisyui: {
       darkTheme:"ganadexThemeDark", 
      themes: [
        {
          ganadexTheme: {
            "primary": "#AF842D",
            "secondary": "#22FF1E",
            "base-100": "#f3f4f6",
           /*  header table */
            "base-200": "#E2E8F0",
            /*  body table */
            "neutral": "#F8FAFC",
            "info": "#22d3ee",
            "success": "#00c400",
            "warning": "#ff8900",
            "error": "#d70c41",
          },
          ganadexThemeDark: {
            "primary": "#22FF1E",
            "secondary": "#AF842D",
            "base-100": "#0F172A",
           /*  header table */
            "base-200": "#334155",
            /*  body table */
            "neutral": "#0F172A",
            "info": "#22d3ee",
            "success": "#00c400",
            "warning": "#ff8900",
            "error": "#d70c41",
          },
        },
      ]
    },
  plugins: [
    require("daisyui"),
    require("tailwind-scrollbar")({ nocompatible: true })
],
}
export default config
