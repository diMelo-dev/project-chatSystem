/** @type {import('tailwindcss').Config} */



module.exports = {

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      },
      backgroundImage: {
        'hero-pattern': `url('./src/assets/svg/texture.svg')`
      }
    },
  },
  darkMode: 'class',
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
