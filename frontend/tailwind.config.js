/** @type {import('tailwindcss').Config} */
module.exports = {
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
      keyframes: {
        show: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        hide: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
      },
      animation: {
        show: "show .2s ease-out",
        hide: "hide 1s ease-in",
      },
    },
    screens: {
      lg: { max: "1200px" },
      md: { max: "960px" },
      sm: { max: "576px" },
    },
  },
  plugins: [],
};
