/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["poppins", "sans-serif"],
      },
      backgroundImage: {
        cake1: "url(/images/cake_1.jpg)",
      },
      colors: {
        primary: {
          DEFAULT: "rgb(60,68,148)",
          100: "rgb(102,59,125)",
        },
        secondary: {
          DEFAULT: "rgb(220,43,51)",
          100: "rgb(251,131,139)",
          200: "rgb(221,82,90)",
          300: "rgb(183,52,76)",
        },
        deep: {
          DEFAULT: "#120508",
          100: "#371017",
          200: "#371017",
        },
        extra: {
          bg: "#F9fdff",
        },
      },
    },
  },
  plugins: [],
};
