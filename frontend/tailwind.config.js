/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      width: {
        inherit: "inherit",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        fadeInKeyFrame: {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
      },
      animation: {
        fadeIn: "fadeInKeyFrame .5s ease-out",
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
