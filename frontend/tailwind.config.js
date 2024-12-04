/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        mobile: "440px",
        grandMobile : "580px",
        miniTablette : "680px",
        tablette: "930px",
        pc: "1440px",
        fixe: "1920px",  
      },
    },
  },
  plugins: [],
}