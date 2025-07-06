/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Mona Sans", "sans-serif"],
      },
      colors: {
        // Variants of White
        "white-25": "#f0f5ff",
        "white-50": "#d9ecff",
        "white-100": "#c2e3ff",
        "white-200": "#a3d8ff",
        "white-300": "#84cdff",
        "white-400": "#65c2ff",
        "white-500": "#46b7ff",
        "white-600": "#27acff",
        "white-700": "#089fff",
        "white-800": "#0084e6",
        "white-900": "#0069cc",

        // Variants of Black
        "black-25": "#3c3c44",
        "black-50": "#1c1c21",
        "black-100": "#0e0e10",
        "black-200": "#282732",
        "black-300": "#3c3c44",
        "black-400": "#505059",
        "black-500": "#64646d",
        "black-600": "#787880",
        "black-700": "#8c8c94",
        "black-800": "#a0a0a8",
        "black-900": "#b4b4bc",

        // Variants of Blue
        "blue-25": "#f0f5ff",
        "blue-50": "#839cb5",
        "blue-100": "#2d2d38",
        "blue-200": "#1c1c21",
        "blue-300": "#0e0e10",
        "blue-400": "#282732",
        "blue-500": "#3c3c44",
      },
    },
  },
  plugins: [],
};
