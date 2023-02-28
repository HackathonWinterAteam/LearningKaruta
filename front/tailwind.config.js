/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ['"Noto sans JP"'],
      },
      colors: {
        lightBlue: "#3F4CE2",
        darkBlue: "#021997",
        paleBlue:"#B5B9E6",
        yellow: "#F1D772",
        darkWhite: "#F5F4F5",
        paleBlack:'#3D3D3D',

        transparent: {
          black: " rgba(30, 30, 30, 0.7)",
        },
      },
      dropShadow: {
        Shadow: "0 4px 4px rgba(181, 185, 230,0.15)",
      },
    },
  },
  plugins: [],
};
