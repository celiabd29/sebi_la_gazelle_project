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
        tablette: "930px",
        miniTablette : "680px",
        pc: "1440px",
        fixe: "1920px",  
      },
    },
  },
  plugins: [],
}


// "./src/**/*.{js,jsx,ts,tsx}",