/* eslint-disable */
const colors = require('tailwindcss/colors')

module.exports = {
  important: false,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./modules/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      neutral: colors.neutral,
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      slate: colors.slate,
      red: {
        ...colors.red,
        DEFAULT: '#A1100F',
      },
      yellow: {
        ...colors.yellow,
        DEFAULT: '#F9D401',
      },
      green: colors.green,
      blue: {
        ...colors.blue,
        DEFAULT: '#313459',
      },
      indigo: colors.indigo,
      rose: colors.rose,
      orange: {
        ...colors.orange,
        DEFAULT: '#DB7D2F',
      }
    },
    fontFamily: {
      sans: ['sans-serif'],
    },
    extend: {
      transitionProperty: {
        'width': 'width'
      },
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      }
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
