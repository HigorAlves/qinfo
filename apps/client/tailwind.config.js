const { spacing, borderRadius, borderWidth, borderColor } = require('./src/assets/styles/tailwind/utilities');
const { fontSizeAndLineHeight } = require('./src/assets/styles/tailwind/fonts');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    borderWidth,
    borderColor,
    screens: {
			sm: '576px',
			md: '768px',
			lg: '992px',
			xl: '1200px',
			xxl: '1400px'
    },
    spacing,
    borderRadius,
    fontSize: { ...fontSizeAndLineHeight },
    extend: {
      lineHeight: { ...fontSizeAndLineHeight },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
