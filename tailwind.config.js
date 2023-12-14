/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { NovaSquare: ["Nova Square", "sans-serif"] },
      borderRadius: { large: "50%" },
    },
  },
  plugins: [],
};
