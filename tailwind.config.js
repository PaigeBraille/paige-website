/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2A7DE1",
        paigedarkblue: "#0E2F7F",
        paigedarkgrey: "#171D1C",
        paigelightgreen: "#E2EFDE",
        paigeyellow: "#F5B700",
        paigered: "#AE1438",
      },
    },
    fontFamily: {
      sans: ["'Inter'", "ui-sans-serif"],
      braille: ["APHfont"],
    },
    fontSize: {
      xs: ".65rem",
      sm: ".8rem",
      base: "1rem",
      lg: "1.2rem",
      xl: "1.4rem",
      "2xl": "1.6rem",
      "3xl": "2rem",
      "3.5xl": "2.5rem",
      "4xl": "3rem",
      "5xl": "4rem",
      "6xl": "5rem",
      "7xl": "6rem",
      "8xl": "7rem",
      "9xl": "8rem",
    },
  },
  variants: {},
  plugins: [],
};
