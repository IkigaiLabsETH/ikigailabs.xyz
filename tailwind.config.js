/* eslint-disable */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./modules/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      red: colors.red,
      yellow: colors.yellow,
      green: colors.green,
      indigo: colors.indigo,
      orange: {
        ...colors.orange,
        DEFAULT: '#ff584d',
      }
    },
    fontFamily: {
      sans: ['Sk-Modernist', 'sans-serif'],
    },
    extend: {
      transitionProperty: {
        'width': 'width'
      },
    },
    maxHeight: {
      'screen-40': '40vh',
      'screen-50': '50vh',
      'screen-60': '60vh',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
