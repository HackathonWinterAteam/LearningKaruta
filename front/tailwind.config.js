/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: [
          '"Noto sans JP"',
        ]
      },
      colors:{
        lightBlue:'#3F4CE2',
        darkBlue:'#021997',
        yellow:'#F1D772',
        darkWhite:'#F5F4F5',
      },
      dropShadow:{
        btnShadow:'0 8px 8px rgba(2, 25, 151,30)'
      }
    },
  },
  plugins: [],
};
