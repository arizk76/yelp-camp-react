module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'floral-white': '#f9f6f1',
        Makara: '#63605B',
        'baby-blue': '#7AC5EA',
      },
      screens: {
        tablet: { min: '678px', max: '1023px' },
      },
      fontSize: {
        '3.5xl': [
          '2rem',
          {
            lineHeight: '2.25rem',
          },
        ],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
