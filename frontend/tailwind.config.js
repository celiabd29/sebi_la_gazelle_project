const colors = require("tailwindcss/colors");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        fredoka: ['"fredoka"'],
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
        white: colors.white,
        black: colors.black,
        gray: colors.gray,
        yellow: colors.yellow,
        pink: colors.pink,
      },
      animation: {
        "floating-slow": "float 10s ease-in-out infinite",
        "floating-medium": "float 6s ease-in-out infinite",
        "floating-fast": "float 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};
