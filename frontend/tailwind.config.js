/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
        primary: { ...colors.neutral, DEFAULT: "#404040" },
      },
      gridTemplateRows: {
        "layout-root": "auto 1fr auto",
        label: "auto 1fr",
      },
      gridTemplateColumns: {
        "layout-nav": "1fr 2fr 1fr",
      },
    },
  },
  plugins: ["@headlessui/react"],
};
