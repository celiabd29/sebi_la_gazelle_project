import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        fredoka: ["Fredoka", "sans-serif"],
        bubble: ['"Bubble Body"', "cursive"],
      },

      screens: {
        mobile: "440px",
        grandMobile: "580px",
        miniTablette: "680px",
        tablette: "930px",
        pc: "1440px",
        fixe: "1920px",
      },
      colors: {
        ...colors,
        fondRose: "#ffbfc7",
        fondRoseFonce: "#ff6d83",
        fondGris: "#eae2dc",
        fondjaune: "#fce5c2",
        fondjauneFonce: "#f9c474",
        fondOrange: "#de8753",
        fondVert: "#e4ffe7",
        fondVertMoyen: "#bdfec4",
        fondVertFonce: "#98c03c",
        fondTurquoise: "#6ad5c5",
        fondBleu: "#d0f4fe",
        fondBleuFonce: "#26c0dd",
      },
    },
  },
  plugins: [],
};
