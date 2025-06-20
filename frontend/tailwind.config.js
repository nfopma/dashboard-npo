/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        'arkin-primary': '#5e2d79',
        'arkin-primary-light': '#7e3f95',
        'arkin-secondary': '#1eb9c4'
      }
    },
  },
  plugins: [],
}
