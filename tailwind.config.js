/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Space Grotesk", ...defaultTheme.fontFamily.sans],
    },
    colors: {
      lightSand: '#FCF7E6',
      black: '#000000',
      white: '#FFFFFF',
      cartBG: '#1E1E1E',
    }
  },
  plugins: [],
};
