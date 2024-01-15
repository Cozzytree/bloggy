/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { NovaSquare: ["Nova Square", "sans-serif"] },
      borderRadius: { large: "50%" },
      keyframes: {
        easy: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        easy: "easy 0.5s linear",
      },
    },
  },
  plugins: [],
};
