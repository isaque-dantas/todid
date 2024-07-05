/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#D9B3FF",
        secondary: "#3E0872",
        white: "#E9E6F0",
        gray: "#9E9DA3",
        black: "#16141A"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
  safelist: [
    '/^bg-/',
    '/^border-/'
  ]
}
